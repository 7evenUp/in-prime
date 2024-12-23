import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import * as Switch from '@radix-ui/react-switch'
import clsx from 'clsx'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as Popover from '@radix-ui/react-popover'

import {
  CalendarIcon,
  ChatIcon,
  ContentIcon,
  HelperIcon,
} from '../Features/Icons'

import SubscribeArrow from '@/public/images/jsx/subscribe/arrow'

import BuySubscriptionDialog from '@/components/BuySubscriptionDialog'

import { Resolution } from '@/types/resolution'
import { Promocode, Subscription } from '@/types/api-types'

import styles from './BuySubscription.module.scss'
import { useIsTouchDevice } from '@/hooks/device'
import { calculateSubscriptionDetails } from '@/shared/subsciption'

const PRIME_SUBSCRIPTION_KIND_ID = 1
const ID_URL = process.env.NEXT_PUBLIC_ID_URL
const SPECIAL_PROMOS = (process.env.NEXT_PUBLIC_PROMOS||'NEW,PRIME').split(',')
const DEFAULT_CRYPTON_PROMO = 'CRYPTON'

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
            name: '1',
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 1,
      label: '10',
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: '1 month',
    price: 99,
    isPromotionalModeActive: false,
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
            name: '1',
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 3,
      label: 'Three',
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: '3 months',
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
            name: '1',
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 6,
      label: 'Six',
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: '6 months',
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
            name: '1',
            description: null,
          },
        },
        remainingCount: null,
      },
    ],
    duration: {
      id: 12,
      label: 'Twelve',
    },
    isActive: true,
    kindId: 1, // 1 - prime | 2 - calendar
    name: '12 months',
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
  const [showMonthlyPrice, setShowMonthlyPrice] = useState(true)
  const [promoForSubmit, setPromoForSubmit] = useState('')
  const [isPromoReferral, setIsPromoReferral] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [discountKind, setDiscountKind] = useState<{
    id: 'MONEY' | 'PERCENT'
    label: 'Money' | '%'
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
    queryKey: ['subscriptions'],
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
      axios.post<Promocode>(ID_URL + '/api/v1/promo-codes/validate/', {
        promocode,
        subscription: subscriptionId,
      }),
  })

  const submittedPromoIsValid = () => document.dispatchEvent(new CustomEvent('promo-apply-result', {detail: {isValid: true}}));
  const submittedPromoIsInvalid = () => document.dispatchEvent(new CustomEvent('promo-apply-result', {detail: {isValid: false}}));
  const applyOneOfPromocodes = async (promo:string) => {
    return new Promise<boolean>((resolve) => {
      setPromoForSubmit(promo)
      document.addEventListener('promo-apply-result', (e: CustomEvent) => resolve(e.detail.isValid), {once:true})
    });
  }

  useEffect(() => {
    const url = new URL(location.href)
    const refCode = url.searchParams.get('ref')

    const applyPromos = async () => {
      const promosToValidate = [...SPECIAL_PROMOS, refCode, DEFAULT_CRYPTON_PROMO].filter(Boolean)
      for(let promoToValidate of promosToValidate) if (await applyOneOfPromocodes(promoToValidate)) break
    }

    applyPromos()
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
          submittedPromoIsValid()
        } catch {
          submittedPromoIsInvalid()
          console.log('Error while validating promocode: ', promoForSubmit)
        }
      }
    }
    validate()
  }, [promoForSubmit])

  const buyRef = useRef(null)

  const scrollToBlock = () => {
    buyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className='app__container__subscribe' id='subscribe'>
        {' '}
      </div>
    )
  }

  return (
    <div className='app__container__subscribe__wrapper'>
      <div className='app__container__subscribe__promoback' />
      <div className='app__container__subscribe__newYear' />

      <div className='app__container__subscribe' id='subscribe'>
        <div className='app__container__subscribe__noise' />
        {/* <div className="app__container__subscribe__back"> */}
        {/* <div className="app__container__subscribe__back__left-gradient" />
          <div className="app__container__subscribe__back__right-gradient" /> */}
        {/* </div> */}
        <div className='app__container__subscribe__content'>
          <div className='app__container__subscribe__content__header'>
            <h1
              className='app__container__subscribe__content__title'
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
              Остались вопросы? Задай их нашему{' '}
              <a
                href='https://t.me/crypton_support'
                target='_blank'
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
        id: 'MONEY' | 'PERCENT'
        label: 'Money' | '%'
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
  const { duration, benefits } = subscription

  const localPromocode = useMemo(
    () =>
      discountKind && discounts
        ? { discountAmount, discountKind, discounts }
        : undefined,
    [discountAmount, discountKind, discounts]
  )
  const [dialogOpen, setDialogOpen] = useState(false)

  const [primeOpportunitiesOpened, setPrimeOpportunitiesOpened] =
    useState(false)

  const {
    finalPrice,
    finalMonthlyPrice,
    originalMonthlyPrice,
    originalPrice,
    totalDiscount,
  } = useMemo(
    () =>
      calculateSubscriptionDetails({ subscription, promocode: localPromocode }),
    [subscription, localPromocode]
  )

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
              <>
                {
                  (showMonthlyPrice ? finalMonthlyPrice : finalPrice)
                    .toFixed(2)
                    .split('.')[0]
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
              {showMonthlyPrice && <>/ мес</>}
            </span>
          </div>
          {totalDiscount && (
            <div className={styles.price_discount}>
              <span className={styles.price_discount_percent}>
                -{totalDiscount.value}
                {totalDiscount.type}
              </span>
              <span className={styles.price_discount_amount}>
                ${showMonthlyPrice ? originalMonthlyPrice : originalPrice}
              </span>
            </div>
          )}
        </div>
      )}
      <div
        className={clsx(
          styles.text_before_bonuses_wrapper,
        )}
      >
        <PrimeOpportunities
          open={primeOpportunitiesOpened}
          setOpen={setPrimeOpportunitiesOpened}
        />

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
      
      <div
        className={clsx(
          styles.bonuses_heading
          // order === 0 && styles.bonuses_heading_first
        )}
      >
        <div className={styles.bonuses_icon}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.6834 6.57031H6.3916V11.9998H10.6834V6.57031Z'
              fill='#171717'
            />
            <path
              d='M5.60823 6.57031H1.31641V11.9998H5.60823V6.57031Z'
              fill='#171717'
            />
            <path
              d='M9.34618 2.21325C9.46227 2.00055 9.52834 1.75683 9.52834 1.49791C9.52836 0.671953 8.85638 0 8.03045 0C7.41955 0 6.79447 0.315656 6.31557 0.866039C6.19705 1.00223 6.09149 1.1486 6.0002 1.30104C5.90891 1.1486 5.80334 1.00223 5.68482 0.866039C5.20592 0.315656 4.58087 0 3.96995 0C3.14401 0 2.47203 0.671977 2.47203 1.49791C2.47203 1.7568 2.53808 2.00055 2.65419 2.21325H0.614258V5.78791H5.60888V2.21325H6.39149V5.78791H11.3861V2.21325H9.34618ZM3.96995 2.21325C3.57554 2.21325 3.25463 1.89234 3.25463 1.49791C3.25463 1.10348 3.57554 0.782602 3.96995 0.782602C4.68008 0.782602 5.35524 1.509 5.55172 2.21323L3.96995 2.21325ZM8.03045 2.21325H6.44867C6.64515 1.509 7.32031 0.782625 8.03045 0.782625C8.42485 0.782625 8.74576 1.10353 8.74576 1.49794C8.74574 1.89237 8.42485 2.21325 8.03045 2.21325Z'
              fill='#171717'
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
          ПОДАРКИ
        </span>
      </div>

      <span
        className={clsx(
          styles.bonuses_heading_text,
          styles.bonuses_heading_text_left,
          order === 1 && styles.bonuses_heading_1,
          order === 2 && styles.bonuses_heading_2,
          order === 3 && styles.bonuses_heading_3
        )}
      >
        [ ОСТАЛОСЬ:{' '}
        {benefits.reduce((acc, cur) => acc + (cur.remainingCount ?? 0), 0)} ]
      </span>
      <ul className={clsx(styles.bonuses, styles.bonuses__small)}>
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

      <BuySubscriptionDialog
        key={discountAmount}
        selectedSubscription={subscription}
        order={order}
        resolution={resolution}
        promoForSubmit={isValidForPromo ? promoForSubmit : ''}
        setPromoForSubmit={setPromoForSubmit}
        discountAmount={discountAmount}
        discountKind={discountKind}
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
  const referral = router.query.ref || 'agent'

  return (
    <div className='app__container__subscribe' id='subscribe'>
      <div className='app__container__subscribe__noise' />
      <div className='app__container__subscribe__back'>
        <div className='app__container__subscribe__back__left-gradient' />
        <div className='app__container__subscribe__back__right-gradient' />
      </div>
      <div className='app__container__subscribe__content'>
        <div className='app__container__subscribe__content__header'>
          <div className='app__container__subscribe__content__title' />
        </div>
        <div className='app__container__subscribe__content__cost bottom'>
          <div className='app__container__subscribe__content__cost__block'>
            <div className='app__container__subscribe__content__cost__block__header'>
              <div className='app__container__subscribe__content__cost__block__header__gradient _5' />
              <div className='app__container__subscribe__content__cost__block__header__title'>
                1 месяц
              </div>
            </div>
            <div className='app__container__subscribe__content__cost__block__body'>
              <div className='app__container__subscribe__content__cost__block__body__price _74' />
              <div className='app__container__subscribe__content__cost__block__body__discount _45' />
            </div>
          </div>
          <div className='app__container__subscribe__content__cost__block'>
            <div className='app__container__subscribe__content__cost__block__header'>
              <div className='app__container__subscribe__content__cost__block__header__gradient _6' />
              <div className='app__container__subscribe__content__cost__block__header__title'>
                3 месяца
              </div>
            </div>
            <div className='app__container__subscribe__content__cost__block__body'>
              <div className='app__container__subscribe__content__cost__block__body__price _214' />
              <div className='app__container__subscribe__content__cost__block__body__discount _225' />
            </div>
          </div>
          <div className='app__container__subscribe__content__cost__block'>
            <div className='app__container__subscribe__content__cost__block__header'>
              <div className='app__container__subscribe__content__cost__block__header__gradient _7' />
              <div className='app__container__subscribe__content__cost__block__header__title'>
                6 месяцев
              </div>
            </div>
            <div className='app__container__subscribe__content__cost__block__body'>
              <div className='app__container__subscribe__content__cost__block__body__price _405' />
              <div className='app__container__subscribe__content__cost__block__body__discount _446' />
            </div>
          </div>
          <div className='app__container__subscribe__content__cost__block'>
            <div className='app__container__subscribe__content__cost__block__header'>
              <div className='app__container__subscribe__content__cost__block__header__gradient _8' />
              <div className='app__container__subscribe__content__cost__block__header__title'>
                12 месяцев
              </div>
            </div>
            <div className='app__container__subscribe__content__cost__block__body'>
              <div className='app__container__subscribe__content__cost__block__body__price _765' />
              <div className='app__container__subscribe__content__cost__block__body__discount _880' />
            </div>
          </div>
        </div>
        <div className='app__container__subscribe__content__link__mark'>
          При оплате картой конвертация в рубли осуществляется по курсу ЦБ РФ
        </div>
        <div className='app__container__subscribe__content__link'>
          <a
            href={`https://t.me/CryptonLobbyBot?start=${referral}`}
            target={'_blank'}
          >
            <div className='app__container__subscribe__content__link__button'>
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
    width='14'
    height='14'
    viewBox='0 0 14 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M2.04227 5.66772L6.69377 10.202C6.77547 10.2816 6.88505 10.3262 6.99914 10.3262C7.11323 10.3262 7.22281 10.2816 7.30452 10.202L11.9578 5.66771C11.9959 5.63062 12.0261 5.58627 12.0468 5.53727C12.0675 5.48828 12.0782 5.43564 12.0782 5.38247C12.0782 5.32929 12.0675 5.27665 12.0468 5.22766C12.0261 5.17866 11.9959 5.13431 11.9578 5.09722C11.8796 5.0209 11.7747 4.97817 11.6655 4.97817C11.5563 4.97817 11.4514 5.0209 11.3733 5.09722L6.99914 9.36109L2.62589 5.09722C2.5478 5.02116 2.44309 4.9786 2.33408 4.9786C2.22507 4.9786 2.12036 5.02116 2.04227 5.09722C2.00417 5.13431 1.97388 5.17867 1.95321 5.22766C1.93253 5.27665 1.92187 5.32929 1.92187 5.38247C1.92187 5.43564 1.93253 5.48828 1.95321 5.53727C1.97388 5.58627 2.00417 5.63062 2.04227 5.66772Z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='0.5'
    />
  </svg>
)

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

export const PrimeOpportunities = ({
  open,
  setOpen,
}: {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
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
        {...(setOpen &&
           { onClick: () => setOpen((prev) => !prev) }
          )}
      >
        <div className={clsx(styles.bonus, styles.bonus_first)}>
          <p className={clsx(styles.text_before_bonuses)}>
            Все{' '}
            <button type='button'>
              возможности Prime{' '}
              <span style={{ marginLeft: '4px', marginTop: '3px' }}>
                <NavArrowIcon />
              </span>
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
          <div className={styles.text_before_bonuses_wrap}>
            <AbilityItem icon={ContentIcon} text='Контент о заработке' />
            <AbilityItem icon={CalendarIcon} text='Прибыльный календарь' />
            <AbilityItem icon={ChatIcon} text='Чаты с сообществом' />
            <AbilityItem icon={HelperIcon} text='Поддержка экспертов' />
          </div>
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
    () => (outerSetIsOpen ? [outerOpen, outerSetIsOpen] : [localOpen, localSetOpen]),
    [outerOpen, outerSetIsOpen, localOpen, localSetOpen]
  )

  return (
    <HoverCardOrPopover.Root open={open} onOpenChange={setOpen} openDelay={150}>
      <HoverCardOrPopover.Trigger
        style={{ width: '100%' }}
        className={clsx(
          isTouchDevice ? styles.PopoverTrigger : styles.HoverCardTrigger
        )}
        {...(setOpen && { onClick: () => setOpen((prev) => !prev) })}
      >
        <li className={clsx(styles.bonus, isTouchDevice && styles.bonus_small)}>
          {!compact && <img src={benefit.file} className={styles.bonus_img} />}
          <p className={styles.bonus_text}>
            {benefit.name}
            <span style={{ marginLeft: '6px' }}>
              <NavArrowIcon />
            </span>
          </p>
        </li>
      </HoverCardOrPopover.Trigger>
      <HoverCardOrPopover.Portal>
        <HoverCardOrPopover.Content
          className={styles.HoverCardContent}
          sideOffset={compact ? 2 : 4}
          align='center'
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
