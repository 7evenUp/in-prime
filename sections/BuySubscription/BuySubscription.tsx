import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import * as Switch from "@radix-ui/react-switch"
import clsx from "clsx"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"

import {
  CalendarIcon,
  ChatIcon,
  ContentIcon,
  HelperIcon,
} from "../Features/Icons"

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"

import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { Resolution } from "@/types/resolution"
import { Promocode, Subscription } from "@/types/api-types"

import styles from "./BuySubscription.module.scss"

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = process.env.NEXT_PUBLIC_ID_URL
const SPECIAL_PROMO = process.env.NEXT_PUBLIC_PROMO
const DEFAULT_CRYPTON_PROMO = "CRYPTON"

const fallbackSubscriptions: Subscription[] = [
  {
    id: 1,
    baseDiscount: null,
    baseDiscountAmount: null,
    referralDiscountAmount: null,
    referralDiscountKind: null,
    benefits: [
      {
        id: 1,
        file: null,
        translations: {
          ru: {
            name: "1",
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 1,
      label: "10",
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: "1 month",
    price: 99,
  },
  {
    id: 2,
    baseDiscount: 5,
    baseDiscountAmount: 99,
    referralDiscountAmount: null,
    referralDiscountKind: null,
    benefits: [
      {
        id: 1,
        file: null,
        translations: {
          ru: {
            name: "1",
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 3,
      label: "Three",
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: "3 months",
    price: 297,
  },
  {
    id: 3,
    baseDiscount: 10,
    baseDiscountAmount: 99,
    referralDiscountAmount: null,
    referralDiscountKind: null,
    benefits: [
      {
        id: 1,
        file: null,
        translations: {
          ru: {
            name: "1",
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 6,
      label: "Six",
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: "6 months",
    price: 594,
  },
  {
    id: 4,
    baseDiscount: 15,
    baseDiscountAmount: 1188,
    referralDiscountAmount: null,
    referralDiscountKind: null,
    benefits: [
      {
        id: 1,
        file: null,
        translations: {
          ru: {
            name: "1",
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 12,
      label: "Twelve",
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: "12 months",
    price: 1188,
  },
]

const BuySubscription = ({
  tariffs,
  resolution,
}: {
  tariffs: {
    lgg: React.JSX.Element
    lg: React.JSX.Element
    md: React.JSX.Element
    sm: React.JSX.Element
  }
  resolution: Resolution
}) => {
  const [showMonthlyPrice, setShowMonthlyPrice] = useState(true)
  const [promoForSubmit, setPromoForSubmit] = useState("")
  const [isPromoReferral, setIsPromoReferral] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [discountKind, setDiscountKind] = useState<{
    id: "MONEY" | "PERCENT"
    label: "Money" | "%"
  }>()
  const [discounts, setDiscounts] = useState<
    Array<{
      subscriptionId: number
      discountAmount: number
    }>
  >([])
  const [validFor, setValidFor] = useState([])
  const [invalidFor, setInvalidFor] = useState([])

  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    data: subscriptions,
    isError: isSubscriptionsError,
    isLoading,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      try {
        const response = await axios.get<Subscription[]>(
          `${ID_URL}/api/v1/subscriptions/get-active/`
        )
        return response.data.filter(
          (el) => el.isActive && el.kindId === PRIME_SUBSCRIPTION_KIND_ID
        )
      } catch (error) {
        return fallbackSubscriptions
      }
    },
  })

  const {
    mutateAsync: mutatePromoValidation,
    isPending,
    reset,
  } = useMutation({
    mutationFn: ({
      promocode,
      subscriptionId,
    }: {
      promocode: string
      subscriptionId: number
    }) =>
      axios.post<Promocode>(ID_URL + "/api/v1/promo-codes/validate/", {
        promocode,
        subscription: subscriptionId,
      }),
  })

  // useEffect(() => {
  //   setTimerProgress(
  //     Math.round(
  //       Date.now() >= START_DATE
  //         ? ((Date.now() - START_DATE) / (END_DATE - START_DATE)) * 100
  //         : 0
  //     )
  //   )
  // }, [])

  useEffect(() => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref")

    if (SPECIAL_PROMO) {
      setPromoForSubmit(SPECIAL_PROMO)
      return
    }
    if (refCode) {
      setPromoForSubmit(refCode)
      return
    }

    setPromoForSubmit(DEFAULT_CRYPTON_PROMO)
  }, [])

  useEffect(() => {
    reset()
    setDiscountAmount(0)
    setDiscountKind(undefined)
    setDiscounts([])

    const validate = async () => {
      if (promoForSubmit) {
        try {
          const {
            data: {
              discountAmount,
              discountKind,
              discounts,
              isReferralCode,
              invalidForSubscriptions,
              validForSubscriptions,
            },
          } = await mutatePromoValidation({
            promocode: promoForSubmit,
            subscriptionId: 1,
          })

          setIsPromoReferral(isReferralCode)
          setDiscountAmount(discountAmount)
          setDiscountKind(discountKind)
          setDiscounts(discounts)
          setValidFor(validForSubscriptions)
          setInvalidFor(invalidForSubscriptions)
        } catch {
          console.log("Error while validating promocode: ", promoForSubmit)
        }
      }
    }
    validate()
  }, [promoForSubmit])

  const buyRef = useRef(null)

  const scrollToBlock = () => {
    buyRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (isLoading) {
    return (
      <div className="app__container__subscribe" id="subscribe">
        {" "}
      </div>
    )
  }

  return (
    <div className="app__container__subscribe__wrapper">
      <div className="app__container__subscribe__promoback" />

      <div className="app__container__subscribe" id="subscribe">
        <div className="app__container__subscribe__noise" />
        {/* <div className="app__container__subscribe__back"> */}
        {/* <div className="app__container__subscribe__back__left-gradient" />
          <div className="app__container__subscribe__back__right-gradient" /> */}
        {/* </div> */}
        <div className="app__container__subscribe__content">
          <div className="app__container__subscribe__content__header">
            <h1
              className="app__container__subscribe__content__title"
              ref={buyRef}
            >
              Оформите подписку
            </h1>
          </div>

          <div className={styles.switch}>
            <span className={styles.show_price}>Показать цену:</span>
            <div className={styles.switch_container}>
              <span
                className={clsx(
                  styles.switch_text,
                  showMonthlyPrice && styles.switch_text__active
                )}
                onClick={() => setShowMonthlyPrice(true)}
              >
                в месяц
              </span>
              <Switch.Root
                className={styles.SwitchRoot}
                checked={showMonthlyPrice}
                onCheckedChange={setShowMonthlyPrice}
              >
                <Switch.Thumb className={styles.SwitchThumb} />
              </Switch.Root>
              <span
                className={clsx(
                  styles.switch_text,
                  !showMonthlyPrice && styles.switch_text__active
                )}
                onClick={() => setShowMonthlyPrice(false)}
              >
                за весь период
              </span>
            </div>
          </div>

          {subscriptions && (
            <div className={styles.subscriptions}>
              {subscriptions.map((el, i) => (
                <SubscriptionCard
                  key={el.id}
                  subscription={el}
                  order={i}
                  resolution={resolution}
                  showMonthlyPrice={showMonthlyPrice}
                  promoForSubmit={promoForSubmit}
                  setPromoForSubmit={setPromoForSubmit}
                  isPromoReferral={isPromoReferral}
                  setIsPromoReferral={setIsPromoReferral}
                  discounts={discounts}
                  discountAmount={discountAmount}
                  discountKind={discountKind}
                  isPromoPending={isPending}
                  isValidForPromo={
                    validFor.length === 0 && invalidFor.length === 0
                      ? true
                      : invalidFor.length === 0 && validFor.includes(el.id)
                      ? true
                      : validFor.length === 0 && !invalidFor.includes(el.id)
                      ? true
                      : validFor.length !== 0 &&
                        invalidFor.length !== 0 &&
                        validFor.includes(el.id)
                      ? true
                      : false
                  }
                />
              ))}
            </div>
          )}

          <div className={styles.support_wrapper}>
            <p className={styles.support}>
              Остались вопросы? Задай их нашему{" "}
              <a
                href="https://t.me/crypton_support"
                target="_blank"
                className={styles.support_link}
              >
                специалисту в Телеграм
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* <BuySubscriptionDialog
        key={discountAmount}
        selectedSubscription={subscriptions[0]}
        order={0}
        resolution={resolution}
        promoForSubmit={promoForSubmit}
        setPromoForSubmit={setPromoForSubmit}
        discountAmount={discountAmount}
        discountKind={discountKind}
        discounts={discounts}
        referralDiscountAmount={referralDiscountAmount}
        referralDiscountKind={referralDiscountKind}
        isPromoReferral={isPromoReferral}
        setIsPromoReferral={setIsPromoReferral}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <button className={styles.button}>Купить подписку</button>
      </BuySubscriptionDialog> */}
    </div>
  )
}

export default BuySubscription

const SubscriptionCard = ({
  subscription,
  order,
  resolution,
  showMonthlyPrice,
  promoForSubmit,
  setPromoForSubmit,
  isPromoReferral,
  setIsPromoReferral,
  discountAmount,
  discountKind,
  discounts,
  isPromoPending,
  isValidForPromo,
}: {
  subscription: Subscription
  order: number
  resolution: Resolution
  showMonthlyPrice: boolean
  promoForSubmit: string
  setPromoForSubmit: React.Dispatch<React.SetStateAction<string>>
  isPromoReferral: boolean
  setIsPromoReferral: React.Dispatch<React.SetStateAction<boolean>>
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
  isPromoPending: boolean
  isValidForPromo: boolean
}) => {
  const {
    baseDiscountAmount,
    baseDiscount,
    price,
    id,
    duration,
    benefits,
    individualPrice,
    referralDiscountAmount,
    referralDiscountKind,
  } = subscription

  const [cardPrice, setCardPrice] = useState(0)
  const [isPromoLarger, setIsPromoLarger] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [popoverOpened, setPopoverOpened] = useState(false)
  const [hoverCardOpened, setHoverCardOpened] = useState(false)
  const [hoverAbilityOpened, setHoverAbilityOpened] = useState(false)

  const getSubscriptionPrice = () => {
    return individualPrice ? individualPrice : price
  }

  useEffect(() => {
    const price = getSubscriptionPrice()
    let fullPrice

    try {
      // if (isValidForPromo && discountKind && discountAmount && discounts) {
      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      // const preferedDiscount = matchedDiscount
      //   ? matchedDiscount.discountAmount
      //   : discountAmount

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      const referralDiscount = referralDiscountAmount
        ? referralDiscountKind === "MONEY"
          ? referralDiscountAmount
          : Math.ceil(price * referralDiscountAmount)
        : 0

      const promocodeDiscount =
        discountKind?.id === "MONEY"
          ? preferedDiscount
          : Math.ceil(price * preferedDiscount)

      if (baseDiscountAmount) {
        setCardPrice(
          showMonthlyPrice
            ? (price -
                baseDiscountAmount -
                Math.max(referralDiscount, promocodeDiscount)) /
                duration.id
            : price -
                baseDiscountAmount -
                Math.max(referralDiscount, promocodeDiscount)
        )
      } else {
        setCardPrice(
          showMonthlyPrice
            ? (price -
                baseDiscountAmount -
                Math.max(referralDiscount, promocodeDiscount)) /
                duration.id
            : price -
                baseDiscountAmount -
                Math.max(referralDiscount, promocodeDiscount)
        )
      }

      if (referralDiscountAmount && referralDiscountKind) {
        if (referralDiscount > promocodeDiscount) {
          setIsPromoLarger(true)
        } else {
          setIsPromoLarger(false)
        }
      }
    } catch (error) {
      setPromoForSubmit("")
    }
  }, [discountKind, discountAmount, discounts, showMonthlyPrice])

  useEffect(() => {
    const price = getSubscriptionPrice()
    let fullPrice

    try {
      // if (isValidForPromo && discountKind && discountAmount && discounts) {
      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      // const preferedDiscount = matchedDiscount
      //   ? matchedDiscount.discountAmount
      //   : discountAmount

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      const referralDiscount = referralDiscountAmount
        ? referralDiscountKind === "MONEY"
          ? referralDiscountAmount
          : Math.ceil(price * referralDiscountAmount)
        : 0

      const promocodeDiscount =
        discountKind?.id === "MONEY"
          ? preferedDiscount
          : Math.ceil(price * preferedDiscount)

      if (baseDiscountAmount) {
        setCardPrice(
          showMonthlyPrice
            ? (price -
                baseDiscountAmount -
                Math.max(referralDiscount, promocodeDiscount)) /
                duration.id
            : price -
                baseDiscountAmount -
                Math.max(referralDiscount, promocodeDiscount)
        )
      } else {
        setCardPrice(
          showMonthlyPrice
            ? (price - Math.max(referralDiscount, promocodeDiscount)) /
                duration.id
            : price - Math.max(referralDiscount, promocodeDiscount)
        )
      }

      if (referralDiscountAmount && referralDiscountKind) {
        if (referralDiscount > promocodeDiscount) {
          setIsPromoLarger(true)
        } else {
          setIsPromoLarger(false)
        }
      }
    } catch (error) {
      setPromoForSubmit("")
    }
  }, [showMonthlyPrice])

  const totalDiscount =
    discountAmount && discountKind
      ? baseDiscount
        ? discountKind.id === "MONEY"
          ? Math.floor(
              (discountAmount * 100) / getSubscriptionPrice() + baseDiscount
            )
          : discountAmount * 100 + baseDiscount
        : discountKind.id === "MONEY"
        ? Math.floor((discountAmount * 100) / getSubscriptionPrice())
        : discountAmount * 100
      : baseDiscount
      ? baseDiscount
      : 0

  const scrollToOpportunities = () => {
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
    <div className={styles.subscription}>
      {/* {order === 3 && <div className={styles.profitable}>выгодно</div>} */}
      <span className={styles.duration}>{duration.id} МЕС</span>
      {isPromoPending ? (
        <div className={styles.loading} />
      ) : (
        <div className={clsx(styles.price, order === 0 && styles.price_0)}>
          <div className={styles.price_wrapper}>
            <span className={styles.price_left}>
              $
              {Number.isInteger(cardPrice) ? (
                cardPrice
              ) : (
                <>{cardPrice.toFixed(2).split(".")[0]}</>
              )}
              {/* {Number.isInteger(cardPrice) ? (
                cardPrice
              ) : (
                <>
                  {cardPrice.toFixed(2).split(".")[0]}
                  <span className={styles.price_fractional}>
                    .{cardPrice.toFixed(2).split(".")[1]}
                  </span>
                </>
              )} */}
            </span>

            <span
              className={clsx(
                styles.price_month
                // Number.isInteger(cardPrice)
                //   ? styles.price_month
                //   : styles.price_month_fractional
              )}
            >
              {showMonthlyPrice && <>/ мес</>}
            </span>
          </div>
          {duration.id === 1 &&
            discountKind &&
            discountAmount !== 0 &&
            // order !== 0 &&
            discounts && (
              <div className={styles.price_discount}>
                <span className={styles.price_discount_percent}>
                  -
                  {/* {showMonthlyPrice
                    ? Math.round(
                        100 - (cardPrice * 100) / (price / duration.id)
                      )
                    : Math.round(100 - (cardPrice * 100) / price)} */}
                  {totalDiscount}
                  {order === 0 ? "$" : "%"}
                </span>
                <span className={styles.price_discount_amount}>${price}</span>
              </div>
            )}
          {baseDiscountAmount && (
            <div className={styles.price_discount}>
              <span className={styles.price_discount_percent}>
                -
                {/* {discountKind && discountAmount && discounts
                  ? showMonthlyPrice
                    ? Math.round(
                        100 - (cardPrice * 100) / (price / duration.id)
                      )
                    : Math.round(100 - (cardPrice * 100) / price)
                  : baseDiscount} */}
                {totalDiscount}%
              </span>
              <span className={styles.price_discount_amount}>
                ${showMonthlyPrice ? price / duration.id : price}
              </span>
            </div>
          )}
        </div>
      )}
      <div
        className={clsx(
          styles.text_before_bonuses_wrapper,
          order === 0 && styles.text_before_bonuses_wrapper_priority
        )}
      >
        {/* <p
          className={clsx(
            styles.text_before_bonuses,
            order === 0 && styles.text_before_bonuses_priority
          )}
        >
          {order === 0 && (
            <>
              Все{" "}
              <button onClick={scrollToOpportunities}>возможности Prime</button>
            </>
          )}
        </p> */}

        {order === 0 && (
          <>
            {resolution === "sm" ? (
              <Popover.Root
                open={hoverAbilityOpened}
                onOpenChange={setHoverAbilityOpened}
              >
                <Popover.Trigger
                  className={clsx(styles.PopoverTrigger)}
                  onClick={() => setHoverAbilityOpened((prev) => !prev)}
                >
                  <div className={clsx(styles.bonus, styles.bonus_first)}>
                    <p
                      className={clsx(
                        styles.text_before_bonuses,
                        order === 0 && styles.text_before_bonuses_priority
                      )}
                    >
                      Все <button>возможности Prime</button>
                    </p>
                    <NavArrowIcon />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className={clsx(
                      styles.PopoverContent,
                      styles.PopoverContent_first
                    )}
                    sideOffset={5}
                  >
                    <div className={styles.text_before_bonuses_wrap}>
                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <ContentIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Контент о заработке
                      </p>
                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <CalendarIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Прибыльный календарь
                      </p>
                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <ChatIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Чаты с сообществом
                      </p>

                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <HelperIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Поддержка экспертов
                      </p>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            ) : (
              <Popover.Root
                // openDelay={150}
                open={hoverAbilityOpened}
                onOpenChange={setHoverAbilityOpened}
              >
                <Popover.Trigger
                  className={clsx(
                    styles.HoverCardTrigger,
                    styles.HoverCardTrigger_first
                  )}
                  onClick={() => setHoverAbilityOpened((prev) => !prev)}
                >
                  <div className={clsx(styles.bonus, styles.bonus_first)}>
                    <p
                      className={clsx(
                        styles.text_before_bonuses,
                        order === 0 && styles.text_before_bonuses_priority
                      )}
                    >
                      Все <button>возможности Prime</button>
                    </p>
                    <NavArrowIcon />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    className={clsx(
                      styles.HoverCardContent,
                      styles.HoverCardContent_first
                    )}
                    sideOffset={5}
                  >
                    <div className={styles.text_before_bonuses_wrap}>
                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <ContentIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Контент о заработке
                      </p>
                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <CalendarIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Прибыльный календарь
                      </p>
                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <ChatIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Чаты с сообществом
                      </p>

                      <p
                        className={clsx(
                          styles.text_before_bonuses,
                          order === 0 && styles.text_before_bonuses_priority,
                          order === 0 && styles.text_before_bonuses_ability
                        )}
                      >
                        <div className={styles.icon_wrapper}>
                          <HelperIcon
                            className={styles.text_before_bonuses_ability_icon}
                          />
                        </div>
                        Поддержка экспертов
                      </p>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}
          </>
        )}

        <p className={clsx(styles.text_before_bonuses)}>
          {order === 1 && "Все, что входит в 1 месяц"}
          {order === 2 && "Все, что входит в 3 месяца"}
          {order === 3 && "Все, что входит в 6 месяцев"}
        </p>
        {order === 3 && (
          <p
            className={clsx(
              styles.text_before_bonuses,
              styles.text_before_bonuses_priority
            )}
          >
            + <span>приоритетная поддержка</span>
          </p>
        )}
      </div>

      {/* <div className={styles.text_before_bonuses_wrap}>
          <p
            className={clsx(
              styles.text_before_bonuses,
              order === 0 && styles.text_before_bonuses_priority,
              order === 0 && styles.text_before_bonuses_ability
            )}
          >
            +
            <div className={styles.icon_wrapper}>
              <ContentIcon
                className={styles.text_before_bonuses_ability_icon}
              />
            </div>
            Контент о заработке
          </p>
          <p
            className={clsx(
              styles.text_before_bonuses,
              order === 0 && styles.text_before_bonuses_priority,
              order === 0 && styles.text_before_bonuses_ability
            )}
          >
            +
            <div className={styles.icon_wrapper}>
              <CalendarIcon
                className={styles.text_before_bonuses_ability_icon}
              />
            </div>
            Прибыльный календарь
          </p>
          <p
            className={clsx(
              styles.text_before_bonuses,
              order === 0 && styles.text_before_bonuses_priority,
              order === 0 && styles.text_before_bonuses_ability
            )}
          >
            +
            <div className={styles.icon_wrapper}>
              <ChatIcon className={styles.text_before_bonuses_ability_icon} />
            </div>
            Чаты с сообществом
          </p>

          <p
            className={clsx(
              styles.text_before_bonuses,
              order === 0 && styles.text_before_bonuses_priority,
              order === 0 && styles.text_before_bonuses_ability
            )}
          >
            +
            <div className={styles.icon_wrapper}>
              <HelperIcon className={styles.text_before_bonuses_ability_icon} />
            </div>
            Поддержка экспертов
          </p>
        </div> */}

      <div
        className={clsx(
          styles.bonuses_heading,
          order === 0 && styles.bonuses_heading_first
        )}
      >
        <div className={styles.bonuses_icon}>
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
        <span
          className={clsx(
            styles.bonuses_heading_text,
            order === 1 && styles.bonuses_heading_1,
            order === 2 && styles.bonuses_heading_2,
            order === 3 && styles.bonuses_heading_3
          )}
        >
          ЭКСТРА БОНУС
        </span>
      </div>

      <ul
        className={clsx(
          styles.bonuses,
          order === 0 && styles.bonuses_first,
          (order === 1 || order === 2 || order === 3) && styles.bonuses__small
        )}
      >
        {resolution === "sm" ? (
          <Popover.Root open={popoverOpened} onOpenChange={setPopoverOpened}>
            <Popover.Trigger
              className={clsx(
                styles.PopoverTrigger,
                order === 0 && styles.PopoverTrigger_hidden
              )}
              onClick={() => setPopoverOpened((prev) => !prev)}
            >
              <li className={styles.bonus}>
                <p className={styles.bonus_text}>
                  {/* {benefit.translations.ru.name} */}
                  {order === 1 && <>Proxyline</>}
                  {order === 2 && <>Dolphin</>}
                  {order === 3 && <>Safepal</>}
                  <NavArrowIcon />
                </p>
              </li>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className={styles.PopoverContent} sideOffset={5}>
                <img
                  className={styles.PopoverImage}
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
                <div>
                  <h1 className={styles.HoverCardContent_header}>
                    {order === 3
                      ? benefits?.[1]?.translations.ru.name
                      : benefits?.[0]?.translations.ru.name}
                  </h1>
                  <p className={styles.HoverCardContent_text}>
                    {order === 3
                      ? benefits?.[1]?.translations.ru.description
                      : benefits?.[0]?.translations.ru.description}
                  </p>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ) : (
          <Popover.Root
            // openDelay={150}
            open={hoverCardOpened}
            onOpenChange={setHoverCardOpened}
          >
            <Popover.Trigger
              className={clsx(
                styles.HoverCardTrigger,
                order === 0 && styles.HoverCardTrigger_hidden
              )}
              onClick={() => setHoverCardOpened((prev) => !prev)}
            >
              <li className={styles.bonus}>
                <p className={styles.bonus_text}>
                  {/* {benefit.translations.ru.name} */}
                  {order === 1 && <>Proxyline</>}
                  {order === 2 && <>Dolphin</>}
                  {order === 3 && <>Safepal</>}
                  <NavArrowIcon />
                </p>
              </li>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={styles.HoverCardContent}
                sideOffset={5}
              >
                <img
                  className={styles.HoverCardImage}
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
                <div>
                  <h1 className={styles.HoverCardContent_header}>
                    {order === 3
                      ? benefits?.[1]?.translations.ru.name
                      : benefits?.[0]?.translations.ru.name}
                  </h1>
                  <p className={styles.HoverCardContent_text}>
                    {order === 3
                      ? benefits?.[1]?.translations.ru.description
                      : benefits?.[0]?.translations.ru.name}
                  </p>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </ul>

      {/* <ul
        className={clsx(
          styles.bonuses,
          (order === 1 || order === 2 || order === 3) && styles.bonuses__small
        )}
      >
        {order !== 0 &&
          benefits.map((benefit) =>
            benefit.file ? (
              resolution === "sm" ? (
                <Popover.Root key={benefit.id}>
                  <Popover.Trigger className={styles.PopoverTrigger}>
                    <li className={styles.bonus}>
                      <p className={styles.bonus_text}>
                        {benefit.translations.ru.name}
                        <NavArrowIcon />
                      </p>
                    </li>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className={styles.PopoverContent}
                      sideOffset={5}
                    >
                      <img
                        className={styles.PopoverImage}
                        src={benefit.file}
                        alt={benefit.translations.ru.name}
                      />
                      {benefit.translations.ru.description}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <HoverCard.Root key={benefit.id} openDelay={150}>
                  <HoverCard.Trigger className={styles.HoverCardTrigger}>
                    <li className={styles.bonus}>
                      <p className={styles.bonus_text}>
                        {benefit.translations.ru.name}
                        <NavArrowIcon />
                      </p>
                    </li>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content
                      className={styles.HoverCardContent}
                      sideOffset={5}
                    >
                      <img
                        className={styles.HoverCardImage}
                        src={benefit.file}
                        alt={benefit.translations.ru.name}
                      />
                      {benefit.translations.ru.description}
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              )
            ) : benefit.translations.ru.description !== null ? (
              resolution === "sm" ? (
                <Popover.Root key={benefit.id}>
                  <Popover.Trigger className={styles.PopoverTriggerDescription}>
                    <li className={styles.bonus}>
                      <p className={styles.bonus_text}>
                        {benefit.translations.ru.name}
                        <NavArrowIcon />
                      </p>
                    </li>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className={styles.PopoverContentDescription}
                      sideOffset={5}
                      side="bottom"
                    >
                      <img
                        className={styles.PopoverImage}
                        src={benefit.file}
                        alt={benefit.translations.ru.name}
                      />
                      {/* {benefit.file && (
                        <Image
                          src={benefit.file}
                          alt={benefit.translations.ru.name}
                        />
                      )} 
                      {benefit.translations.ru.description}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <HoverCard.Root key={benefit.id} openDelay={150}>
                  <HoverCard.Trigger className={styles.HoverCardTrigger}>
                    <li className={styles.bonus}>
                      <p className={styles.bonus_text}>
                        {benefit.translations.ru.name}
                        <NavArrowIcon />
                      </p>
                    </li>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content
                      className={styles.HoverCardContent}
                      sideOffset={5}
                    >
                      {benefit.translations.ru.description}
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
      </ul> */}

      {/* {order === 0 && (
        <img
          src="/images/png/buy-subscription/subscription_1.png"
          className={clsx(styles.subscription_img)}
        />
      )} */}
      {/* {order === 1 && (
        <img
          src="/images/png/buy-subscription/subscription_2.png"
          className={clsx(styles.subscription_img)}
        />
      )}
      {order === 2 && (
        <img
          src="/images/png/buy-subscription/subscription_3.png"
          className={clsx(styles.subscription_img)}
        />
      )}
      {order === 3 && (
        <img
          src="/images/png/buy-subscription/subscription_4.png"
          className={clsx(styles.subscription_img, styles.subscription_img_4)}
        />
      )} */}

      {/* <div className={styles.subscription_remains}>
        {benefits.map(
          (benefit) =>
            benefit.remainingCount !== null && (
              <span key={benefit.id}>
                ОСТАЛОСЬ: {benefit.remainingCount}{" "}
                {benefit.translations.ru.name}
              </span>
            )
        )}
      </div> */}

      <BuySubscriptionDialog
        key={discountAmount}
        selectedSubscription={subscription}
        order={order}
        resolution={resolution}
        promoForSubmit={isValidForPromo ? promoForSubmit : ""}
        setPromoForSubmit={setPromoForSubmit}
        discountAmount={discountAmount}
        discountKind={discountKind}
        referralDiscountAmount={referralDiscountAmount}
        referralDiscountKind={referralDiscountKind}
        baseDiscountAmount={baseDiscountAmount}
        discounts={discounts}
        isPromoReferral={isPromoReferral}
        setIsPromoReferral={setIsPromoReferral}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <button className={styles.button}>Купить подписку</button>
      </BuySubscriptionDialog>
    </div>
  )
}

const OldBuySubscription = ({
  tariffs,
  resolution,
}: {
  tariffs: {
    lgg: React.JSX.Element
    lg: React.JSX.Element
    md: React.JSX.Element
    sm: React.JSX.Element
  }
  resolution: Resolution
}) => {
  const router = useRouter()
  const referral = router.query.ref || "agent"

  return (
    <div className="app__container__subscribe" id="subscribe">
      <div className="app__container__subscribe__noise" />
      <div className="app__container__subscribe__back">
        <div className="app__container__subscribe__back__left-gradient" />
        <div className="app__container__subscribe__back__right-gradient" />
      </div>
      <div className="app__container__subscribe__content">
        <div className="app__container__subscribe__content__header">
          <div className="app__container__subscribe__content__title" />
        </div>
        <div className="app__container__subscribe__content__cost bottom">
          <div className="app__container__subscribe__content__cost__block">
            <div className="app__container__subscribe__content__cost__block__header">
              <div className="app__container__subscribe__content__cost__block__header__gradient _5" />
              <div className="app__container__subscribe__content__cost__block__header__title">
                1 месяц
              </div>
            </div>
            <div className="app__container__subscribe__content__cost__block__body">
              <div className="app__container__subscribe__content__cost__block__body__price _74" />
              <div className="app__container__subscribe__content__cost__block__body__discount _45" />
            </div>
          </div>
          <div className="app__container__subscribe__content__cost__block">
            <div className="app__container__subscribe__content__cost__block__header">
              <div className="app__container__subscribe__content__cost__block__header__gradient _6" />
              <div className="app__container__subscribe__content__cost__block__header__title">
                3 месяца
              </div>
            </div>
            <div className="app__container__subscribe__content__cost__block__body">
              <div className="app__container__subscribe__content__cost__block__body__price _214" />
              <div className="app__container__subscribe__content__cost__block__body__discount _225" />
            </div>
          </div>
          <div className="app__container__subscribe__content__cost__block">
            <div className="app__container__subscribe__content__cost__block__header">
              <div className="app__container__subscribe__content__cost__block__header__gradient _7" />
              <div className="app__container__subscribe__content__cost__block__header__title">
                6 месяцев
              </div>
            </div>
            <div className="app__container__subscribe__content__cost__block__body">
              <div className="app__container__subscribe__content__cost__block__body__price _405" />
              <div className="app__container__subscribe__content__cost__block__body__discount _446" />
            </div>
          </div>
          <div className="app__container__subscribe__content__cost__block">
            <div className="app__container__subscribe__content__cost__block__header">
              <div className="app__container__subscribe__content__cost__block__header__gradient _8" />
              <div className="app__container__subscribe__content__cost__block__header__title">
                12 месяцев
              </div>
            </div>
            <div className="app__container__subscribe__content__cost__block__body">
              <div className="app__container__subscribe__content__cost__block__body__price _765" />
              <div className="app__container__subscribe__content__cost__block__body__discount _880" />
            </div>
          </div>
        </div>
        <div className="app__container__subscribe__content__link__mark">
          При оплате картой конвертация в рубли осуществляется по курсу ЦБ РФ
        </div>
        <div className="app__container__subscribe__content__link">
          <a
            href={`https://t.me/CryptonLobbyBot?start=${referral}`}
            target={"_blank"}
          >
            <div className="app__container__subscribe__content__link__button">
              {tariffs[resolution]}
              <SubscribeArrow />
            </div>
          </a>

          {/* <div className="app__container__subscribe__content__link__description">
           С оформлением тарифа вам поможет наш бот в Telegram
          </div> */}
        </div>
      </div>
    </div>
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
