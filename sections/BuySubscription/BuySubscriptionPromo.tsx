import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"
import * as Switch from "@radix-ui/react-switch"
import clsx from "clsx"

import Countdown from "@/components/countdown"

import SubscriptionImage1 from "@/public/images/png/buy-subscription/subscription1.png"
import SubscriptionImage2 from "@/public/images/png/buy-subscription/subscription2.png"
import SubscriptionImage3 from "@/public/images/png/buy-subscription/subscription3.png"
import SubscriptionImage4 from "@/public/images/png/buy-subscription/subscription4.png"

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"

import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { Resolution } from "@/types/resolution"
import { Promocode, Subscription } from "@/types/api-types"

import styles from "./BuySubscriptionPromo.module.scss"

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"
const SPECIAL_PROMO = process.env.NEXT_PUBLIC_PROMO

const BuySubscriptionPromo = ({
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
  const [showMonthlyPrice, setShowMonthlyPrice] = useState(false)
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

  const [timerProgress, setTimerProgress] = useState(0)

  const {
    data: subscriptions,
    isError: isSubscriptionsError,
    isLoading,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await axios.get<Subscription[]>(
        ID_URL + "subscriptions/get-active/",
        { withCredentials: true }
      )

      return response.data
        .filter((el) => el.isActive && el.kind === PRIME_SUBSCRIPTION_KIND_ID)
        .sort((a, b) => a.duration.id - b.duration.id)
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
      axios.post<Promocode>(ID_URL + "promo-codes/validate/", {
        promocode,
        subscription: subscriptionId,
      }),
  })

  useEffect(() => {
    setTimerProgress(
      Math.round(
        Date.now() >= 1713733200000
          ? ((Date.now() - 1713733200000) / (1714338000000 - 1713733200000)) *
              100
          : 0
      )
    )
  }, [])

  useEffect(() => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref")

    if (refCode) {
      localStorage.setItem("referral", refCode)
    }

    if (SPECIAL_PROMO) {
      setPromoForSubmit(SPECIAL_PROMO)
      return
    }
    if (refCode) {
      setPromoForSubmit(refCode)
    }
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

  if (isSubscriptionsError || isLoading) {
    return <OldBuySubscription tariffs={tariffs} resolution={resolution} />
  }

  return (
    <div className="app__container__subscribe" id="subscribe">
      <div className="app__container__subscribe__noise" />
      <div className="app__container__subscribe__back">
        <div className="app__container__subscribe__back__left-gradient" />
        <div className="app__container__subscribe__back__right-gradient" />
      </div>
      <div className="app__container__subscribe__content">
        <h1 className={styles.heading}>Ограниченное предложение</h1>

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

        <div className="app__container__subscribe__content___timer__header">
          <div className="app__container__subscribe__content__link__mark">
            До конца акции осталось:
          </div>
          <div className="app__container__subscribe__content__timer__progress">
            <div
              className="app__container__subscribe__content__timer__progress__bar"
              style={{ width: `${timerProgress + "%"}` }}
            >
              <div className="app__container__subscribe__content__timer__progress__bar__circle">
                {" "}
              </div>
            </div>
          </div>
          <div className="app__container__subscribe__content__timer__countdown">
            <Countdown
              className="app__container__subscribe__content__timer__countdown__counter"
              date={1714338000000}
            />
          </div>
          <div className="app__container__subscribe__content__timer__countdown__names">
            <div className="app__container__subscribe__content__timer__countdown__names__block">
              <div className="app__container__subscribe__content__timer__countdown__names__block__text">
                дней
              </div>
              <div className="app__container__subscribe__content__timer__countdown__names__block__text">
                часов
              </div>
              <div className="app__container__subscribe__content__timer__countdown__names__block__text">
                минут
              </div>
              <div className="app__container__subscribe__content__timer__countdown__names__block__text">
                секунд
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuySubscriptionPromo

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
  } = subscription

  const [cardPrice, setCardPrice] = useState(0)

  const getSubscriptionPrice = () => {
    return individualPrice === undefined ? price : individualPrice
  }

  useEffect(() => {
    const subscriptionPrice = baseDiscountAmount
      ? getSubscriptionPrice() - baseDiscountAmount
      : getSubscriptionPrice()
    let fullPrice

    if (isValidForPromo && discountKind && discountAmount && discounts) {
      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      if (discountKind.id === "MONEY") {
        if (baseDiscountAmount && baseDiscountAmount > preferedDiscount) {
          fullPrice = getSubscriptionPrice() - baseDiscountAmount
        } else {
          fullPrice = getSubscriptionPrice() - preferedDiscount
        }
      } else {
        if (
          baseDiscountAmount &&
          baseDiscountAmount > getSubscriptionPrice() * preferedDiscount
        ) {
          fullPrice = getSubscriptionPrice() - baseDiscountAmount
        } else {
          fullPrice =
            getSubscriptionPrice() - getSubscriptionPrice() * preferedDiscount
        }
      }

      setCardPrice(showMonthlyPrice ? fullPrice / duration.id : fullPrice)
    } else {
      setCardPrice(
        showMonthlyPrice ? subscriptionPrice / duration.id : subscriptionPrice
      )
    }
  }, [discountKind, discountAmount, discounts])

  useEffect(() => {
    const subscriptionPrice = baseDiscountAmount
      ? getSubscriptionPrice() - baseDiscountAmount
      : getSubscriptionPrice()
    let fullPrice

    if (isValidForPromo && discountKind && discountAmount && discounts) {
      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      if (discountKind.id === "MONEY") {
        if (baseDiscountAmount && baseDiscountAmount > preferedDiscount) {
          fullPrice = getSubscriptionPrice() - baseDiscountAmount
        } else {
          fullPrice = getSubscriptionPrice() - preferedDiscount
        }
      } else {
        if (
          baseDiscountAmount &&
          baseDiscountAmount > getSubscriptionPrice() * preferedDiscount
        ) {
          fullPrice = getSubscriptionPrice() - baseDiscountAmount
        } else {
          fullPrice =
            getSubscriptionPrice() - getSubscriptionPrice() * preferedDiscount
        }
      }

      setCardPrice(showMonthlyPrice ? fullPrice / duration.id : fullPrice)
    } else {
      setCardPrice(
        showMonthlyPrice ? subscriptionPrice / duration.id : subscriptionPrice
      )
    }
  }, [showMonthlyPrice])

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
    <div
      className={clsx(
        styles.subscription,
        order === 2 && styles.subscription_3
      )}
    >
      {order === 2 && (
        <>
          <p className={styles.most_popular}>
            Самый популярный тариф <sup>*</sup>
          </p>
          <p className={styles.most_popular_description}>
            <sup>*</sup>
            во время прошлой акции подарки из этого тарифа закончились в первые
            несколько дней
          </p>
        </>
      )}
      <div className={styles.subscription_header}>
        <span className={styles.duration}>{duration.id} МЕС</span>
        <div className={styles.remains}>
          <span>ОСТАЛОСЬ:</span>
          <div>
            {order === 0 && Math.round(224 - 224 * 0.2)}
            {order === 1 && Math.round(172 - 172 * 0.25)}
            {order === 2 && Math.round(115 - 115 * 0.3)}
            {order === 3 && Math.round(50 - 50 * 0.35)}
            <BonusesIcon />
          </div>
        </div>
      </div>
      {isPromoPending ? (
        <div className={styles.loading} />
      ) : (
        <div className={styles.price}>
          <span className={styles.price_left}>
            $
            {Number.isInteger(cardPrice) ? (
              cardPrice
            ) : (
              <>
                {cardPrice.toFixed(2).split(".")[0]}
                <span className={styles.price_fractional}>
                  .{cardPrice.toFixed(2).split(".")[1]}
                </span>
              </>
            )}
          </span>
          {duration.id === 1 &&
            discountKind &&
            discountAmount !== 0 &&
            discounts && (
              <div className={styles.price_discount}>
                <span className={styles.price_discount_percent}>
                  -
                  {showMonthlyPrice
                    ? Math.round(
                        100 -
                          (cardPrice * 100) /
                            (getSubscriptionPrice() / duration.id)
                      )
                    : Math.round(
                        100 - (cardPrice * 100) / getSubscriptionPrice()
                      )}
                  %
                </span>
                <span className={styles.price_discount_amount}>
                  ${getSubscriptionPrice()}
                </span>
              </div>
            )}
          {baseDiscountAmount && (
            <div className={styles.price_discount}>
              <span className={styles.price_discount_percent}>
                -
                {discountKind && discountAmount && discounts
                  ? showMonthlyPrice
                    ? Math.round(
                        100 -
                          (cardPrice * 100) /
                            (getSubscriptionPrice() / duration.id)
                      )
                    : Math.round(
                        100 - (cardPrice * 100) / getSubscriptionPrice()
                      )
                  : baseDiscount}
                %
              </span>
              <span className={styles.price_discount_amount}>
                $
                {showMonthlyPrice
                  ? getSubscriptionPrice() / duration.id
                  : getSubscriptionPrice()}
              </span>
            </div>
          )}
        </div>
      )}
      <ul className={clsx(styles.bonuses, styles.bonuses_extra)}>
        {order === 0 && (
          <li className={styles.bonus}>
            <p className={styles.bonus_text1}>
              Все{" "}
              <button onClick={scrollToOpportunities}>возможности Prime</button>
            </p>
          </li>
        )}
        {order === 1 && (
          <li className={styles.bonus}>
            <p className={styles.bonus_text}>Все, что входит в 1 месяц</p>
          </li>
        )}
        {order === 2 && (
          <li className={styles.bonus}>
            <p className={styles.bonus_text}>Все, что входит в 3 месяца</p>
          </li>
        )}
        {order === 3 && (
          <li className={styles.bonus}>
            <p className={styles.bonus_text}>Все, что входит в 6 месяцев</p>
          </li>
        )}
        {order === 0 && resolution === "sm"
          ? null
          : benefits.map((benefit) =>
              benefit.file ? (
                resolution === "sm" ? (
                  <Popover.Root key={benefit.id}>
                    <Popover.Trigger className={styles.PopoverTrigger}>
                      <li className={styles.bonus}>
                        <p className={styles.bonus_text}>
                          {benefit.translations.ru.name}
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
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                ) : (
                  <HoverCard.Root key={benefit.id} openDelay={150}>
                    <HoverCard.Trigger className={styles.HoverCardTrigger}>
                      <li className={styles.bonus}>
                        <p className={styles.bonus_text}>
                          {benefit.translations.ru.name}
                        </p>
                      </li>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                      <HoverCard.Content
                        className={styles.HoverCardContent}
                        sideOffset={5}
                        side="right"
                      >
                        <img
                          className={styles.HoverCardImage}
                          src={benefit.file}
                          alt={benefit.translations.ru.name}
                        />
                      </HoverCard.Content>
                    </HoverCard.Portal>
                  </HoverCard.Root>
                )
              ) : benefit.translations.ru.description !== null ? (
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
                      {benefit.translations.ru.description}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <li key={benefit.id} className={styles.bonus}>
                  <p className={styles.bonus_text}>
                    {benefit.translations.ru.name}
                  </p>
                </li>
              )
            )}
        {order === 1 && (
          <>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>10 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Кружка и носки Crypton 2024</p>
            </li>
          </>
        )}
        {order === 2 && (
          <>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>14 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Футболка Crypton 2024</p>
            </li>
          </>
        )}
        {order === 3 && (
          <>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>28 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Худи Crypton 2024</p>
            </li>
          </>
        )}
      </ul>
      <div className={styles.bonuses_heading}>
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
        <span className={styles.bonuses_heading_text}>Только до 28 апреля</span>
      </div>
      <ul className={styles.bonuses}>
        {order === 0 && (
          <>
            <li className={styles.bonus} style={{ color: "#4ddfd0" }}>
              <p className={styles.bonus_text}>10 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Носки Crypton 2024</p>
            </li>
          </>
        )}
        {order === 1 && (
          <>
            <Popover.Root>
              <Popover.Trigger className={styles.PopoverTriggerDescription}>
                <li className={styles.bonus}>
                  <p className={styles.bonus_text}>
                    <span>
                      <span className={styles.beige}>Steam-баланс 33$</span> или{" "}
                      <span className={styles.beige}>
                        Telegram Premium 12 мес
                      </span>
                    </span>
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
                  После получения подписки на 3 месяца вы сможете выбрать один
                  из подарков: пополнения вашего Steam баланса на $33 или
                  подписку на Telegram Premium длительностью в 12 месяцев
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.plus_icon}
            >
              <circle cx="12" cy="12" r="11.5" stroke="#FFCD9F" />
              <path
                d="M11.3933 18V12.6188H6V11.3812H11.3663V6H12.6067V11.3812H18V12.6188H12.6337V18H11.3933Z"
                fill="#FFCD9F"
              />
            </svg> */}

            {/* <li className={styles.bonus}>
              <p className={styles.bonus_text}>10 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Кружка и носки Crypton 2024</p>
            </li> */}
          </>
        )}
        {order === 2 && (
          <>
            <Popover.Root>
              <Popover.Trigger className={styles.PopoverTriggerDescription}>
                <li className={styles.bonus}>
                  <p className={styles.bonus_text}>
                    <span>
                      <span className={styles.purple}>Safepal X1</span> или{" "}
                      <span className={styles.purple}>OneKey Mini</span>
                    </span>
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
                  После получения подписки на 6 месяцев вам нужно будет выбрать
                  один из холодных кошельков для безопасного хранения вашей
                  криптовалюты:{" "}
                  <a
                    href="https://bip39.ru/tproduct/645763038-446759349861-safepal-x1"
                    target="_blank"
                  >
                    Safepal X1
                  </a>{" "}
                  или{" "}
                  <a
                    href="https://bip39.ru/tproduct/508877051-674104332851-onekey-mini"
                    target="_blank"
                  >
                    OneKey Mini
                  </a>{" "}
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.plus_icon}
            >
              <circle cx="12" cy="12" r="11.5" stroke="#BB44CC" />
              <path
                d="M11.3933 18V12.6188H6V11.3812H11.3663V6H12.6067V11.3812H18V12.6188H12.6337V18H11.3933Z"
                fill="#BB44CC"
              />
            </svg> */}

            {/* <li className={styles.bonus}>
              <p className={styles.bonus_text}>14 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Футболка Crypton 2024</p>
            </li> */}
          </>
        )}
        {order === 3 && (
          <>
            <Popover.Root>
              <Popover.Trigger className={styles.PopoverTriggerDescription}>
                <li className={styles.bonus}>
                  <p className={styles.bonus_text}>
                    <span>
                      <span className={styles.red}>Ledger Nano S</span> или{" "}
                      <span className={styles.red}>
                        Tangem Wallet Shiba Edition
                      </span>
                    </span>
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
                  После того, как вы станете обладателем подписки на 12 месяцев,
                  вы сможете выбрать 1 из двух холодных кошельков для
                  безопасного хранения вашей криптовалюты:{" "}
                  <a
                    href="https://bip39.ru/tproduct/508877051-826889378251-ledger-nano-s-transparent"
                    target="_blank"
                  >
                    Ledger Nano S
                  </a>{" "}
                  или{" "}
                  <a
                    href="https://bip39.ru/tproduct/645763038-910709986411-tangem-wallet-x-shiba-3-karti"
                    target="_blank"
                  >
                    Tangem Wallet
                  </a>{" "}
                  на 3 карты
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.plus_icon}
            >
              <circle cx="12" cy="12" r="11.5" stroke="#FF4A7A" />
              <path
                d="M11.3933 18V12.6188H6V11.3812H11.3663V6H12.6067V11.3812H18V12.6188H12.6337V18H11.3933Z"
                fill="#FF4A7A"
              />
            </svg> */}

            {/* <li className={styles.bonus}>
              <p className={styles.bonus_text}>28 бонусных дней подписки</p>
            </li>
            <li className={styles.bonus}>
              <p className={styles.bonus_text}>Худи Crypton 2024</p>
            </li> */}
          </>
        )}
      </ul>
      {order === 0 && (
        <Image
          src={SubscriptionImage1}
          alt="Носки Crypton 2024"
          className={styles.subscription_1_image}
        />
      )}
      {order === 1 && (
        <Image
          src={SubscriptionImage2}
          alt="Кружка и носки Crypton 2024"
          className={styles.subscription_2_image}
        />
      )}
      {order === 2 && (
        <Image
          src={SubscriptionImage3}
          alt="Футболка Crypton 2024"
          className={styles.subscription_3_image}
        />
      )}
      {order === 3 && (
        <Image
          src={SubscriptionImage4}
          alt="Худи Crypton 2024"
          className={styles.subscription_4_image}
        />
      )}
      <BuySubscriptionDialog
        key={discountAmount}
        selectedSubscription={subscription}
        order={order}
        resolution={resolution}
        promoForSubmit={isValidForPromo ? promoForSubmit : ""}
        setPromoForSubmit={setPromoForSubmit}
        discountAmount={discountAmount}
        discountKind={discountKind}
        discounts={discounts}
        isPromoReferral={isPromoReferral}
        setIsPromoReferral={setIsPromoReferral}
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

const BonusesIcon = () => (
  <div className={styles.bonuses_icon__inverted}>
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6834 6.57031H6.3916V11.9998H10.6834V6.57031Z"
        fill="currentColor"
      />
      <path
        d="M5.60823 6.57031H1.31641V11.9998H5.60823V6.57031Z"
        fill="currentColor"
      />
      <path
        d="M9.34618 2.21325C9.46227 2.00055 9.52834 1.75683 9.52834 1.49791C9.52836 0.671953 8.85638 0 8.03045 0C7.41955 0 6.79447 0.315656 6.31557 0.866039C6.19705 1.00223 6.09149 1.1486 6.0002 1.30104C5.90891 1.1486 5.80334 1.00223 5.68482 0.866039C5.20592 0.315656 4.58087 0 3.96995 0C3.14401 0 2.47203 0.671977 2.47203 1.49791C2.47203 1.7568 2.53808 2.00055 2.65419 2.21325H0.614258V5.78791H5.60888V2.21325H6.39149V5.78791H11.3861V2.21325H9.34618ZM3.96995 2.21325C3.57554 2.21325 3.25463 1.89234 3.25463 1.49791C3.25463 1.10348 3.57554 0.782602 3.96995 0.782602C4.68008 0.782602 5.35524 1.509 5.55172 2.21323L3.96995 2.21325ZM8.03045 2.21325H6.44867C6.64515 1.509 7.32031 0.782625 8.03045 0.782625C8.42485 0.782625 8.74576 1.10353 8.74576 1.49794C8.74574 1.89237 8.42485 2.21325 8.03045 2.21325Z"
        fill="currentColor"
      />
    </svg>
  </div>
)

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
