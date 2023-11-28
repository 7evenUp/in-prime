import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

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
import RibbonSale from "@/components/ribbon-sale"
import Countdown from "@/components/countdown"
import FeaturesMobile from "@/sections/Features/FeaturesMobile"
import { Swiper, SwiperSlide } from "swiper/react"
import Founders from "@/sections/founders/Founders"
import FoundersMobile from "@/sections/founders/FoundersMobile"
import PartnersMobile from "@/sections/Partners/PartnersMobile"

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
    return <div />;
  } else {
    return (
      <span>
        <div className="date">
          {days / 10 >= 1 ? "" : "0"}
          {days}
        </div>
        <div className="sep">:</div>
        <div className="date">
          {hours / 10 >= 1 ? "" : "0"}
          {hours}
        </div>
        <div className="sep">:</div>
        <div className="date">
          {minutes / 10 >= 1 ? "" : "0"}
          {minutes}
        </div>
        <div className="sep">:</div>
        <div className="date">
          {seconds / 10 >= 1 ? "" : "0"}
          {seconds}
        </div>
      </span>
    );
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
    lgg: 11945,
    lg: 10531,
    md: 12000,
    sm: 11710,
  }

  const wheelHandler = (event) => {
    setCurrentY(window.scrollY)
  }

  useEffect(() => {
    setTimerProgress(
      Math.round(
        Date.now() >= 1700830800000 ?
        ((Date.now() - 1700830800000) / (1701377940000 - 1700830800000)) * 100
        : 0
      )
    );
  }, []);
  console.log(new Date(1701377940000))
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
          {resolution === "sm" ? <FeaturesMobile resolution={resolution} /> : <Features resolution={resolution} />}
          {/* <Features resolution={resolution} /> */}
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
                onClick={() => toggleFaq(3)}
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

          <Ribbon currentWidth={currentWidth}/>

          <div className="app__container__examples" id="examples">
            <div className="app__container__examples__title">
              Реальные
              <br />
              примеры заработка
            </div>
            <Examples resolution={resolution} />
          </div>

          {resolution === "sm" ? (
            <FoundersMobile />
          ) : (
            <Founders />
          )}

          <Team resolution={resolution} />

          {resolution === "sm" ? (
            <PartnersMobile />
          ) : (
            <Partners />
          )}

          <div className="app__container__subscribe" id="subscribe">
            <RibbonSale currentWidth={currentWidth} />

            <div className="app__container__subscribe__noise" />
            <div className="app__container__subscribe__back">
              <div className="app__container__subscribe__back__left-gradient" />
              <div className="app__container__subscribe__back__right-gradient" />
            </div>
            <div className="app__container__subscribe__content">
              <div className="app__container__subscribe__content__header">
                <div className="app__container__subscribe__content__title" />
                <div className="app__container__subscribe__content__subtitle" />

              </div>
              <div className="app__container__subscribe__content__cost bottom">
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header _63">
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      1 месяц
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body _63">
                    <div className="app__container__subscribe__content__cost__block__body__price _63" />
                    <div className="app__container__subscribe__content__cost__block__body__text _63">
                      Фирменный <br/>
                      922/999
                      </div>
                    <div className="app__container__subscribe__content__cost__block__body__gift _63" />
                    <a
                      href={`https://t.me/CryptonLobbyBot?start=${referral}`}
                      target={"_blank"}
                    >
                      <div className="app__container__subscribe__content__cost__block__body__btn _63">
                        <div className="app__container__subscribe__content__cost__block__body__btn__text">
                          Забрать подарок
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="app__container__subscribe__content__cost__block__chance"> 
                    <div className="app__container__subscribe__content__cost__block__chance__text">
                      <div className="app__container__subscribe__content__cost__block__chance__text-white">
                        Шанс получить:
                      </div>
                      <div className="app__container__subscribe__content__cost__block__chance__text__list _63">
                        Подписка на {["lgg", "lg"].includes(resolution) ? 'Telegram ' : 'TG-'}Premium на 3 месяца - 50% <br />
                        Фирменную Кружку + Носки Crypton - 50% 
                      </div>
                    </div>
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header _189">
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      3 месяца
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body _189">
                    <div className="app__container__subscribe__content__cost__block__body__price _189" />
                    <div className="app__container__subscribe__content__cost__block__body__text _189">
                      Необычный <br/>
                      73/119
                    </div>
                    <div className="app__container__subscribe__content__cost__block__body__gift _189" />
                    <a
                      href={`https://t.me/CryptonLobbyBot?start=${referral}`}
                      target={"_blank"}
                    >
                      <div className="app__container__subscribe__content__cost__block__body__btn _189">
                        <div className="app__container__subscribe__content__cost__block__body__btn__text">
                          Забрать подарок
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="app__container__subscribe__content__cost__block__chance"> 
                    <div className="app__container__subscribe__content__cost__block__chance__text">
                      <div className="app__container__subscribe__content__cost__block__chance__text-white">
                        Шанс получить:
                      </div>
                      <div className="app__container__subscribe__content__cost__block__chance__text__list _189">
                        Airpods 3 - 10% <br />
                        Safepal S1 - 40% <br />
                        Футболку Crypton - 50% <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header _355">
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      6 месяцев
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body _355">
                    <div className="app__container__subscribe__content__cost__block__body__price _355" />
                    <div className="app__container__subscribe__content__cost__block__body__text _355">
                      Редкий<br/>
                      46/99
                    </div>
                    <div className="app__container__subscribe__content__cost__block__body__gift _355" />
                    <a
                      href={`https://t.me/CryptonLobbyBot?start=${referral}`}
                      target={"_blank"}
                    >
                      <div className="app__container__subscribe__content__cost__block__body__btn _355">
                        <div className="app__container__subscribe__content__cost__block__body__btn__text">
                          Забрать подарок
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="app__container__subscribe__content__cost__block__chance"> 
                    <div className="app__container__subscribe__content__cost__block__chance__text">
                      <div className="app__container__subscribe__content__cost__block__chance__text-white">
                        Шанс получить:
                      </div>
                      <div className="app__container__subscribe__content__cost__block__chance__text__list _355">
                        PS 5 Digital - 10% <br />
                        Safepal x1 - 40% <br />
                        худи Crypton - 50% <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header _666">
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      12 месяцев
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body _666">
                    <div className="app__container__subscribe__content__cost__block__body__price _666" />
                    <div className="app__container__subscribe__content__cost__block__body__text _666">
                      Мистический<br/>
                      45/99
                      </div>
                    <div className="app__container__subscribe__content__cost__block__body__gift _666" />
                    <a
                      href={`https://t.me/CryptonLobbyBot?start=${referral}`}
                      target={"_blank"}
                    >
                      <div className="app__container__subscribe__content__cost__block__body__btn _666">
                        <div className="app__container__subscribe__content__cost__block__body__btn__text">
                          Забрать подарок
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="app__container__subscribe__content__cost__block__chance"> 
                    <div className="app__container__subscribe__content__cost__block__chance__text">
                      <div className="app__container__subscribe__content__cost__block__chance__text-white">
                        Шанс получить:
                      </div>
                      <div className="app__container__subscribe__content__cost__block__chance__text__list _666">
                        Macbook Air M1 - 10% <br />
                        Ledger Nano S Plus - 40% <br />
                        Фирменную худи + футболку <br />
                        Trust Wallet - 50%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="app__container__subscribe__content__link__mark">
                Мы отмечаем не только Черную пятницу, но еще и День рождения Crypton, поэтому мы решили сделать <b>гарантированные</b> подарки для всех! 
              </div>
              <div className="app__container__subscribe__content__link__mark">
              * Итоговый дисконт включает в себе две скидки, которые отнимаются от цены по очереди. 
              </div>
              <div className="app__container__subscribe__content___timer__header">
                <div className="app__container__subscribe__content__timer__title"></div>

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
                    date={1701377940000}
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
