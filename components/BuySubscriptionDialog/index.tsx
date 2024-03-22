import { useRouter } from "next/router"
import React, { ChangeEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import clsx from "clsx"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"
import { Loader, LoaderSmall, Check, Error, Help } from "./Icons"

import styles from "./styles.module.scss"

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
  discounts: Array<{
    subscriptionId: number
    discountAmount: number
  }>
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

interface PaymentRequestArgs {
  paymentType: "crypto" | "card"
  network?: string
  currency?: string
  isReceiptNeed: boolean
  successUrl: string
  failUrl: string
  subscriptionId: number
  promoCode?: string
  referral_code?: string | string[]
  email: string
}

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"

const BuySubscriptionDialog = ({ children }: { children: React.ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>(
    undefined
  )
  const [showEmailHelper, setShowEmailHelper] = useState(false)
  const [promoForSubmit, setPromoForSubmit] = useState<string | null>(null)
  // isSecondStep started
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  // input values
  const [promocode, setPromocode] = useState("")
  const [email, setEmail] = useState("")

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

  const onSelect = ({ id, baseDiscountAmount, price }: Subscription) => {
    if (isPromoError || isPromoSuccess) resetPromo()

    setSelectedCardId(id)
    setPromoForSubmit(null)
    setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
  }

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isPromoError || isPromoSuccess) resetPromo()

    setPromocode(evt.currentTarget.value)
    setPromoForSubmit(null)

    if (selectedCardId) {
      const { baseDiscountAmount, price } = subscriptions.find(
        (el) => el.id === selectedCardId
      )

      setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
    }
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
        data: { discountAmount, discountKind, discounts },
      } = await mutatePromoValidation({
        promocode,
        subscriptionId: selectedCardId,
      })

      const matchedDiscount = discounts.find(
        (el) => el.subscriptionId === selectedCardId
      )

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      setPromoForSubmit(promocode)

      if (discountKind.id === "MONEY") {
        setTotalPrice(price - preferedDiscount)
      } else {
        setTotalPrice(price - price * preferedDiscount)
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
              email={email}
              subscriptionId={selectedCardId}
              promocode={promoForSubmit}
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder="Введите вашу почту"
                            className={styles.input}
                            value={email}
                            onChange={(evt) =>
                              setEmail(evt.currentTarget.value)
                            }
                          />
                          <button
                            style={{
                              background: "transparent",
                              color: "white",
                              outline: "none",
                              border: "none",
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => setShowEmailHelper(!showEmailHelper)}
                            onMouseEnter={() => setShowEmailHelper(true)}
                            onMouseLeave={() => setShowEmailHelper(false)}
                          >
                            {showEmailHelper && (
                              <div className={styles.emailHelper}>
                                Данная почта будет использована для создания
                                аккаунта Crypton ID, на который будет начислена
                                подписка
                              </div>
                            )}
                            <Help />
                          </button>
                        </div>
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <div className={styles.promo_wrapper}>
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
                          {!isPromoSuccess &&
                            selectedCardId &&
                            promocode.length > 0 && (
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
  email,
  subscriptionId,
  promocode,
}: {
  back: () => void
  methods: PaymentsMethod[]
  email: string
  subscriptionId: number
  promocode: string | null
}) => {
  const [paymentType, setPaymentType] = useState<"crypto" | "card">("crypto")
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined)
  const [activeNetwork, setActiveNetwork] = useState<string | undefined>(
    undefined
  )
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [paymentURL, setPaymentURL] = useState("")
  const [paymentID, setPaymentID] = useState<number | null>(null)

  const router = useRouter()
  const referral = router.query.ref || ""

  const { mutateAsync, isSuccess, reset, isPending } = useMutation({
    mutationFn: (args: PaymentRequestArgs) =>
      axios.post<
        PaymentRequestArgs & { paymentId: number; paymentUrl: string }
      >(ID_URL + "landing/subscriptions/buy/", {
        ...args,
      }),
  })

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
    let payload: PaymentRequestArgs = {
      paymentType: "card",
      isReceiptNeed: checkboxValue,
      successUrl: "https://id.crypton.xyz/payment-success",
      failUrl: "https://id.crypton.xyz/payment-error",
      email,
      subscriptionId,
    }

    if (referral) {
      payload = {
        ...payload,
        referral_code: referral,
      }
    }

    if (promocode) {
      payload = {
        ...payload,
        promoCode: promocode,
      }
    }

    try {
      if (paymentType === "card") {
        payload = {
          ...payload,
          paymentType: "card",
        }
      } else {
        payload = {
          ...payload,
          paymentType: "crypto",
          network: activeNetwork ?? "BSC",
          currency: activeToken ?? "USDT",
        }
      }

      const {
        data: { paymentUrl, paymentId },
      } = await mutateAsync(payload)

      setPaymentURL(paymentUrl)
      setPaymentID(paymentId)

      window.open(paymentUrl, "_blank")
    } catch {
      console.log("error happened")
    }
  }

  if (isSuccess)
    return (
      <PaymentStatus
        paymentId={paymentID}
        paymentUrl={paymentURL}
        reset={reset}
      />
    )

  return (
    <>
      <Dialog.Title className={styles.title}>Выбор метода оплаты</Dialog.Title>
      <div className={styles.topup}>
        <button className={clsx(styles.button, styles.back)} onClick={back}>
          Назад к выбору подписки
        </button>

        <div className={styles.method_wrapper}>
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
            <div className={styles.tokens}>
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
          }}
        >
          <button
            className={clsx(styles.button, styles.buyBtn)}
            onClick={onSubmit}
          >
            Оплатить
          </button>
          {isPending && <LoaderSmall />}
        </div>
      </div>
    </>
  )
}

const PaymentStatus = ({
  paymentUrl,
  paymentId,
  reset,
}: {
  paymentUrl: string
  paymentId: number
  reset: () => void
}) => {
  const { data: status, isLoading } = useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => {
      const response = await axios.get<{
        status: "PENDING" | "CANCELLED" | "COMPLETED"
      }>(ID_URL + "landing/subscriptions/status/?paymentId=" + paymentId)

      return response.data.status
    },
    refetchInterval: 5000,
  })

  if (isLoading || status === "PENDING") {
    return (
      <>
        <Dialog.Title className={styles.title}>Ожидание оплаты</Dialog.Title>
        <div className={styles.status}>
          <p>Запрос на пополнение был успешно отправлен</p>
          <p>
            Если у вас не открылась новая вкладка, перейдите по данной ссылке
            для оплаты:{" "}
            <a href={paymentUrl} target="_blank">
              {paymentUrl}
            </a>
          </p>
        </div>
        <div className={styles.status_wait}>
          <p>Оплата в процессе ожидания</p>
          <Loader />
          <p className={styles.status_after}>
            После успешной операции, мы предоставим Вам полезные ссылки для
            использования продукта Prime
          </p>
        </div>
      </>
    )
  }

  if (status === "COMPLETED") {
    return (
      <>
        <Dialog.Title className={styles.title} style={{ textAlign: "center" }}>
          Дальнейшие шаги
        </Dialog.Title>
        <div className={styles.status}>
          <div className={styles.status_wait}>
            <Check />
            <p className={styles.status_after}>
              Авторизуйтесь в личном кабинете{" "}
              <a href="https://id.crypton.xyz" target="_blank">
                Crypton ID
              </a>
              , с почтой, указанной на первом этапе, чтобы воспользоваться всеми
              преимуществами Prime
            </p>
          </div>
        </div>
      </>
    )
  }

  if (status === "CANCELLED") {
    return (
      <>
        <Dialog.Title className={styles.title} style={{ textAlign: "center" }}>
          Отмена оплаты
        </Dialog.Title>
        <div className={styles.status}>
          <div className={styles.status_wait}>
            <Error />
            <p className={styles.status_after}>
              Во время операции пополнения произошла отмена платежа, либо вышло
              время на оплату. Пожалуйста, выполните повторный выбор необходимой
              Вам подписки и метода оплаты
            </p>
            <button onClick={reset} className={styles.button}>
              Повторить
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Dialog.Title className={styles.title}>Ожидание оплаты</Dialog.Title>
      <div className={styles.status}>
        <p>Невозможно получить данные платежа</p>
      </div>
    </>
  )
}
