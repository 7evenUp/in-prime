import React, { ChangeEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import clsx from "clsx"

import styles from "./styles.module.scss"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"

interface Subscription {
  id: number
  baseDiscount: number | null
  baseDiscountAmount: number | null
  duration: {
    id: number
    label: string
  }
  isActive: boolean
  kind: 1 | 2 // 1 - prime | 2 - calendar
  name: string
  price: number
}

interface Promocode {
  code: string
  discountAmount: number
  discountKind: { id: "MONEY" | "PERCENT"; label: "Money" | "%" }
}

interface PaymentsMethod {
  createdDatetime: string
  currency: {
    id: string
    label: string
  }
  id: number
  isActive: boolean
  isDefault: boolean
  method: {
    id: "crypto" | "card"
    label: string
  }
  network: {
    id: string
    label: string
  } | null
}

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = "https://id-dev.crypton.xyz/api/v1/"

const BuySubscriptionDialog = ({ children }: { children: React.ReactNode }) => {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>(
    undefined
  )

  const { data: subscriptions, isError: isSubscriptionsError } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await axios.get<Subscription[]>(
        ID_URL + "subscriptions/get-active/"
      )

      return response.data.filter(
        (el) => el.isActive && el.kind === PRIME_SUBSCRIPTION_KIND_ID
      )
    },
  })
  const { data: methods } = useQuery({
    queryKey: ["methods"],
    queryFn: async () => {
      const response = await axios.get<PaymentsMethod[]>(
        ID_URL + "payments/available/methods"
      )

      return response.data
    },
  })
  const {
    mutateAsync: mutatePromoValidation,
    isError: isPromoError,
    isSuccess: isPromoSuccess,
    isPending: isPromoPending,
    reset: resetPromo,
  } = useMutation({
    mutationFn: ({
      promocode,
      subscriptionId,
    }: {
      promocode: string
      subscriptionId: number
    }) =>
      axios.post<Promocode>(ID_URL + "promo-codes/validate/", {
        promocode,
        subscription: subscriptionId,
      }),
  })

  // input values
  const [promocode, setPromocode] = useState("")
  const [email, setEmail] = useState("")

  const onSelect = ({ id, baseDiscountAmount, price }: Subscription) => {
    if (isPromoError || isPromoSuccess) resetPromo()

    setSelectedCardId(id)
    setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
  }

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (selectedCardId === undefined) return

    if (isPromoError || isPromoSuccess) resetPromo()

    const { baseDiscountAmount, price } = subscriptions.find(
      (el) => el.id === selectedCardId
    )

    setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
    setPromocode(evt.currentTarget.value)
  }

  const applyPromocode = async () => {
    if (
      isPromoPending ||
      promocode.length === 0 ||
      selectedCardId === undefined
    )
      return

    const { baseDiscountAmount, price: subscriptionPrice } = subscriptions.find(
      (el) => el.id === selectedCardId
    )

    const price = baseDiscountAmount
      ? subscriptionPrice - baseDiscountAmount
      : subscriptionPrice

    try {
      const {
        data: { discountAmount, discountKind },
      } = await mutatePromoValidation({
        promocode,
        subscriptionId: selectedCardId,
      })
      if (discountKind.id === "MONEY") {
        setTotalPrice(price - discountAmount)
      } else {
        setTotalPrice(price - price * discountAmount)
      }
    } catch {}
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.trigger} asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          {isTopUpOpen && methods ? (
            <TopUpContent
              methods={methods}
              back={() => setIsTopUpOpen(false)}
            />
          ) : (
            <>
              <Dialog.Title className={styles.title}>
                Оформление подписки
              </Dialog.Title>
              {isSubscriptionsError ? (
                <p>
                  К сожалению, не удалось загрузить данные. Пожалуйста,
                  перезагрузите страницу или попробуйте позже.
                </p>
              ) : (
                <>
                  {subscriptions && (
                    <div className={styles.subscriptions}>
                      {subscriptions.map((el) => (
                        <div
                          key={el.id}
                          className={clsx(
                            styles.card,
                            selectedCardId === el.id && styles.card_selected
                          )}
                        >
                          <span className={styles.card_duration}>
                            {el.duration.id === 1
                              ? "1 месяц"
                              : el.duration.id === 3
                              ? "3 месяца"
                              : el.duration.id === 6
                              ? "6 месяцев"
                              : el.duration.id === 12 && "12 месяцев"}
                          </span>

                          <span className={styles.card_price}>
                            $
                            {el.baseDiscountAmount
                              ? el.price - el.baseDiscountAmount
                              : el.price}
                          </span>

                          <div className={styles.card_bottom}>
                            {el.baseDiscountAmount && (
                              <div className={styles.card_discount}>
                                <span className={styles.card_discount_percent}>
                                  -{el.baseDiscount}%
                                </span>
                                <span className={styles.card_discount_amount}>
                                  экономия ${el.baseDiscountAmount}
                                </span>
                              </div>
                            )}

                            <button
                              className={clsx(
                                styles.card_button,
                                selectedCardId === el.id &&
                                  styles.card_button__selected
                              )}
                              onClick={() => {
                                onSelect(el)
                              }}
                            >
                              {selectedCardId === el.id ? "Выбрано" : "Выбрать"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <form
                    className={styles.bottom}
                    onSubmit={() => {
                      if (email.length === 0 || selectedCardId === undefined)
                        return

                      setIsTopUpOpen(true)
                    }}
                  >
                    <div className={styles.bottom_left}>
                      <label className={styles.label}>
                        Почта
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="Введите вашу почту"
                          className={styles.input}
                          value={email}
                          onChange={(evt) => setEmail(evt.currentTarget.value)}
                        />
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: 12,
                          }}
                        >
                          <label className={styles.label}>
                            Промокод
                            <input
                              name="promocode"
                              placeholder="Введите промокод"
                              className={styles.input}
                              value={promocode}
                              onChange={onPromoInputChange}
                            />
                          </label>
                          {!isPromoSuccess && (
                            <button
                              className={styles.button}
                              type="button"
                              onClick={applyPromocode}
                            >
                              {isPromoPending ? "Применяем..." : "Применить"}
                            </button>
                          )}
                        </div>
                        {isPromoError && (
                          <span style={{ color: "#ff4a7a", fontSize: 12 }}>
                            Такого промокода не существует
                          </span>
                        )}
                        {isPromoSuccess && (
                          <span style={{ color: "#4ae0ce", fontSize: 12 }}>
                            Промокод применён
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles.bottom_right}>
                      <span className={styles.total}>
                        Итого: ${totalPrice.toFixed(2)}
                      </span>
                      <button
                        className={styles.button}
                        disabled={
                          email.length === 0 ||
                          selectedCardId === undefined ||
                          methods === undefined
                        }
                      >
                        Выбрать способ оплаты
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default BuySubscriptionDialog

const TopUpContent = ({
  back,
  methods,
}: {
  back: () => void
  methods: PaymentsMethod[]
}) => {
  const [paymentType, setPaymentType] = useState<"crypto" | "card">("crypto")
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined)
  const [activeNetwork, setActiveNetwork] = useState<string | undefined>(
    undefined
  )
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [paymentURL, setPaymentURL] = useState("")

  const cryptoMethods = methods
    .filter((el) => el.method.id === "crypto" && el.isActive)
    .sort((a, b) => +b.isDefault - +a.isDefault)

  const networks = new Set<string>()
  const tokens = new Set<string>()

  cryptoMethods.forEach((method) => {
    tokens.add(method.currency.label)

    if (method.network && method.network.label && activeToken) {
      if (activeToken === method.currency.label) {
        networks.add(method.network.label)
      }
    }
  })

  const onSubmit = async () => {
    let paymentUrl = ""

    try {
      if (paymentType === "card") {
        paymentUrl = await axios.post(ID_URL + "top-up-balance/", {
          amount: 50,
          is_receipt_need: checkboxValue,
          payment_type: "card",
          successUrl: "https://id.crypton.xyz/payment-success",
          failUrl: "https://id.crypton.xyz/payment-error",
        })
      } else {
        paymentUrl = await axios.post(ID_URL + "top-up-balance/", {
          amount: 100,
          is_receipt_need: checkboxValue,
          payment_type: "crypto",
          network: activeNetwork ?? "BSC",
          currency: activeToken ?? "USDT",
          successUrl: "https://id.crypton.xyz/payment-success",
          failUrl: "https://id.crypton.xyz/payment-error",
        })
      }

      setPaymentURL(paymentUrl)
      window.open(paymentUrl, "_blank")
    } catch {
      console.log("error happened")
    }
  }

  return (
    <>
      <Dialog.Title className={styles.title}>Выбор метода оплаты</Dialog.Title>
      <div className={styles.topup}>
        <button className={clsx(styles.button, styles.back)} onClick={back}>
          Назад к выбору подписки
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 16,
          }}
        >
          <span>Выберите способ пополнения:</span>
          <Select
            value={paymentType}
            onValueChange={(value) =>
              setPaymentType(value as "crypto" | "card")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выбрать" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crypto">Криптовалюта</SelectItem>
              <SelectItem value="card">Банковская карта</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paymentType === "crypto" && (
          <>
            <span>Выберите валюту</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {[...tokens].map((el, i) => (
                <button
                  key={i}
                  className={clsx(
                    styles.button,
                    el === activeToken && styles.button__selected
                  )}
                  onClick={() => {
                    setActiveToken(el)
                    setActiveNetwork(undefined)
                  }}
                >
                  {el}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span>Выберите сеть:</span>
              <Select
                key={activeToken}
                value={activeNetwork}
                onValueChange={(value) => {
                  setActiveNetwork(value)
                }}
                disabled={!activeToken}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выбрать" />
                </SelectTrigger>
                <SelectContent>
                  {[...networks].map((el) => (
                    <SelectItem key={el} value={el}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={checkboxValue}
            onChange={(evt) => setCheckboxValue(evt.currentTarget.checked)}
          />
          прислать чек на почту
        </label>

        <button
          className={clsx(styles.button, styles.buyBtn)}
          onClick={onSubmit}
        >
          Оплатить
        </button>
      </div>
    </>
  )
}
