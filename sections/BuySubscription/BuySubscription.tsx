import React from "react"
import { useRouter } from "next/router"

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"

import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { Resolution } from "@/types/resolution"

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
  return <OldBuySubscription tariffs={tariffs} resolution={resolution} />
}

export default BuySubscription

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
