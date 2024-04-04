import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import * as Dialog from "@radix-ui/react-dialog"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"
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

import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup/RadioGroup"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"

import {
  PaymentRequestArgs,
  PaymentsMethod,
  Promocode,
  Subscription,
} from "@/types/api-types"
import { Resolution } from "@/types/resolution"

import styles from "./styles.module.scss"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"

const BuySubscriptionDialog = ({
  children,
  selectedSubscription: { baseDiscountAmount, price, id, duration, benefits },
  order,
  resolution,
}: {
  children: React.ReactNode
  selectedSubscription: Subscription
  order: number
  resolution: Resolution
}) => {
  const router = useRouter()
  const referral = router.query.ref || ""

  const [totalPrice, setTotalPrice] = useState(0)
  const [paymentType, setPaymentType] = useState<"crypto" | "card">("crypto")
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined)
  const [activeNetwork, setActiveNetwork] = useState<string | undefined>(
    undefined
  )
  const [promoForSubmit, setPromoForSubmit] = useState<string | null>(null)
  const [paymentURL, setPaymentURL] = useState("")
  const [paymentID, setPaymentID] = useState<number | null>(null)
  // input values
  const [promocode, setPromocode] = useState("")
  const [email, setEmail] = useState("")
  const [checkboxValue, setCheckboxValue] = useState<boolean | "indeterminate">(
    false
  )

  useEffect(() => {
    setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
  }, [])

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

  const { mutateAsync, isSuccess, reset, isPending } = useMutation({
    mutationFn: (args: PaymentRequestArgs) =>
      axios.post<
        PaymentRequestArgs & { paymentId: number; paymentUrl: string }
      >(ID_URL + "landing/subscriptions/buy/", {
        ...args,
      }),
  })

  const cryptoMethods = methods
    ?.filter((el) => el.method.id === "crypto" && el.isActive)
    .sort((a, b) => +b.isDefault - +a.isDefault)

  const networks = new Set<string>()
  const tokens = new Set<string>()

  cryptoMethods?.forEach((method) => {
    tokens.add(method.currency.label)

    if (method.network && method.network.label && activeToken) {
      if (activeToken === method.currency.label) {
        networks.add(method.network.label)
      }
    }
  })

  const onSubmit = async (event) => {
    if (email.length === 0) return

    event.preventDefault()

    let payload: PaymentRequestArgs = {
      paymentType: "card",
      isReceiptNeed: checkboxValue as boolean,
      successUrl: "https://id.crypton.xyz/payment-success",
      failUrl: "https://id.crypton.xyz/payment-error",
      email,
      subscriptionId: id,
    }

    if (referral) {
      payload = {
        ...payload,
        referral_code: referral,
      }
    }

    if (promoForSubmit) {
      payload = {
        ...payload,
        promoCode: promoForSubmit,
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

      // window.open(paymentUrl, "_blank")
    } catch {
      console.log("error happened")
    }
  }

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isPromoError || isPromoSuccess) resetPromo()

    setPromocode(evt.currentTarget.value)

    if (promoForSubmit) return

    setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
  }

  const applyPromocode = async () => {
    if (isPromoPending || promocode.length === 0) return

    const tempPrice = baseDiscountAmount ? price - baseDiscountAmount : price

    try {
      const {
        data: { discountAmount, discountKind, discounts },
      } = await mutatePromoValidation({
        promocode,
        subscriptionId: id,
      })

      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      setPromoForSubmit(promocode)

      if (discountKind.id === "MONEY") {
        setTotalPrice(tempPrice - preferedDiscount)
      } else {
        setTotalPrice(tempPrice - tempPrice * preferedDiscount)
      }
    } catch {}
  }

  const onPromoRemoveClick = () => {
    setPromoForSubmit(null)
    setTotalPrice(baseDiscountAmount ? price - baseDiscountAmount : price)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.trigger} asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          onEscapeKeyDown={() => reset()}
          onInteractOutside={() => reset()}
          onPointerDownOutside={() => reset()}
        >
          {isSuccess ? (
            <PaymentStatus
              paymentId={paymentID}
              paymentUrl={paymentURL}
              reset={reset}
            />
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.top}>
                <div className={styles.top_left}>
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
                      placeholder="Электронная почта"
                      className={styles.input_standard}
                      value={email}
                      onChange={(evt) => setEmail(evt.currentTarget.value)}
                    />
                    {resolution === "sm" ? (
                      <Popover.Root>
                        <Popover.Trigger className={styles.PopoverTrigger}>
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
                            type="button"
                          >
                            <Help />
                          </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                          <Popover.Content
                            className={styles.PopoverContent}
                            sideOffset={5}
                          >
                            <p>
                              Если у вас нет аккаунта Crypton ID, данная почта
                              будет использована для его создания. <br /> Если у
                              вас существует профиль, почта будет использована
                              для вашей индивидуальной цены при создании счёта.
                            </p>
                          </Popover.Content>
                        </Popover.Portal>
                      </Popover.Root>
                    ) : (
                      <HoverCard.Root openDelay={150}>
                        <HoverCard.Trigger
                          className={styles.HoverCardTrigger}
                          asChild
                        >
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
                            type="button"
                          >
                            <Help />
                          </button>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                          <HoverCard.Content
                            className={styles.HoverCardContent}
                            sideOffset={5}
                            side="right"
                          >
                            <p>
                              Если у вас нет аккаунта Crypton ID, данная почта
                              будет использована для его создания. <br /> Если у
                              вас существует профиль, почта будет использована
                              для вашей индивидуальной цены при создании счёта.
                            </p>
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    )}
                  </div>
                  <Checkbox
                    id="receipt"
                    checked={checkboxValue}
                    onCheckedChange={setCheckboxValue}
                  >
                    Прислать чек на почту
                  </Checkbox>
                  <div className={styles.payment}>
                    <h3 className={styles.payment_heading}>Способ оплаты</h3>
                    <RadioGroup
                      value={paymentType}
                      onValueChange={(value) =>
                        setPaymentType(value as "crypto" | "card")
                      }
                    >
                      <RadioGroupItem value="card">
                        Банковская карта
                      </RadioGroupItem>
                      <RadioGroupItem value="crypto">
                        Криптовалюта
                      </RadioGroupItem>
                    </RadioGroup>
                  </div>
                  {paymentType === "card" ? (
                    <p className={styles.payment_card}>
                      При оплате картой конвертация <br /> осуществляется по
                      курсу ЦБ РФ
                    </p>
                  ) : (
                    <div className={styles.payment_crypto}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 16,
                        }}
                      >
                        <span>Выберите валюту:</span>
                        <Select
                          key={activeToken}
                          value={activeToken}
                          onValueChange={(value) => {
                            setActiveToken(value)
                            setActiveNetwork(undefined)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Не выбрано" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...tokens].map((el) => (
                              <SelectItem key={el} value={el}>
                                {el}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 16,
                        }}
                      >
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
                            <SelectValue placeholder="Не выбрано" />
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
                    </div>
                  )}
                </div>

                <div className={styles.top_right}>
                  <div
                    className={clsx(
                      styles.cards,
                      order === 0 && styles.cards_0__active,
                      order === 1 && styles.cards_1__active,
                      order === 2 && styles.cards_2__active,
                      order === 3 && styles.cards_3__active
                    )}
                  >
                    {[0, 1, 2, 3].map((el) => (
                      <div className={clsx(styles.card, styles[`card_${el}`])}>
                        <span
                          className={clsx(
                            styles.card_duration,
                            order === 0 && styles.card_duration__active1,
                            order === 1 && styles.card_duration__active2,
                            order === 2 && styles.card_duration__active3,
                            order === 3 && styles.card_duration__active4
                          )}
                        >
                          {duration.id} МЕС
                        </span>
                        {order !== 0 && (
                          <div
                            className={clsx(
                              styles.bonuses_heading,
                              order === 1 && styles.bonuses_heading1,
                              order === 2 && styles.bonuses_heading2,
                              order === 3 && styles.bonuses_heading3
                            )}
                          >
                            <div className={styles.bonuses_heading_icon}>
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.6834 6.57031H6.3916V11.9998H10.6834V6.57031Z"
                                  fill="#171717"
                                />
                                <path
                                  d="M5.60823 6.57031H1.31641V11.9998H5.60823V6.57031Z"
                                  fill="#171717"
                                />
                                <path
                                  d="M9.34618 2.21325C9.46227 2.00055 9.52834 1.75683 9.52834 1.49791C9.52836 0.671953 8.85638 0 8.03045 0C7.41955 0 6.79447 0.315656 6.31557 0.866039C6.19705 1.00223 6.09149 1.1486 6.0002 1.30104C5.90891 1.1486 5.80334 1.00223 5.68482 0.866039C5.20592 0.315656 4.58087 0 3.96995 0C3.14401 0 2.47203 0.671977 2.47203 1.49791C2.47203 1.7568 2.53808 2.00055 2.65419 2.21325H0.614258V5.78791H5.60888V2.21325H6.39149V5.78791H11.3861V2.21325H9.34618ZM3.96995 2.21325C3.57554 2.21325 3.25463 1.89234 3.25463 1.49791C3.25463 1.10348 3.57554 0.782602 3.96995 0.782602C4.68008 0.782602 5.35524 1.509 5.55172 2.21323L3.96995 2.21325ZM8.03045 2.21325H6.44867C6.64515 1.509 7.32031 0.782625 8.03045 0.782625C8.42485 0.782625 8.74576 1.10353 8.74576 1.49794C8.74574 1.89237 8.42485 2.21325 8.03045 2.21325Z"
                                  fill="#171717"
                                />
                              </svg>
                            </div>
                            <span className={styles.bonuses_heading_text}>
                              БОНУСЫ
                            </span>
                          </div>
                        )}
                        <ul className={styles.bonuses}>
                          {benefits.map((benefit) =>
                            benefit.file ? (
                              resolution === "sm" ? (
                                <Popover.Root key={benefit.id}>
                                  <Popover.Trigger
                                    className={styles.BonusPopoverTrigger}
                                  >
                                    <li className={styles.bonus}>
                                      <p className={styles.bonus_text}>
                                        {benefit.translations.ru.name}
                                      </p>
                                    </li>
                                  </Popover.Trigger>
                                  <Popover.Portal>
                                    <Popover.Content
                                      className={styles.BonusPopoverContent}
                                      sideOffset={5}
                                    >
                                      <img
                                        className={styles.BonusPopoverImage}
                                        src={benefit.file}
                                        alt={benefit.translations.ru.name}
                                      />
                                    </Popover.Content>
                                  </Popover.Portal>
                                </Popover.Root>
                              ) : (
                                <HoverCard.Root
                                  key={benefit.id}
                                  openDelay={150}
                                >
                                  <HoverCard.Trigger
                                    className={styles.BonusHoverCardTrigger}
                                  >
                                    <li className={styles.bonus}>
                                      <p className={styles.bonus_text}>
                                        {benefit.translations.ru.name}
                                      </p>
                                    </li>
                                  </HoverCard.Trigger>
                                  <HoverCard.Portal>
                                    <HoverCard.Content
                                      className={styles.BonusHoverCardContent}
                                      sideOffset={5}
                                      side="right"
                                    >
                                      <img
                                        className={styles.BonusHoverCardImage}
                                        src={benefit.file}
                                        alt={benefit.translations.ru.name}
                                      />
                                    </HoverCard.Content>
                                  </HoverCard.Portal>
                                </HoverCard.Root>
                              )
                            ) : (
                              <li key={benefit.id} className={styles.bonus}>
                                <p className={styles.bonus_text}>
                                  {benefit.translations.ru.name}
                                </p>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className={styles.promocode}>
                    {promoForSubmit && (
                      <div className={styles.promocode_submit}>
                        <div className={styles.promocode_submit_text}>
                          <span className={styles.promocode_submit_text_1}>
                            {promoForSubmit}
                          </span>
                          <span className={styles.promocode_submit_text_2}>
                            активирован
                          </span>
                        </div>
                        <button
                          className={styles.promocode_submit_button}
                          type="button"
                          onClick={onPromoRemoveClick}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                    <div className={styles.promo_wrapper}>
                      <input
                        name="promocode"
                        placeholder="Промокод"
                        className={styles.input}
                        value={promocode}
                        onChange={onPromoInputChange}
                      />
                      <button
                        className={styles.button}
                        type="button"
                        onClick={applyPromocode}
                        disabled={promocode.length <= 0}
                      >
                        {isPromoPending ? "Применяем..." : "Применить"}
                      </button>
                    </div>
                    {isPromoError && (
                      <span style={{ color: "#ff4a7a", fontSize: 12 }}>
                        Такого промокода не существует
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <button
                    className={styles.button_main}
                    disabled={email.length === 0 || methods === undefined}
                  >
                    Оплатить
                  </button>
                  {isPending && <LoaderSmall />}
                </div>

                <div className={styles.total_container}>
                  <span className={styles.total}>
                    Итого: ${totalPrice.toFixed(2)}
                  </span>
                  {promoForSubmit && (
                    <span className={styles.total_full}>
                      вместо $
                      {baseDiscountAmount
                        ? (price - baseDiscountAmount).toFixed(2)
                        : price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default BuySubscriptionDialog

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
      <div className={styles.status}>
        <p>Невозможно получить данные платежа</p>
      </div>
    </>
  )
}
