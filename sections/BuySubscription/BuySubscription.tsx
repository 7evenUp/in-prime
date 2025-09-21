import React, { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"

import { fallbackSubscriptions } from "./fallback"

import Switcher from "./Switcher"
import SubscriptionCard from "./SubscriptionCard/SubscriptionCard"

import TimerPromo from "../TimerPromo/TimerPromo"

import useSendEvent from "@/hooks/useSendEvent"

import { Resolution } from "@/types/resolution"
import { Promocode, Subscription } from "@/types/api-types"

import styles from "./BuySubscription.module.scss"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL
const SPECIAL_PROMOS = (process.env.NEXT_PUBLIC_PROMOS || "NEW,PRIME").split(
  ","
)
const DEFAULT_CRYPTON_PROMO = ""

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

  const [fallbackPromocode, setFallbackPromocode] = useState<Promocode | null>(
    null
  )
  const [activePromocode, setActivePromocode] = useState<Promocode | null>(null)

  const { sendEvent } = useSendEvent()

  const { ref } = useInView({
    triggerOnce: true,
    rootMargin: "-400px 0px",
    onChange: (inView) => {
      if (inView) {
        sendEvent({ name: "landing_view.subscriptions" })
      }
    },
  })

  const {
    data: subscriptionsData,
    isError: isSubscriptionsError,
    isLoading,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      try {
        const response = await axios.get<Subscription[]>(
          `${ID_URL}/api/v1/subscriptions/get-active/`
        )
        return response.data
          .filter((el) => el.isActive)
          .sort((a, b) => b.kind.rang - a.kind.rang)
      } catch (error) {
        return fallbackSubscriptions
      }
    },
  })

  const subscriptions = useMemo(() => {
    if (!subscriptionsData) return []

    if (showMonthlyPrice)
      return subscriptionsData.filter((el) => el.duration.id === 1)

    return subscriptionsData.filter((el) => el.duration.id === 12)
  }, [subscriptionsData, showMonthlyPrice])

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
      subscriptionId?: number
    }) =>
      axios.post<Promocode>(
        ID_URL + "/api/v1/promo-codes/validate/",
        {
          promocode: promocode.trim().toUpperCase(),
          subscription: subscriptionId,
        },
        { withCredentials: true }
      ),
  })

  const submittedPromoIsValid = (promo: Promocode) =>
    document.dispatchEvent(
      new CustomEvent("promo-apply-result", { detail: promo })
    )
  const submittedPromoIsInvalid = () =>
    document.dispatchEvent(
      new CustomEvent("promo-apply-result", { detail: null })
    )
  const applyOneOfPromocodes = async (promo: string) => {
    return new Promise<Promocode>((resolve) => {
      setPromoForSubmit(promo)
      document.addEventListener(
        "promo-apply-result",
        (e: CustomEvent) => resolve(e.detail),
        { once: true }
      )
    })
  }

  useEffect(() => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get("ref")

    const applyPromos = async () => {
      const promosToValidate = [
        refCode,
        // ...SPECIAL_PROMOS,
        // DEFAULT_CRYPTON_PROMO,
      ].filter(Boolean)
      for (let promoToValidate of promosToValidate) {
        const promo = await applyOneOfPromocodes(promoToValidate)
        if (promo) {
          setFallbackPromocode(promo)
          break
        }
      }
    }

    applyPromos()
  }, [])

  useEffect(() => {
    reset()
    setActivePromocode(null)

    const validate = async () => {
      if (promoForSubmit) {
        try {
          const { data } = await mutatePromoValidation({
            promocode: promoForSubmit,
          })

          setActivePromocode(data)
          submittedPromoIsValid(data)
        } catch {
          submittedPromoIsInvalid()
          console.log("Error while validating promocode: ", promoForSubmit)
        }
      }
    }
    validate()
  }, [promoForSubmit])

  return (
    <div
      id="subscribe"
      className="app__container__subscribe__wrapper"
      ref={ref}
    >
      <div className="app__container__subscribe__promoback" />
      <div className="app__container__subscribe__newYear" />

      <div className="app__container__subscribe">
        {/* <div className="app__container__subscribe__back"> */}
        {/* <div className="app__container__subscribe__back__left-gradient" />
          <div className="app__container__subscribe__back__right-gradient" /> */}
        {/* </div> */}
        <div className="app__container__subscribe__content">
          <div className="app__container__subscribe__content__header">
            <h1 className="app__container__subscribe__content__title">
              Оформите подписку
            </h1>
          </div>

          <Switcher
            showMonthlyPrice={showMonthlyPrice}
            setShowMonthlyPrice={setShowMonthlyPrice}
          />

          {isLoading ? (
            <div className={styles.subscriptions}>
              <div className={styles.skeleton} />
              <div className={styles.skeleton} />
              <div className={styles.skeleton} />
              {/* <div className={styles.skeleton} /> */}
            </div>
          ) : (
            subscriptions && (
              <div className={styles.subscriptions}>
                {subscriptions.map((el, i) => (
                  <SubscriptionCard
                    subscriptions={subscriptions}
                    fallbackPromocode={fallbackPromocode}
                    key={el.id}
                    subscription={el}
                    order={i}
                    resolution={resolution}
                    showMonthlyPrice={showMonthlyPrice}
                    setPromoForSubmit={setPromoForSubmit}
                    activePromocode={activePromocode}
                    isPromoPending={isPending}
                  />
                ))}
              </div>
            )
          )}

          <TimerPromo />

          {isLoading ? (
            <>
              <p className={styles.support}>Загружаем подписки...</p>
              <div className={styles.support_wrapper}>
                <p className={styles.support}>
                  Если есть вопросы - задай их нашему{" "}
                  <a
                    href="https://t.me/crypton_support"
                    target="_blank"
                    className={styles.support_link}
                  >
                    специалисту в Телеграм
                  </a>
                </p>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default BuySubscription
