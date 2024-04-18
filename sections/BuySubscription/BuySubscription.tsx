import React, { useEffect, useReducer, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Popover from "@radix-ui/react-popover"
import * as Switch from "@radix-ui/react-switch"
import clsx from "clsx"

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"

import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { Resolution } from "@/types/resolution"
import { Promocode, Subscription } from "@/types/api-types"

import styles from "./BuySubscription.module.scss"

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"
const SPECIAL_PROMO = process.env.NEXT_PUBLIC_PROMO

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
  const [showMonthlyPrice, setShowMonthlyPrice] = useState(false)
  const [promoForSubmit, setPromoForSubmit] = useState("")
  const [x, forceUpdate] = useReducer((v) => v + 1, 0)
  const [isPromoReferral, setIsPromoReferral] = useState(false)

  const {
    data: subscriptions,
    isError: isSubscriptionsError,
    isLoading,
  } = useQuery({
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

  useEffect(() => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref")
    if (SPECIAL_PROMO) {
      setPromoForSubmit(SPECIAL_PROMO)
      return
    }
    if (refCode) {
      setPromoForSubmit(refCode as string)
    }
  }, [])

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
        <div className="app__container__subscribe__content__header">
          <div className="app__container__subscribe__content__title" />
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
                x={x}
                forceUpdate={forceUpdate}
                isPromoReferral={isPromoReferral}
                setIsPromoReferral={setIsPromoReferral}
              />
            ))}
          </div>
        )}

        <p className={styles.support}>
          Остались вопросы? Задай их нашему специалисту в Телеграм:{" "}
          <a
            href="https://t.me/crypton_support"
            target="_blank"
            className={styles.support_link}
          >
            Задать вопрос{" "}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9L9 1M2 1H10M9 7.5V0"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </a>
        </p>
      </div>
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
  x,
  forceUpdate,
  isPromoReferral,
  setIsPromoReferral,
}: {
  subscription: Subscription
  order: number
  resolution: Resolution
  showMonthlyPrice: boolean
  promoForSubmit: string
  setPromoForSubmit: React.Dispatch<React.SetStateAction<string>>
  x: any
  forceUpdate: React.DispatchWithoutAction
  isPromoReferral: boolean
  setIsPromoReferral: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { baseDiscountAmount, baseDiscount, price, id, duration, benefits } =
    subscription

  const [cardPrice, setCardPrice] = useState(0)
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
    const subscriptionPrice = baseDiscountAmount
      ? price - baseDiscountAmount
      : price

    const fullPrice = showMonthlyPrice
      ? subscriptionPrice / duration.id
      : subscriptionPrice

    setCardPrice(fullPrice)
    reset()
    setDiscountAmount(0)
    setDiscountKind(undefined)
    setDiscounts([])

    const validate = async () => {
      if (promoForSubmit) {
        try {
          const {
            data: { discountAmount, discountKind, discounts, isReferralCode },
          } = await mutatePromoValidation({
            promocode: promoForSubmit,
            subscriptionId: id,
          })

          setIsPromoReferral(isReferralCode)
          let priceWithPromoApplied

          setDiscountAmount(discountAmount)
          setDiscountKind(discountKind)
          setDiscounts(discounts)

          const matchedDiscount = discounts.find(
            (el) => el.subscriptionId === id
          )

          const preferedDiscount = matchedDiscount
            ? matchedDiscount.discountAmount
            : discountAmount

          if (discountKind.id === "MONEY") {
            if (baseDiscountAmount && baseDiscountAmount > preferedDiscount) {
              priceWithPromoApplied = price - baseDiscountAmount
            } else {
              priceWithPromoApplied = price - preferedDiscount
            }
          } else {
            if (
              baseDiscountAmount &&
              baseDiscountAmount > price * preferedDiscount
            ) {
              priceWithPromoApplied = price - baseDiscountAmount
            } else {
              priceWithPromoApplied = price - price * preferedDiscount
            }
          }
          setCardPrice(
            showMonthlyPrice
              ? priceWithPromoApplied / duration.id
              : priceWithPromoApplied
          )
        } catch {
          console.log("Error while validating promocode: ", promoForSubmit)
        }
      }
    }
    validate()
  }, [x])

  useEffect(() => {
    const subscriptionPrice = baseDiscountAmount
      ? price - baseDiscountAmount
      : price
    let fullPrice

    if (discountKind && discountAmount && discounts) {
      const matchedDiscount = discounts.find((el) => el.subscriptionId === id)

      const preferedDiscount = matchedDiscount
        ? matchedDiscount.discountAmount
        : discountAmount

      if (discountKind.id === "MONEY") {
        if (baseDiscountAmount && baseDiscountAmount > preferedDiscount) {
          fullPrice = price - baseDiscountAmount
        } else {
          fullPrice = price - preferedDiscount
        }
      } else {
        if (
          baseDiscountAmount &&
          baseDiscountAmount > price * preferedDiscount
        ) {
          fullPrice = price - baseDiscountAmount
        } else {
          fullPrice = price - price * preferedDiscount
        }
      }

      setCardPrice(showMonthlyPrice ? fullPrice / duration.id : fullPrice)
    } else {
      setCardPrice(
        showMonthlyPrice ? subscriptionPrice / duration.id : subscriptionPrice
      )
    }
  }, [showMonthlyPrice])

  return (
    <div className={styles.subscription}>
      {SPECIAL_PROMO && duration.id === 1 && (
        <div className={styles.last_chance}>LAST CHANCE!</div>
      )}
      <span className={styles.duration}>{duration.id} МЕС</span>
      {isPending ? (
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
                        100 - (cardPrice * 100) / (price / duration.id)
                      )
                    : Math.round(100 - (cardPrice * 100) / price)}
                  %
                </span>
                <span className={styles.price_discount_amount}>${price}</span>
              </div>
            )}
          {baseDiscountAmount && (
            <div className={styles.price_discount}>
              <span className={styles.price_discount_percent}>
                -
                {discountKind && discountAmount && discounts
                  ? showMonthlyPrice
                    ? Math.round(
                        100 - (cardPrice * 100) / (price / duration.id)
                      )
                    : Math.round(100 - (cardPrice * 100) / price)
                  : baseDiscount}
                %
              </span>
              <span className={styles.price_discount_amount}>
                ${showMonthlyPrice ? price / duration.id : price}
              </span>
            </div>
          )}
        </div>
      )}
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
        <span className={styles.bonuses_heading_text}>БОНУСЫ</span>
      </div>
      <ul className={styles.bonuses}>
        {benefits.map((benefit) =>
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
          ) : (
            <li key={benefit.id} className={styles.bonus}>
              <p className={styles.bonus_text}>
                {benefit.translations.ru.name}
              </p>
            </li>
          )
        )}
      </ul>
      <BuySubscriptionDialog
        key={discountAmount}
        selectedSubscription={subscription}
        order={order}
        resolution={resolution}
        promoForSubmit={promoForSubmit}
        setPromoForSubmit={setPromoForSubmit}
        discountAmount={discountAmount}
        discountKind={discountKind}
        discounts={discounts}
        forceUpdate={forceUpdate}
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
