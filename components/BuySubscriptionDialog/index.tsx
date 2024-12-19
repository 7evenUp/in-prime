import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
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
import { toast } from "sonner"
import {
  CalendarIcon,
  ChatIcon,
  ContentIcon,
  HelperIcon,
} from "@/sections/Features/Icons"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"
const DEFAULT_CRYPTON_PROMO = "CRYPTON"

const BuySubscriptionDialog = ({
  children,
  selectedSubscription: {
    baseDiscount,
    price,
    id,
    duration,
    benefits,
    individualPrice,
  },
  order,
  resolution,
  promoForSubmit,
  setPromoForSubmit,
  discountAmount,
  discountKind,
  referralDiscountAmount,
  referralDiscountKind,
  baseDiscountAmount,
  discounts,
  isPromoReferral,
  setIsPromoReferral,
  dialogOpen,
  setDialogOpen,
}: {
  children: React.ReactNode
  selectedSubscription: Subscription
  order: number
  resolution: Resolution
  promoForSubmit: string
  setPromoForSubmit: React.Dispatch<React.SetStateAction<string>>
  discountAmount: number | undefined
  discountKind:
    | {
        id: "MONEY" | "PERCENT"
        label: "Money" | "%"
      }
    | undefined
  discounts:
    | Array<{
        subscriptionId: number
        discountAmount: number
      }>
    | undefined

  referralDiscountKind: string | null
  referralDiscountAmount: number | null
  baseDiscountAmount: number | null
  isPromoReferral: boolean
  setIsPromoReferral: React.Dispatch<React.SetStateAction<boolean>>
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}) => {
  const router = useRouter()
  const referral = router.query.ref || ""

  const closeRef = React.createRef<HTMLButtonElement>()

  const [isCryptonReferralSet, setIsCryptonReferralSet] = useState(false)
  const [promoWasUpdated, setPromoWasUpdated] = useState(false)
  const [localPromoForSubmit, setLocalPromoForSubmit] = useState(promoForSubmit)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isPromoLarger, setIsPromoLarger] = useState(false)
  const [paymentType, setPaymentType] = useState<"crypto" | "card">("crypto")
  const [activeToken, setActiveToken] = useState<string | undefined>(undefined)
  const [activeNetwork, setActiveNetwork] = useState<string | undefined>(
    undefined
  )
  const [paymentURL, setPaymentURL] = useState("")
  const [paymentID, setPaymentID] = useState<number | null>(null)
  // input values
  const [promocode, setPromocode] = useState("")
  const [email, setEmail] = useState("")
  const [checkboxValue, setCheckboxValue] = useState<boolean | "indeterminate">(
    false
  )

  const getSubscriptionPrice = () => {
    return individualPrice ? individualPrice : price
  }

  useEffect(() => {
    const price = getSubscriptionPrice()

    if (baseDiscount) {
      setTotalPrice(price - price * (baseDiscount / 100))
    } else {
      setTotalPrice(price)
    }

    if (localPromoForSubmit) {
      if (discountKind && discountAmount && discounts) {
        const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

        const preferedDiscount = matchedDiscount
          ? matchedDiscount.discountAmount
          : discountAmount

        const referralDiscount = referralDiscountAmount
          ? referralDiscountKind === "MONEY"
            ? referralDiscountAmount
            : Math.ceil(price * referralDiscountAmount)
          : 0

        const promocodeDiscount =
          discountKind.id === "MONEY"
            ? preferedDiscount
            : Math.ceil(price * preferedDiscount)

        if (baseDiscountAmount) {
          setTotalPrice(
            price -
              baseDiscountAmount -
              Math.max(referralDiscount, promocodeDiscount)
          )
        } else {
          setTotalPrice(price - Math.max(referralDiscount, promocodeDiscount))
        }

        if (referralDiscountAmount && referralDiscountKind) {
          if (referralDiscount > promocodeDiscount) {
            setIsPromoLarger(true)
          } else {
            setIsPromoLarger(false)
          }
        }
      }
    }
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
    error: promoError,
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

  const {
    mutateAsync,
    isSuccess,
    reset,
    isPending,
    isError: isBuyError,
    error: buyError,
  } = useMutation({
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

    if (isCryptonReferralSet) {
      payload = {
        ...payload,
        referral_code: DEFAULT_CRYPTON_PROMO,
      }
    }

    if (localPromoForSubmit) {
      if (isPromoReferral) {
        payload = {
          ...payload,
          referral_code: localPromoForSubmit,
        }
      } else {
        payload = {
          ...payload,
          promoCode: localPromoForSubmit,
        }
      }
    }

    try {
      if (paymentType === "card") {
        payload = {
          ...payload,
          paymentType: "card",
          currency: "RUB",
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

  const onPromoInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isPromoError || isPromoSuccess) resetPromo()

    setPromocode(evt.currentTarget.value)

    if (localPromoForSubmit) return

    if (baseDiscount) {
      setTotalPrice(
        getSubscriptionPrice() - getSubscriptionPrice() * (baseDiscount / 100)
      )
    } else {
      setTotalPrice(getSubscriptionPrice())
    }
  }

  const applyPromocode = async () => {
    if (isPromoPending || promocode.length === 0) return

    const price = getSubscriptionPrice()

    try {
      const {
        data: { discountAmount, discountKind, discounts, isReferralCode },
      } = await mutatePromoValidation({
        promocode,
        subscriptionId: id,
      })

      if (isReferralCode) {
        setIsCryptonReferralSet(false)
      }

      setIsPromoReferral(isReferralCode)

      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      setLocalPromoForSubmit(promocode)
      setPromoWasUpdated(true)

      const referralDiscount = referralDiscountAmount
        ? referralDiscountKind === "MONEY"
          ? referralDiscountAmount
          : Math.ceil(price * referralDiscountAmount)
        : 0

      const promocodeDiscount =
        discountKind.id === "MONEY"
          ? preferedDiscount
          : Math.ceil(price * preferedDiscount)

      if (baseDiscountAmount) {
        setTotalPrice(
          price -
            baseDiscountAmount -
            Math.max(referralDiscount, promocodeDiscount)
        )
      } else {
        setTotalPrice(price - Math.max(referralDiscount, promocodeDiscount))
      }

      if (referralDiscountAmount && referralDiscountKind) {
        if (referralDiscount > promocodeDiscount) {
          setIsPromoLarger(true)
        } else {
          setIsPromoLarger(false)
        }
      }

      // if (discountKind.id === "MONEY") {
      //   if (baseDiscount) {
      //     setTotalPrice(price - price * (baseDiscount / 100) - preferedDiscount)
      //   } else {
      //     setTotalPrice(price - preferedDiscount)
      //   }
      // } else {
      //   if (baseDiscount) {
      //     setTotalPrice(price - price * (baseDiscount / 100 + preferedDiscount))
      //   } else {
      //     setTotalPrice(price - price * preferedDiscount)
      //   }
      // }
    } catch {}
  }

  const onPromoRemoveClick = () => {
    setLocalPromoForSubmit("")
    setIsCryptonReferralSet(false)
    setPromoWasUpdated(true)
    if (baseDiscount) {
      setTotalPrice(getSubscriptionPrice() - baseDiscountAmount)
    } else {
      setTotalPrice(getSubscriptionPrice())
    }
  }

  const applyCryptonPromo = async () => {
    if (isPromoPending) return

    try {
      const {
        data: { discountAmount, discountKind, discounts, isReferralCode },
      } = await mutatePromoValidation({
        promocode: DEFAULT_CRYPTON_PROMO,
        subscriptionId: id,
      })

      setIsCryptonReferralSet(true)
      setIsPromoReferral(isReferralCode)

      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      setLocalPromoForSubmit(DEFAULT_CRYPTON_PROMO)
      setPromoWasUpdated(true)

      const referralDiscount = referralDiscountAmount
        ? referralDiscountKind === "MONEY"
          ? referralDiscountAmount
          : Math.ceil(price * referralDiscountAmount)
        : 0

      const promocodeDiscount =
        discountKind.id === "MONEY"
          ? preferedDiscount
          : Math.ceil(price * preferedDiscount)

      if (baseDiscountAmount) {
        setTotalPrice(
          price -
            baseDiscountAmount -
            Math.max(referralDiscount, promocodeDiscount)
        )
      } else {
        setTotalPrice(price - Math.max(referralDiscount, promocodeDiscount))
      }

      if (referralDiscountAmount && referralDiscountKind) {
        if (referralDiscount > promocodeDiscount) {
          setIsPromoLarger(true)
        } else {
          setIsPromoLarger(false)
        }
      }
    } catch {}
  }

  const scrollToOpportunities = () => {
    setDialogOpen(false)
    const positions = {
      opportunities: {
        lgg: 1812,
        lg: 1450,
        md: 1750,
        sm: 1296,
      },
    }
    window.scrollTo({
      top: positions.opportunities[resolution],
      behavior: "smooth",
    })
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger className={styles.trigger} asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          onEscapeKeyDown={() => {
            reset()
            if (promoWasUpdated) {
              setPromoForSubmit(localPromoForSubmit)
              setPromoWasUpdated(false)
            }
          }}
          onInteractOutside={() => {
            reset()
            if (promoWasUpdated) {
              setPromoForSubmit(localPromoForSubmit)
              setPromoWasUpdated(false)
            }
          }}
          onPointerDownOutside={() => {
            reset()
            if (promoWasUpdated) {
              setPromoForSubmit(localPromoForSubmit)
              setPromoWasUpdated(false)
            }
          }}
        >
          {isSuccess ? (
            <>
              <Dialog.DialogClose className={styles.close} ref={closeRef}>
                <div className={styles.close_icon} />
              </Dialog.DialogClose>
              <PaymentStatus
                paymentId={paymentID}
                paymentUrl={paymentURL}
                reset={reset}
                closeRef={closeRef}
              />
            </>
          ) : (
            <>
              <Dialog.DialogClose className={styles.close}>
                <div className={styles.close_icon} />
              </Dialog.DialogClose>
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
                                будет использована для его создания. <br /> Если
                                у вас существует профиль, почта будет
                                использована для вашей индивидуальной цены при
                                создании счёта.
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
                                будет использована для его создания. <br /> Если
                                у вас существует профиль, почта будет
                                использована для вашей индивидуальной цены при
                                создании счёта.
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
                        <RadioGroupItem value="crypto">
                          Криптовалюта
                        </RadioGroupItem>
                        <RadioGroupItem value="card">
                          Банковская карта
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
                        <div
                          key={el}
                          className={clsx(styles.card, styles[`card_${el}`])}
                        >
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
                            <p className={styles.text_before_bonuses}>
                              {order === 1 && "Все, что входит в 1 месяц"}
                              {order === 2 && "Все, что входит в 3 месяца"}
                              {order === 3 && "Все, что входит в 6 месяцев"}
                            </p>
                          )}
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
                                ЭКСТРА БОНУС
                              </span>
                            </div>
                          )}
                          {order === 0 && (
                            <ul
                              className={clsx(
                                styles.bonuses,
                                styles.bonuses_first
                              )}
                            >
                              {order !== 0 &&
                                benefits.map((benefit) => (
                                  <li key={benefit.id} className={styles.bonus}>
                                    <p className={styles.bonus_text}>
                                      {benefit.translations.ru.description}
                                    </p>
                                  </li>
                                ))}
                              {order === 0 && (
                                <>
                                  <div
                                    className={styles.text_before_bonuses_wrap}
                                  >
                                    <p
                                      className={clsx(
                                        styles.text_before_bonuses,
                                        order === 0 &&
                                          styles.text_before_bonuses_priority,
                                        order === 0 &&
                                          styles.text_before_bonuses_ability
                                      )}
                                    >
                                      <div className={styles.icon_wrapper}>
                                        <ContentIcon
                                          className={
                                            styles.text_before_bonuses_ability_icon
                                          }
                                        />
                                      </div>
                                      Контент о заработке
                                    </p>
                                    <p
                                      className={clsx(
                                        styles.text_before_bonuses,
                                        order === 0 &&
                                          styles.text_before_bonuses_priority,
                                        order === 0 &&
                                          styles.text_before_bonuses_ability
                                      )}
                                    >
                                      <div className={styles.icon_wrapper}>
                                        <CalendarIcon
                                          className={
                                            styles.text_before_bonuses_ability_icon
                                          }
                                        />
                                      </div>
                                      Прибыльный календарь
                                    </p>
                                    <p
                                      className={clsx(
                                        styles.text_before_bonuses,
                                        order === 0 &&
                                          styles.text_before_bonuses_priority,
                                        order === 0 &&
                                          styles.text_before_bonuses_ability
                                      )}
                                    >
                                      <div className={styles.icon_wrapper}>
                                        <ChatIcon
                                          className={
                                            styles.text_before_bonuses_ability_icon
                                          }
                                        />
                                      </div>
                                      Чаты с сообществом
                                    </p>

                                    <p
                                      className={clsx(
                                        styles.text_before_bonuses,
                                        order === 0 &&
                                          styles.text_before_bonuses_priority,
                                        order === 0 &&
                                          styles.text_before_bonuses_ability
                                      )}
                                    >
                                      <div className={styles.icon_wrapper}>
                                        <HelperIcon
                                          className={
                                            styles.text_before_bonuses_ability_icon
                                          }
                                        />
                                      </div>
                                      Поддержка экспертов
                                    </p>
                                  </div>

                                  <p
                                    className={clsx(
                                      styles.text_before_bonuses_prime,
                                      order === 0 &&
                                        styles.text_before_bonuses_prime_priority
                                    )}
                                  >
                                    Все{" "}
                                    <button onClick={scrollToOpportunities}>
                                      возможности Prime
                                    </button>
                                  </p>
                                </>
                              )}

                              {/* {filteredBenefits.map((benefit) => (
                                <li key={benefit.id} className={styles.bonus}>
                                  <p className={styles.bonus_text}>
                                    {benefit.translations.ru.description}
                                  </p>
                                </li>
                              ))} */}
                            </ul>
                          )}
                          <ul
                            className={clsx(
                              styles.bonuses,
                              order === 0 && styles.bonuses_first,
                              (order === 1 || order === 2 || order === 3) &&
                                styles.bonuses__small
                            )}
                          >
                            {resolution === "sm" ? (
                              <Popover.Root>
                                <Popover.Trigger
                                  className={clsx(
                                    styles.HoverCardTrigger,
                                    order === 0 &&
                                      styles.HoverCardTrigger_hidden
                                  )}
                                >
                                  <li className={styles.bonus}>
                                    <p className={styles.bonus_text}>
                                      {order === 1 && <>Proxyline</>}
                                      {order === 2 && <>Dolphin</>}
                                      {order === 3 && <>Safepal</>}
                                      <NavArrowIcon />
                                    </p>
                                  </li>
                                </Popover.Trigger>
                                <Popover.Portal>
                                  <Popover.Content
                                    className={clsx(
                                      styles.HoverCardContent,
                                      order === 2 &&
                                        styles.HoverCardContent_dolphin
                                    )}
                                    sideOffset={5}
                                  >
                                    <div className={styles.HoverCardImage}>
                                      <img
                                        className={styles.HoverCardImage_img}
                                        src={
                                          order === 1
                                            ? "/images/png/buy-subscription/subscription_2_popup.png"
                                            : order === 2
                                            ? "/images/png/buy-subscription/subscription_3_popup.png"
                                            : order === 3
                                            ? "/images/png/buy-subscription/subscription_4_popup.png"
                                            : "/images/png/buy-subscription/subscription_4_popup.png"
                                        }
                                      />
                                    </div>
                                    <div>
                                      <h1
                                        className={
                                          styles.HoverCardContent_header
                                        }
                                      >
                                        {order === 3
                                          ? benefits?.[1]?.translations.ru.name
                                          : benefits?.[0]?.translations.ru.name}
                                      </h1>
                                      <p
                                        className={styles.HoverCardContent_text}
                                      >
                                        {order === 3
                                          ? benefits?.[1]?.translations.ru
                                              .description
                                          : benefits?.[0]?.translations.ru
                                              .description}
                                      </p>
                                    </div>
                                  </Popover.Content>
                                </Popover.Portal>
                              </Popover.Root>
                            ) : (
                              <HoverCard.Root openDelay={150}>
                                <HoverCard.Trigger
                                  className={clsx(
                                    styles.HoverCardTrigger,
                                    order === 0 &&
                                      styles.HoverCardTrigger_hidden
                                  )}
                                >
                                  <li className={styles.bonus}>
                                    <p className={styles.bonus_text}>
                                      {order === 1 && <>Proxyline</>}
                                      {order === 2 && <>Dolphin</>}
                                      {order === 3 && <>Safepal</>}
                                      <NavArrowIcon />
                                    </p>
                                  </li>
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                  <HoverCard.Content
                                    className={clsx(
                                      styles.HoverCardContent,
                                      order === 2 &&
                                        styles.HoverCardContent_dolphin
                                    )}
                                    sideOffset={5}
                                  >
                                    <div className={styles.HoverCardImage}>
                                      <img
                                        className={styles.HoverCardImage_img}
                                        src={
                                          order === 1
                                            ? "/images/png/buy-subscription/subscription_2_popup.png"
                                            : order === 2
                                            ? "/images/png/buy-subscription/subscription_3_popup.png"
                                            : order === 3
                                            ? "/images/png/buy-subscription/subscription_4_popup.png"
                                            : "/images/png/buy-subscription/subscription_4_popup.png"
                                        }
                                      />
                                    </div>
                                    <div>
                                      <h1
                                        className={
                                          styles.HoverCardContent_header
                                        }
                                      >
                                        {order === 3
                                          ? benefits?.[1]?.translations.ru.name
                                          : benefits?.[0]?.translations.ru.name}
                                      </h1>
                                      <p
                                        className={styles.HoverCardContent_text}
                                      >
                                        {order === 3
                                          ? benefits?.[1]?.translations.ru
                                              .description
                                          : benefits?.[0]?.translations.ru
                                              .description}
                                      </p>
                                    </div>
                                  </HoverCard.Content>
                                </HoverCard.Portal>
                              </HoverCard.Root>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className={styles.promocode}>
                      {localPromoForSubmit &&
                        (localPromoForSubmit !== "CRYPTON" || order === 0) && (
                          <>
                            <div className={styles.promocode_submit}>
                              <div className={styles.promocode_submit_text}>
                                <span
                                  className={styles.promocode_submit_text_2}
                                >
                                  Код
                                </span>
                                <span
                                  className={styles.promocode_submit_text_1}
                                >
                                  {localPromoForSubmit}
                                </span>
                                <span
                                  className={styles.promocode_submit_text_2}
                                >
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
                            <span className={styles.promocode_discount}>
                              Ваша скидка:{" "}
                              {Math.floor(
                                100 -
                                  (totalPrice * 100) / getSubscriptionPrice()
                              )}
                              {order === 0 ? "$" : "%"}
                            </span>
                          </>
                        )}
                      {/* ) : ( 
                      !referral && ( 
                       //   <button
                        //     className={styles.promocode_submit_button}
                        //     style={{
                        //       marginBottom: 16,
                        //       textAlign: "left",
                        //       width: "fit-content",
                        //     }}
                        //     type="button"
                        //     onClick={applyCryptonPromo}
                        //   >
                        //     Активировать промо CRYPTON
                        //   </button>
                        // )
                      // )} */}
                      <div className={styles.promo_wrapper}>
                        <input
                          name="promocode"
                          // placeholder={
                          //   resolution === "sm"
                          //     ? "Промокод"
                          //     : "Промокод или рефкод"
                          // }
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
                          {
                            /* @ts-expect-error No-Error-Types */
                            promoError?.response.status === 400
                              ? /* @ts-expect-error No-Error-Types */
                                promoError?.response.data.code ===
                                "discount_not_found"
                                ? "Такого промокода не существует"
                                : /* @ts-expect-error No-Error-Types */
                                promoError?.response.data.code ===
                                  "discount_for_non_subscribed_only"
                                ? "Промокод доступен только для аккаунтов без активной подписки"
                                : /* @ts-expect-error No-Error-Types */
                                promoError?.response.data.code ===
                                  "discount_for_new_users_only"
                                ? "Промокод доступен только новым пользователям"
                                : /* @ts-expect-error No-Error-Types */
                                promoError?.response.data.code ===
                                  "discount_code_already_used"
                                ? "Промокод уже был использован"
                                : /* @ts-expect-error No-Error-Types */
                                promoError?.response.data.code ===
                                  "discount_code_validation_error"
                                ? "Не можем провалидировать промокод"
                                : "Произошла непредвиденная ошибка"
                              : "Произошла непредвиденная ошибка"
                          }
                        </span>
                      )}
                      <span className={styles.support}>
                        Изучите{" "}
                        <Dialog.Close
                          style={{
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          <a
                            className={styles.support_link}
                            onClick={() => {
                              window.scrollTo({
                                top:
                                  document.getElementById("testimonials")
                                    .offsetTop -
                                  document.getElementById("header")
                                    .clientHeight,
                                behavior: "smooth",
                              })
                            }}
                          >
                            отзывы
                          </a>
                        </Dialog.Close>{" "}
                        или задайте любые вопросы{" "}
                        <a
                          href="https://t.me/crypton_support"
                          target="_blank"
                          className={styles.support_link}
                        >
                          Наставнику.
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.button_wrapper}>
                    <button
                      className={styles.button_main}
                      disabled={
                        email.length === 0 ||
                        methods === undefined ||
                        (paymentType === "crypto" &&
                          (!activeToken || !activeNetwork))
                      }
                    >
                      Оплатить
                    </button>
                    {isPending && <LoaderSmall />}
                  </div>

                  {isBuyError && (
                    <span className={styles.error_message}>
                      {
                        /* @ts-expect-error No-Error-Types */
                        buyError?.response.status === 400
                          ? /* @ts-expect-error No-Error-Types */
                            buyError?.response.data.code ===
                            "discount_not_found"
                            ? "Такого промокода не существует"
                            : /* @ts-expect-error No-Error-Types */
                            buyError?.response.data.code ===
                              "discount_for_non_subscribed_only"
                            ? "Используемый промокод доступен только для пользователей без активной подписки"
                            : /* @ts-expect-error No-Error-Types */
                            buyError?.response.data.code ===
                              "discount_for_new_users_only"
                            ? "Промокод доступен только новым пользователям"
                            : /* @ts-expect-error No-Error-Types */
                            buyError?.response.data.code ===
                              "discount_code_already_used"
                            ? "Промокод уже был использован"
                            : /* @ts-expect-error No-Error-Types */
                            buyError?.response.data.code ===
                              "discount_code_validation_error"
                            ? "Не можем провалидировать промокод"
                            : "Произошла непредвиденная ошибка"
                          : "Произошла непредвиденная ошибка"
                      }
                    </span>
                  )}

                  <div className={styles.total_container}>
                    <span className={styles.total}>
                      Итого:{" "}
                      {promoForSubmit
                        ? totalPrice.toFixed(0)
                        : getSubscriptionPrice() - baseDiscountAmount}
                      <span className={styles.total_per_month}>
                        {" "}
                        за{" "}
                        {order === 0
                          ? "1"
                          : order === 1
                          ? "3"
                          : order === 2
                          ? "6"
                          : order === 3 && "12"}{" "}
                        мес
                      </span>
                    </span>
                    {localPromoForSubmit && (
                      <span className={styles.total_full}>
                        вместо ${getSubscriptionPrice()}
                      </span>
                    )}
                  </div>
                </div>
              </form>
              {/* <p className={styles.crypton}>
                Работает на базе Crypton ID от{" "}
                <a href="https://crypton.xyz/" target="_blank">
                  Crypton
                </a>
              </p> */}
            </>
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
  closeRef,
}: {
  paymentUrl: string
  paymentId: number
  reset: () => void
  closeRef?: React.RefObject<HTMLButtonElement>
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

  const onClose = () => {
    closeRef?.current?.click()
  }

  const onLater = () => {
    onClose()
    toast.info(
      "Все неоткрытые боксы будут храниться у нас в течение 2 недель после окончания акции. После этого они автоматически откроются, а подарки будут добавлены в ваш инвентарь в Crypton ID.",
      {
        duration: 10000,
      }
    )
  }

  if (isLoading || status === "PENDING") {
    return (
      <>
        <h2 className={styles.status_heading} style={{ marginBottom: 24 }}>
          Ожидание оплаты
        </h2>

        <div className={styles.status}>
          <p>Запрос на пополнение был успешно отправлен.</p>
          <p>
            После завершения операции мы предоставим вам ссылки для
            использования продуктов Prime.
          </p>
          <Loader />

          <p>
            Если у вас не открылась новая вкладка, перейдите по ссылке для
            оплаты:{" "}
            <a href={paymentUrl} target="_blank">
              {paymentUrl}
            </a>
          </p>
        </div>
      </>
    )
  }

  if (status === "COMPLETED") {
    return (
      <>
        <div className={styles.status}>
          <h2
            className={styles.status_heading}
            style={{ marginBottom: 30, lineHeight: 1.3 }}
          >
            Готовы получать подарки?
          </h2>
          <p className={styles.status_after}>
            Теперь у вас есть возможность открывать боксы с нашими топовыми
            призами!
          </p>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.buttons__close}
              onClick={onClose}
            >
              К открытию подарков
            </button>
            <div onClick={onLater} className={styles.buttons__id}>
              Позже
            </div>
          </div>
        </div>
      </>
    )
  }

  if (status === "CANCELLED") {
    return (
      <>
        <div className={styles.status}>
          <Error />
          <h2 className={styles.status_heading} style={{ marginBottom: 30 }}>
            Оплата отменена
          </h2>
          <div className={styles.status_wait}>
            <p className={styles.status_after}>
              Во время операции пополнения произошла отмена платежа или вышло
              время на оплату.
            </p>
            <p className={styles.status_after}>
              Пожалуйста, выполните повторный выбор необходимой Вам подписки и
              метода оплаты
            </p>
            <button onClick={reset} className={styles.button_repeat}>
              Повторить оплату
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
const NavArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.04227 5.66772L6.69377 10.202C6.77547 10.2816 6.88505 10.3262 6.99914 10.3262C7.11323 10.3262 7.22281 10.2816 7.30452 10.202L11.9578 5.66771C11.9959 5.63062 12.0261 5.58627 12.0468 5.53727C12.0675 5.48828 12.0782 5.43564 12.0782 5.38247C12.0782 5.32929 12.0675 5.27665 12.0468 5.22766C12.0261 5.17866 11.9959 5.13431 11.9578 5.09722C11.8796 5.0209 11.7747 4.97817 11.6655 4.97817C11.5563 4.97817 11.4514 5.0209 11.3733 5.09722L6.99914 9.36109L2.62589 5.09722C2.5478 5.02116 2.44309 4.9786 2.33408 4.9786C2.22507 4.9786 2.12036 5.02116 2.04227 5.09722C2.00417 5.13431 1.97388 5.17867 1.95321 5.22766C1.93253 5.27665 1.92187 5.32929 1.92187 5.38247C1.92187 5.43564 1.93253 5.48828 1.95321 5.53727C1.97388 5.58627 2.00417 5.63062 2.04227 5.66772Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
)
