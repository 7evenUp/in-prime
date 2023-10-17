import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Countdown from "react-countdown"

import Footer from "@/components/footer"
// import Features from "@/components/features"
import Examples from "@/components/examples"
import Accordion from "@/components/accordion/accordion"
import Menu from "@/components/menu"
import OtherProducts from "@/components/other-products"
import Team from "@/components/team"
import Ribbon from "@/components/ribbon"

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"
import Telegram from "@/public/images/jsx/ceo/telegram"
import YouTube from "@/public/images/jsx/ceo/you-tube"
import TeamArrow from "@/public/images/jsx/ceo/arrow"
import More from "@/public/images/jsx/subscribe/more"

import SelectLggTariff from "@/public/images/jsx/subscribe/select-tariff-lgg"
import SelectLgTariff from "@/public/images/jsx/subscribe/select-tariff-lg"
import SelectMdTariff from "@/public/images/jsx/subscribe/select-tariff-md"
import SelectSmTariff from "@/public/images/jsx/subscribe/select-tariff-sm"

import Testimonials from "@/sections/Testimonials/Testimonials"
import Histories from "@/sections/Histories/Histories"
import Benefits from "@/sections/Benefits/Benefits"
import Features from "@/sections/Features/Features"
import Partners from "@/sections/Partners/Partners"
import Roadmap from "@/sections/Roadmap/Roadmap"
import Earn from "@/sections/Earn/Earn"

import { Resolution } from "@/types/resolution"

const useWindowSize = () => {
  const [currentWidth, setCurrentWidth] = useState(0)

  const handleResize = () => {
    setCurrentWidth(window.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)

      handleResize()

      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return currentWidth
}

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span> </span>
  } else {
    return (
      <span>
        {days / 10 >= 1 ? "" : "0"}
        {days}
        <div className="sep">:</div>
        {hours / 10 >= 1 ? "" : "0"}
        {hours}
        <div className="sep">:</div>
        {minutes / 10 >= 1 ? "" : "0"}
        {minutes}
      </span>
    )
  }
}

const Home = (props) => {
  const router = useRouter()
  const referral = router.query.ref || "agent"

  const [currentY, setCurrentY] = useState(0)
  const [openFaq, setOpenFaq] = useState(-1)

  const [timerProgress, setTimerProgress] = useState(0)

  const currentWidth = useWindowSize()

  let resolution: Resolution = "lgg"

  switch (true) {
    case currentWidth >= 1920:
      resolution = "lgg"
      break
    case currentWidth < 1920 && currentWidth >= 1368:
      resolution = "lg"
      break
    case currentWidth < 1368 && currentWidth >= 768:
      resolution = "md"
      break
    case currentWidth < 768:
      resolution = "sm"
      break
    default:
      break
  }

  const tariffs = {
    lgg: <SelectLggTariff />,
    lg: <SelectLgTariff />,
    md: <SelectMdTariff />,
    sm: <SelectSmTariff />,
  }

  const moreInfo = {
    lgg: 11350,
    lg: 9850,
    md: 11150,
    sm: 10370,
  }

  const wheelHandler = (event) => {
    setCurrentY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("wheel", wheelHandler)

    return () => {
      window.removeEventListener("wheel", wheelHandler)
    }
  }, [])

  const toggleFaq = (index: number) => {
    window.scrollTo({
      top: moreInfo[resolution],
      behavior: "smooth",
    })
    setOpenFaq(index)
    setCurrentY(moreInfo[resolution])
  }

  return (
    <>
      <div
        className="app"
      >

        {["lgg", "lg"].includes(resolution) && (
          <Menu
            resolution={resolution}
            currentY={currentY}
            setCurrentY={setCurrentY}
          />
        )}

        <div className="app__container">
          <Earn
            currentY={currentY}
            setCurrentY={setCurrentY}
            referral={referral}
            resolution={resolution}
          />

          <Benefits />
          <Features resolution={resolution} />
          <Roadmap resolution={resolution} />

          {/* <div className="app__container__video-block" id="video">
            <div className="app__container__video-block__video">
              <iframe
                style={{ borderRadius: "8px", border: 0 }}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cRucxHqqWZA"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="app__container__video-block__description-block">
              <div className="app__container__video-block__description-block__title">
                Все возможности Prime
              </div>
              <div className="app__container__video-block__description-block__description">
                Узнайте больше о том, что вас ждет в Prime, после приобретения
                подписки!
              </div>
            </div>
          </div> */}

          <div className="app__container__guarantee" id="guarantee">
            <div className="app__container__guarantee__block">
              <div className="app__container__guarantee__block__title" />
              <div className="app__container__guarantee__block__description">
                Если по какой-то причине подписка за месяц не окупилась, то мы
                продлим её ещё на месяц бесплатно!
              </div>
              <div
                className="app__container__guarantee__block__button"
                onClick={() => toggleFaq(2)}
              >
                <div className="app__container__guarantee__block__button__text">
                  Подробнее
                </div>
                <div className="app__container__guarantee__block__button__arrow">
                  <More />
                </div>
              </div>
            </div>
          </div>

          <Ribbon currentWidth={currentWidth} />

          <div className="app__container__examples" id="examples">
            <div className="app__container__examples__title">
              Реальные
              <br />
              примеры заработка
            </div>
            <Examples resolution={resolution} />
          </div>

          <div className="app__container__about-ceo" id="founder">
            <div className="app__container__about-ceo__right-light" />
            <div className="app__container__about-ceo__title">Команда</div>
            <div className="app__container__about-ceo__founders">
              <div className="app__container__about-ceo__ceo">
                <div className="app__container__about-ceo__ceo__photo pavel" />
                <div className="app__container__about-ceo__ceo__description">
                  <div className="app__container__about-ceo__ceo__description__name">
                    Павел Сычев
                  </div>
                  <div className="app__container__about-ceo__ceo__description__job">
                    Основатель экосистемы{" "}
                    <a href="https://crypton.xyz">Crypton </a>
                  </div>
                  <div className="app__container__about-ceo__ceo__description__channels">
                    <div className="app__container__about-ceo__ceo__description__channels__title">
                      Автор каналов:
                    </div>

                    <a
                      href="https://www.youtube.com/c/EnjoyMaloy"
                      target={"_blank"}
                    >
                      <div className="app__container__about-ceo__ceo__description__channels__link">
                        <YouTube />
                        <div className="app__container__about-ceo__ceo__description__channels__link__text">
                          EnjoyMaloy
                        </div>
                        <TeamArrow />
                      </div>
                    </a>

                    <a href="https://t.me/tradeparty1337" target={"_blank"}>
                      <div className="app__container__about-ceo__ceo__description__channels__link">
                        <Telegram />
                        <div className="app__container__about-ceo__ceo__description__channels__link__text">
                          TradeParty
                        </div>
                        <TeamArrow />
                      </div>
                    </a>
                  </div>
                  <div className="app__container__about-ceo__ceo__description__experience">
                    Имеет более 5 лет опыта в криптоиндустрии. Инфлюенсер 2022
                    года{" "}
                    <a
                      href="https://twitter.com/binance/status/1545462193155604481"
                      target={"_blank"}
                    >
                      по версии Binance
                    </a>
                    .
                  </div>
                </div>
              </div>

              <div className="app__container__about-ceo__ceo">
                <div className="app__container__about-ceo__ceo__photo vadim" />
                <div className="app__container__about-ceo__ceo__description">
                  <div className="app__container__about-ceo__ceo__description__name">
                    Вадим Тарасов
                  </div>
                  <div className="app__container__about-ceo__ceo__description__job">
                    Сооснователь экосистемы{" "}
                    <a href="https://crypton.xyz">Crypton </a>
                  </div>
                  <div className="app__container__about-ceo__ceo__description__channels">
                    <div className="app__container__about-ceo__ceo__description__channels__title">
                      Один из авторов канала
                    </div>

                    <a href="https://t.me/about_traders" target={"_blank"}>
                      <div className="app__container__about-ceo__ceo__description__channels__link">
                        <Telegram />
                        <div className="app__container__about-ceo__ceo__description__channels__link__text">
                          Уголок трейдера
                        </div>
                        <TeamArrow />
                      </div>
                    </a>
                  </div>
                  <div className="app__container__about-ceo__ceo__description__experience">
                    В криптоиндустрии с 2017 года.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Team resolution={resolution} />

          <Partners />

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
                <div className="app__container__subscribe__content__link__description">
                  С оформлением тарифа вам поможет наш бот в Telegram
                </div>
              </div>
            </div>
          </div>

          <Testimonials />
          <Histories />

          <div className="app__container__faq" id="faq">
            <div className="app__container__faq__title">
              Часто задаваемые вопросы
            </div>
            <Accordion mode={"faq"} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          </div>

          <OtherProducts />
          <Footer
            resolution={resolution}
            currentY={currentY}
            setCurrentY={setCurrentY}
          />
        </div>
      </div>

      <div className="back color dark" />
      <div className="back noise" />
    </>
  )
}

export default Home
