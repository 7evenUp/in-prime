import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Footer from "@/components/footer"
// import Features from "@/components/features"
import Examples from "@/components/examples"
import Accordion from "@/components/accordion/accordion"
import Menu from "@/components/menu"
import Team from "@/components/team"
import Ribbon from "@/components/ribbon"

import YouTube from "@/public/images/jsx/ceo/you-tube"
import TeamArrow from "@/public/images/jsx/ceo/arrow"
import More from "@/public/images/jsx/subscribe/more"

import Testimonials from "@/sections/Testimonials/Testimonials"
import Histories from "@/sections/Histories/Histories"
import Benefits from "@/sections/Benefits/Benefits"
import Features from "@/sections/Features/Features"
import Partners from "@/sections/Partners/Partners"
import Roadmap from "@/sections/Roadmap/Roadmap"
import Earn from "@/sections/Earn/Earn"
import FeaturesMobile from "@/sections/Features/FeaturesMobile"
import Founders from "@/sections/founders/Founders"
import BuySubscription from "@/sections/BuySubscription/BuySubscription"
import OtherProducts from "@/sections/OtherProducts/OtherProducts"

import { Resolution } from "@/types/resolution"
import RibbonSale from "@/components/ribbon-sale"
// import Countdown from "@/components/countdown";
import { Swiper, SwiperSlide } from "swiper/react"
import BuySubscr from "@/public/images/jsx/subscribe/buy-subscr"
import BuySubscrLg from "@/public/images/jsx/subscribe/buy-subscr-lg"
import BuySubscrMd from "@/public/images/jsx/subscribe/buy-subscr-md"
import BuySubscrSm from "@/public/images/jsx/subscribe/buy-subscr-sm"
import LoyaltySystem from "@/sections/LoyaltySystem/LoyaltySystem"

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
    return <div />
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

  // const tariffs = {
  //   lgg: <SelectLggTariff />,
  //   lg: <SelectLgTariff />,
  //   md: <SelectMdTariff />,
  //   sm: <SelectSmTariff />,
  // };
  const tariffs = {
    lgg: <BuySubscr />,
    lg: <BuySubscrLg />,
    md: <BuySubscrMd />,
    sm: <BuySubscrSm />,
  }

  const moreInfo = {
    lgg: 11825,
    lg: 10451,
    md: 11520,
    sm: 10450,
  }

  const wheelHandler = (event) => {
    setCurrentY(window.scrollY)
  }

  useEffect(() => {
    setTimerProgress(
      Math.round(
        Date.now() >= 1700830800000
          ? ((Date.now() - 1700830800000) / (1701377940000 - 1700830800000)) *
              100
          : 0
      )
    )
  }, [])
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
      <div className="app">
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

          {resolution === "sm" ? (
            <FeaturesMobile resolution={resolution} />
          ) : (
            <Features resolution={resolution} />
          )}

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

          <Roadmap resolution={resolution} />

          <Founders />

          <Team resolution={resolution} />

          {/* <LoyaltySystem resolution={resolution} /> */}

          <BuySubscription tariffs={tariffs} resolution={resolution} />

          <Testimonials />
          <Histories />

          <Partners />

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
