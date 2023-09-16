import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Countdown from "react-countdown"

import Footer from "@/components/footer"
import Features from "@/components/features"
import Examples from "@/components/examples"
import Accordion from "@/components/accordion/accordion"
import Menu from "@/components/menu"
import Categories from "@/components/categories"
import OtherProducts from "@/components/other-products"
import Team from "@/components/team"
import Ribbon from "@/components/ribbon"
import MobileMenu from "@/components/mobile-menu"

import Telegram from "@/public/images/jsx/ceo/telegram"
import YouTube from "@/public/images/jsx/ceo/you-tube"
import TeamArrow from "@/public/images/jsx/ceo/arrow"
import SubscribeArrow from "@/public/images/jsx/subscribe/arrow"
import More from "@/public/images/jsx/subscribe/more"

import SelectLggTariff from "@/public/images/jsx/subscribe/select-tariff-lgg"
import SelectLgTariff from "@/public/images/jsx/subscribe/select-tariff-lg"
import SelectMdTariff from "@/public/images/jsx/subscribe/select-tariff-md"
import SelectSmTariff from "@/public/images/jsx/subscribe/select-tariff-sm"

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
  const [mobileMenu, changeMobileMenu] = useState(false)
  const [timerProgress, setTimerProgress] = useState(0)
  const [scrollY, setScrollY] = React.useState(0)

  const currentWidth = useWindowSize()

  let resolution = "lgg"

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
    lgg: 8900,
    lg: 7650,
    md: 8000,
    sm: 7870,
  }

  const scrollHandler = React.useCallback((event) => {
    setScrollY(window.scrollY)
  }, [])

  const wheelHandler = (event) => {
    setCurrentY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("wheel", wheelHandler)
    window.addEventListener("scroll", scrollHandler, { passive: true })

    return () => {
      window.removeEventListener("wheel", wheelHandler)
      window.removeEventListener("scroll", scrollHandler)
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
        // style={{ position: `${mobileMenu == 1 ? "fixed" : ""}` }}
      >
        <div className="app__unsupported-device">
          Your resolution is not supported
          <br />
          Try rotating device
        </div>
        {["lgg", "lg"].includes(resolution) ? (
          <Menu
            resolution={resolution}
            currentY={currentY}
            setCurrentY={setCurrentY}
          />
        ) : (
          ""
        )}
        <div className="app__container">
          <div className="app__container__earn">
            <div className="app__container__earn__left-gradient"></div>
            <div className="app__container__earn__right-gradient"></div>

            <MobileMenu
              open={mobileMenu}
              changeMobileMenu={() => changeMobileMenu(!mobileMenu)}
              resolution={resolution}
              currentY={currentY}
              setCurrentY={setCurrentY}
              referral={referral}
            />
            <div
              className="app__container__earn__header-bg"
              style={scrollY ? { background: "#131313" } : {}}
            ></div>
            <div className="app__container__earn__header">
              <div className="app__container__earn__header__logo"></div>
              <div className="menu-sub-block">
                <a
                  href={`https://t.me/CryptonLobbyBot?start=${referral}`}
                  target={"_blank"}
                >
                  <div className="app__container__earn__header__subscribe">
                    <div className="app__container__earn__header__subscribe__text">
                      Оформить подписку
                    </div>
                    <div className="app__container__earn__header__subscribe__logo"></div>
                  </div>
                </a>
                {["md", "sm"].includes(resolution) ? (
                  <div style={{ width: "25px", zIndex: 101 }}>
                    <div
                      className={`mobile-menu-button open`}
                      onClick={() => changeMobileMenu(!mobileMenu)}
                    ></div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Categories />
            <div className="app__container__earn__title">
              Зарабатывайте <br /> на криптовалюте
            </div>
            <div className="app__container__earn__description">
              Prime – приватное комьюнити с авторским контентом по заработку в
              криптовалюте. Команда из 20 человек отбирает лучшие события,
              подготавливает детальные инструкции и помогает получить первую
              прибыль
            </div>
          </div>

          <div className="app__container__benefits-gradient"></div>
          <div className="app__container__benefits" id="benefits">
            <div className="app__container__benefits__title-logo">
              <div className="app__container__benefits__title-logo__title">
                Преимущества подписки Prime
              </div>
              <div className="app__container__benefits__title-logo__logo"></div>
            </div>
            <div className="app__container__benefits__points">
              <div className="app__container__benefits__points__col">
                <div className="app__container__benefits__points__col__point">
                  <div className="app__container__benefits__points__col__point__plus"></div>
                  <div className="app__container__benefits__points__col__point__text">
                    ВЫЖИМКА ЛУЧШИХ СОБЫТИЙ РЫНКА
                  </div>
                </div>
                <div className="app__container__benefits__points__col__point">
                  <div className="app__container__benefits__points__col__point__plus"></div>
                  <div className="app__container__benefits__points__col__point__text">
                    ПОДРОБНЫЕ
                    <br />
                    ИНСТРУКЦИИ
                  </div>
                </div>
                <div className="app__container__benefits__points__col__point">
                  <div className="app__container__benefits__points__col__point__plus"></div>
                  <div className="app__container__benefits__points__col__point__text">
                    СТРУКТУРИРОВАННАЯ
                    <br /> ИНФОРМАЦИЯ
                  </div>
                </div>
              </div>

              <div className="app__container__benefits__points__col">
                <div className="app__container__benefits__points__col__point">
                  <div className="app__container__benefits__points__col__point__plus"></div>
                  <div className="app__container__benefits__points__col__point__text">
                    ЭКОНОМИЯ ВРЕМЕНИ
                  </div>
                </div>
                <div className="app__container__benefits__points__col__point">
                  <div className="app__container__benefits__points__col__point__plus"></div>
                  <div className="app__container__benefits__points__col__point__text">
                    Для опытных и новичков с базовыми навыками
                  </div>
                </div>
                <div className="app__container__benefits__points__col__point">
                  <div className="app__container__benefits__points__col__point__plus"></div>
                  <div className="app__container__benefits__points__col__point__text">
                    КОМЬЮНИТИ ЕДИНОМЫШЛЕННИКОВ
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Features resolution={resolution} />

          <div className="app__container__video-block" id="video">
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
          </div>

          <div className="app__container__guarantee" id="guarantee">
            <div className="app__container__guarantee__block">
              <div className="app__container__guarantee__block__title"></div>
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
            <div className="app__container__about-ceo__right-light"></div>
            <div className="app__container__about-ceo__title">Команда</div>
            <div className="app__container__about-ceo__founders">
              <div className="app__container__about-ceo__ceo">
                <div className="app__container__about-ceo__ceo__photo pavel"></div>
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
                <div className="app__container__about-ceo__ceo__photo vadim"></div>
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

          <div className="app__container__partners" id="partners">
            <div className="app__container__partners__title">Нам доверяют</div>
            <div className="app__container__partners__logos">
              {["lgg", "lg"].includes(resolution) ? (
                <>
                  <div className="binance"></div>
                  <div className="impossible"></div>
                  <div className="aura"></div>
                  <div className="near"></div>
                </>
              ) : resolution == "md" ? (
                <>
                  <div className="binance"></div>
                  <div className="near"></div>
                  <div className="impossible"></div>
                  <div className="aura"></div>
                </>
              ) : (
                <>
                  <div className="binance"></div>
                  <div className="impossible"></div>
                  <div className="aura"></div>
                  <div className="near"></div>
                </>
              )}
            </div>
          </div>

          <div className="app__container__subscribe" id="subscribe">
            <div className="app__container__subscribe__noise"></div>
            <div className="app__container__subscribe__back">
              <div className="app__container__subscribe__back__left-gradient"></div>
              <div className="app__container__subscribe__back__right-gradient"></div>
            </div>
            <div className="app__container__subscribe__content">
              <div className="app__container__subscribe__content__header">
                <div className="app__container__subscribe__content__title"></div>
              </div>
              <div className="app__container__subscribe__content__cost bottom">
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _5"></div>
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      1 месяц
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _74"></div>
                    <div className="app__container__subscribe__content__cost__block__body__discount _45"></div>
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _6"></div>
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      3 месяца
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _214"></div>
                    <div className="app__container__subscribe__content__cost__block__body__discount _225"></div>
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _7"></div>
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      6 месяцев
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _405"></div>
                    <div className="app__container__subscribe__content__cost__block__body__discount _446"></div>
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _8"></div>
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      12 месяцев
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _765"></div>
                    <div className="app__container__subscribe__content__cost__block__body__discount _880"></div>
                  </div>
                </div>
              </div>
              <div className="app__container__subscribe__content__link__mark">
                При оплате картой конвертация в рубли будет осуществлять по
                курсу ЦБ РФ
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

      <div className="back color dark"></div>
      <div className="back noise"></div>
    </>
  )
}

export default Home
