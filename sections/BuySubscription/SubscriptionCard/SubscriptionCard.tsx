import React, { useMemo, useState } from "react"
import clsx from "clsx"

import Advantages from "../Advantages/Advantages"
import ExtraBonuses from "../ExtraBonuses/ExtraBonuses"

import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { calculateSubscriptionDetails } from "@/shared/subsciption"

import { scrollToSection } from "@/redux/reducers/scrollReducer"

import { Resolution } from "@/types/resolution"
import { Promocode, Subscription } from "@/types/api-types"

import styles from "../BuySubscription.module.scss"

const SubscriptionCard = ({
  subscription,
  subscriptions,
  order,
  resolution,
  showMonthlyPrice,
  setPromoForSubmit,
  isPromoPending,
  activePromocode,
  fallbackPromocode,
}: {
  subscription: Subscription
  subscriptions: Subscription[]
  order: number
  resolution: Resolution
  showMonthlyPrice: boolean
  setPromoForSubmit: React.Dispatch<React.SetStateAction<string>>
  activePromocode: Promocode | null
  isPromoPending: boolean
  fallbackPromocode: Promocode | null
}) => {
  const { duration, benefits } = subscription

  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    finalPrice,
    finalMonthlyPrice,
    originalMonthlyPrice,
    originalPrice,
    totalDiscount,
  } = useMemo(
    () =>
      calculateSubscriptionDetails({
        subscription,
        promocode: activePromocode,
      }),
    [subscription, activePromocode]
  )

  const scrollToGuarantee = () => scrollToSection("Окупаемость")

  return (
    <div className={styles.subscription}>
      <div className={styles.subscription_header}>
        <div className={styles.subscription_name_wrapper}>
          <h3 className={styles.subscription_name}>{subscription.kind.name}</h3>
          {order === 2 && (
            <div className={styles.profitable}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 20, height: 20 }}
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Лучший выбор
            </div>
          )}
        </div>
        <span className={styles.subscription_duration}>
          - {duration.id} МЕС -
        </span>
      </div>

      {isPromoPending ? (
        <div className={styles.loading} />
      ) : (
        <div className={clsx(styles.price, order === 0 && styles.price_0)}>
          <div className={styles.price_wrapper}>
            <span className={styles.price_left}>
              $
              {
                (showMonthlyPrice ? finalMonthlyPrice : finalPrice / 12)
                  .toFixed(2)
                  .split(".")[0]
              }
            </span>
            {!showMonthlyPrice && (
              <span className={styles.price_month}>/мес</span>
            )}

            <span className={clsx(styles.price_discount_through)}>
              {totalDiscount && (
                <span className={styles.price_line_through}>
                  $
                  {showMonthlyPrice ? originalMonthlyPrice : originalPrice / 12}
                </span>
              )}
            </span>
          </div>
          {/* {totalDiscount && (
            <div className={styles.price_newDiscount}>
              Выгода $
              {showMonthlyPrice
                ? Math.floor(originalMonthlyPrice - finalMonthlyPrice)
                : Math.floor(originalPrice - finalPrice)}
            </div>
          )} */}
        </div>
      )}

      <button
        className={clsx(
          styles.guarantee,
          order === 0 && styles.guarantee__hidden,
          !showMonthlyPrice && styles.guarantee__highlighted
        )}
        onClick={scrollToGuarantee}
      >
        <p className={styles.guarantee_heading}>
          {showMonthlyPrice
            ? "Гарантия первой прибыли"
            : "Гарантия окупаемости"}
        </p>
      </button>

      <div className={styles.text_before_bonuses_wrapper}>
        <Advantages benefits={benefits} />
      </div>

      <ExtraBonuses benefits={benefits} />

      <BuySubscriptionDialog
        key={activePromocode?.code}
        selectedSubscription={subscription}
        fallbackPromocode={fallbackPromocode}
        order={order}
        resolution={resolution}
        setPromoForSubmit={setPromoForSubmit}
        activePromocode={activePromocode}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <button className={styles.button}>Купить подписку</button>
      </BuySubscriptionDialog>
    </div>
  )
}

export default SubscriptionCard
