import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react"
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
import { BotIcon, CommunityIcon } from "./Icons"

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"

import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { Resolution } from "@/types/resolution"
import { Promocode, Subscription } from "@/types/api-types"

import styles from "./BuySubscription.module.scss"
import { useIsTouchDevice } from "@/hooks/device"
import { calculateSubscriptionDetails } from "@/shared/subsciption"
import { scrollToSection } from "@/redux/reducers/scrollReducer"

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = process.env.NEXT_PUBLIC_ID_URL
const SPECIAL_PROMOS = (process.env.NEXT_PUBLIC_PROMOS || "NEW,PRIME").split(
  ","
)
const DEFAULT_CRYPTON_PROMO = ""

const fallbackSubscriptions: Subscription[] = [
  // {
  //   id: 1,
  //   baseDiscount: null,
  //   baseDiscountAmount: null,
  //   referralDiscountAmount: null,
  //   referralDiscountKind: null,
  //   benefits: [
  //     {
  //       id: 1,
  //       file: null,
  //       translations: {
  //         ru: {
  //           name: "1",
  //           description: null,
  //         },
  //       },
  //       remainingCount: null,
  //     },
  //   ],
  //   duration: {
  //     id: 1,
  //     label: "10",
  //   },
  //   isActive: true,
  //   kindId: 1, // 1 - prime | 2 - calendar
  //   name: "1 month",
  //   price: 99,
  //   isPromotionalModeActive: false,
  // },
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
    isPromotionalModeActive: false,
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
    isPromotionalModeActive: false,
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
    isPromotionalModeActive: false,
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
  const [showMonthlyPrice, setShowMonthlyPrice] = useState(false)
  const [promoForSubmit, setPromoForSubmit] = useState("")

  const [fallbackPromocode, setFallbackPromocode] = useState<Promocode | null>(
    null
  )
  const [activePromocode, setActivePromocode] = useState<Promocode | null>(null)

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
          (el) =>
            el.isActive &&
            el.kindId === PRIME_SUBSCRIPTION_KIND_ID &&
            // Не рендерим подписку на 1 месяц (закоментить условие если надо включить)
            el.duration.id !== 1
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
    <div id="subscribe" className="app__container__subscribe__wrapper">
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

  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard

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

  const scrollToFeatures = () => scrollToSection("Возможности")

  const prevSub = subscriptions[order - 1]
  const prevSubMonths = prevSub?.duration.id ?? 0
  const prevSubMonthsString =
    prevSubMonths === 1
      ? "месяц"
      : [2, 3, 4].includes(prevSubMonths)
      ? "месяца"
      : "месяцев"

  return (
    <div className={styles.subscription}>
      <div className={styles.subscription_header}>
        <div className={styles.subscription_name_wrapper}>
          <h3 className={styles.subscription_name}>
            {order === 0 && "START"}
            {order === 1 && "SUPER"}
            {order === 2 && "EPIC"}
          </h3>
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
              <>
                {
                  (showMonthlyPrice ? finalMonthlyPrice : finalPrice)
                    .toFixed(2)
                    .split(".")[0]
                }
              </>
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
              {/* {showMonthlyPrice && <>/ мес</>} */}
              {totalDiscount && (
                <span className={styles.price_line_through}>
                  ${showMonthlyPrice ? originalMonthlyPrice : originalPrice}
                </span>
              )}
            </span>
          </div>
          {totalDiscount && (
            <div className={styles.price_newDiscount}>
              Выгода $
              {showMonthlyPrice
                ? Math.floor(originalMonthlyPrice - finalMonthlyPrice)
                : Math.floor(originalPrice - finalPrice)}
            </div>
            // <div className={styles.price_discount}>
            //   <span className={styles.price_discount_percent}>
            //     -{totalDiscount.value}
            //     {totalDiscount.type}
            //   </span>
            //   <span className={styles.price_discount_amount}>
            //     ${showMonthlyPrice ? originalMonthlyPrice : originalPrice}
            //   </span>
            // </div>
          )}
        </div>
      )}
      <div style={{ marginTop: 16 }}></div>
      {order === 0 && (
        <div style={{ marginLeft: 16 }}>
          <PrimeOpportunitiesContent />
        </div>
      )}
      <div className={clsx(styles.text_before_bonuses_wrapper)}>
        {order === 0 ? (
          <span
            className={styles.text_before_bonuses}
            onClick={scrollToFeatures}
          >
            {" "}
            <div style={{ marginTop: 16 }}></div>{" "}
            <PrimeOpportunities open={false} setOpen={() => null} hideArrow />{" "}
          </span>
        ) : (
          <span className={styles.text_before_bonuses} style={{ opacity: 0.5 }}>
            Все, что входит в {prevSubMonths} {prevSubMonthsString}
          </span>
        )}

        {/* Поменять на 3, когда вернётся подписка на 1 мес */}
        {order === 2 && (
          <p
            className={clsx(
              styles.text_before_bonuses,
              styles.text_before_bonuses_priority
            )}
          >
            + Приоритетная поддержка
          </p>
        )}
      </div>

      {/* Добавить условие `order !== 0 &&`, когда вернётся подписка на 1 мес */}
      {benefits?.length > 0 && (
        <>
          <div
            className={clsx(
              styles.bonuses_heading
              // order === 0 && styles.bonuses_heading_first
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
                // поменять на 1,2,3 - когда вернётся подписка на 1 месяц
                order === 0 && styles.bonuses_heading_1,
                order === 1 && styles.bonuses_heading_2,
                order === 2 && styles.bonuses_heading_3
              )}
            >
              ЭКСТРА БОНУСЫ
            </span>
          </div>

          <ul className={clsx(styles.bonuses, styles.bonuses__small)}>
            {order === 2 && (
              <HoverCardOrPopover.Root openDelay={150}>
                <HoverCardOrPopover.Trigger
                  className={clsx(
                    isTouchDevice
                      ? styles.PopoverTrigger
                      : styles.HoverCardTrigger
                  )}
                >
                  <li className={styles.bonus}>
                    <img
                      src="/images/png/ceo/pasha-square.png"
                      alt="Павел Сычев"
                      style={{
                        borderRadius: 8,
                        width: 48,
                        height: 48,
                      }}
                    />
                    <p className={styles.bonus_text}>
                      Консультация с основателем Crypton
                      <span style={{ marginLeft: "6px" }}>
                        <NavArrowIcon />
                      </span>
                    </p>
                  </li>
                </HoverCardOrPopover.Trigger>
                <HoverCardOrPopover.Portal>
                  <HoverCardOrPopover.Content
                    className={clsx(
                      isTouchDevice
                        ? styles.PopoverContent
                        : styles.HoverCardContent,
                      isTouchDevice
                        ? styles.PopoverContent_first
                        : styles.HoverCardContent_first
                    )}
                    style={{ flexDirection: "column", gap: 8 }}
                    sideOffset={5}
                  >
                    <p>
                      С тарифом Epic вы получите личную консультацию от
                      основателя Crypton — Павла Сычева. За 30 минут он передаст
                      концентрат опыта, который поможет избежать 99% ошибок в
                      Web3. У Павла 7-летний опыт в крипте, успешное
                      крипто-медиа и 5 Web3-продуктов с командой из 70 человек.
                      Один звонок может сэкономить вам месяцы и тысячи долларов
                      — просто назначьте его.
                    </p>
                  </HoverCardOrPopover.Content>
                </HoverCardOrPopover.Portal>
              </HoverCardOrPopover.Root>
            )}
            {benefits.map(
              (benefit) =>
                benefit.file &&
                benefit.remainingCount !== 0 && (
                  <BenefitCard
                    benefit={{
                      file: benefit.file,
                      name: benefit.translations.ru.name,
                      description: benefit.translations.ru.description,
                    }}
                  />
                )
            )}
          </ul>
        </>
      )}

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
    <div className="app__container__subscribe">
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

export const PrimeOpportunities = ({
  open,
  setOpen,
  hideArrow,
}: {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  hideArrow?: boolean
}) => {
  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard

  return (
    <HoverCardOrPopover.Root open={open} onOpenChange={setOpen} openDelay={150}>
      <HoverCardOrPopover.Trigger
        className={clsx(
          isTouchDevice ? styles.PopoverTrigger : styles.HoverCardTrigger,
          isTouchDevice
            ? styles.PopoverTrigger_first
            : styles.HoverCardTrigger_first
        )}
        {...(setOpen && { onClick: () => setOpen((prev) => !prev) })}
      >
        <div className={clsx(styles.bonus, styles.bonus_first)}>
          <p className={clsx(styles.text_before_bonuses)}>
            Все{" "}
            <button type="button">
              возможности Prime{" "}
              {!hideArrow && (
                <span style={{ marginLeft: "4px", marginTop: "3px" }}>
                  <NavArrowIcon />
                </span>
              )}
            </button>
          </p>
        </div>
      </HoverCardOrPopover.Trigger>
      <HoverCardOrPopover.Portal>
        <HoverCardOrPopover.Content
          className={clsx(
            isTouchDevice ? styles.PopoverContent : styles.HoverCardContent,
            isTouchDevice
              ? styles.PopoverContent_first
              : styles.HoverCardContent_first
          )}
          sideOffset={5}
        >
          <PrimeOpportunitiesContent />
        </HoverCardOrPopover.Content>
      </HoverCardOrPopover.Portal>
    </HoverCardOrPopover.Root>
  )
}

export const BenefitCard = ({
  benefit,
  compact,
  open: outerOpen,
  setOpen: outerSetIsOpen,
}: {
  benefit: {
    file: string
    name: string
    description: string
  }
  compact?: boolean
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const isTouchDevice = useIsTouchDevice()
  const HoverCardOrPopover = isTouchDevice ? Popover : HoverCard

  // Mobile bug fix
  const [localOpen, localSetOpen] = useState(false)
  const [open, setOpen] = useMemo(
    () =>
      outerSetIsOpen ? [outerOpen, outerSetIsOpen] : [localOpen, localSetOpen],
    [outerOpen, outerSetIsOpen, localOpen, localSetOpen]
  )

  return (
    <HoverCardOrPopover.Root open={open} onOpenChange={setOpen} openDelay={150}>
      <HoverCardOrPopover.Trigger
        style={{ width: "100%" }}
        className={clsx(
          isTouchDevice ? styles.PopoverTrigger : styles.HoverCardTrigger
        )}
        {...(setOpen && { onClick: () => setOpen((prev) => !prev) })}
      >
        <li className={styles.bonus}>
          {!compact && <img src={benefit.file} className={styles.bonus_img} />}
          <p className={styles.bonus_text}>
            {benefit.name}
            <span style={{ marginLeft: "6px" }}>
              <NavArrowIcon />
            </span>
          </p>
        </li>
      </HoverCardOrPopover.Trigger>
      <HoverCardOrPopover.Portal>
        <HoverCardOrPopover.Content
          className={styles.HoverCardContent}
          sideOffset={compact ? 2 : 4}
          align="center"
        >
          <div className={styles.HoverCardImage}>
            <img className={styles.HoverCardImage_img} src={benefit.file} />
          </div>
          <div>
            <h1 className={styles.HoverCardContent_header}>{benefit.name}</h1>
            <p className={styles.HoverCardContent_text}>
              {benefit.description}
            </p>
          </div>
        </HoverCardOrPopover.Content>
      </HoverCardOrPopover.Portal>
    </HoverCardOrPopover.Root>
  )
}

export const PrimeOpportunitiesContent = () => {
  return (
    <div className={styles.text_before_bonuses_wrap}>
      <AbilityItem icon={ContentIcon} text="Контент о заработке" />
      <AbilityItem icon={CalendarIcon} text="Crypton Drops Calendar" />
      <AbilityItem icon={BotIcon} text="Runner bot - коллы на мемкоины" />
      <AbilityItem icon={ChatIcon} text="Чаты с сообществом" />
      <AbilityItem icon={CommunityIcon} text="Совместная отработка проектов" />
      <AbilityItem icon={HelperIcon} text="Поддержка экспертов" />
    </div>
  )
}

const AbilityItem = ({ icon: Icon, text }) => (
  <p
    className={clsx(
      styles.text_before_bonuses,
      styles.text_before_bonuses_priority,
      styles.text_before_bonuses_ability
    )}
  >
    <div className={styles.icon_wrapper}>
      <Icon className={styles.text_before_bonuses_ability_icon} />
    </div>
    {text}
  </p>
)
