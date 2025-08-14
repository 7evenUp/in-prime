import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import { useDispatch } from "react-redux"
import { useThrottledCallback } from "@react-hookz/web"

import Footer from "@/components/footer"
import Accordion from "@/components/accordion/accordion"
import Team from "@/components/Team"
import LoginIdPopup from "@/components/LoginIdPopup/LoginIdPopup"
import { AdBanner, TAdBanner } from "@/components/banner/ad-banner.client"

import Testimonials from "@/sections/Testimonials/Testimonials"
import Histories from "@/sections/Histories/Histories"
import Features from "@/sections/Features/Features"
import FeaturesSm from "@/sections/Features/FeaturesSm"
// import Roadmap from "@/sections/Roadmap/Roadmap"
import Earn from "@/sections/Earn/Earn"
import Founders from "@/sections/founders/Founders"
import OtherProducts from "@/sections/OtherProducts/OtherProducts"
import Guarantee from "@/sections/Guarantee/Guarantee"
import BuySubscription from "@/sections/BuySubscription/BuySubscription"
import Examples from "@/sections/Examples/Examples"
import Achievements from "@/sections/Achievements/Achievements"

import BuySubscr from "@/public/images/jsx/subscribe/buy-subscr"
import BuySubscrLg from "@/public/images/jsx/subscribe/buy-subscr-lg"
import BuySubscrMd from "@/public/images/jsx/subscribe/buy-subscr-md"
import BuySubscrSm from "@/public/images/jsx/subscribe/buy-subscr-sm"

import { Resolution } from "@/types/resolution"

import { scrollReducer } from "@/redux/reducers/scrollReducer"
// import TimerPromo from "@/sections/TimerPromo/TimerPromo"

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

type SSRProps = {
  banner: TAdBanner | null
  bannerCookieName: string
}

const Home = ({ bannerCookieName, banner }: SSRProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const referral = router.query.ref || "agent"
  const scrollToSection = router.query.scrollTo || ""

  const [teamOpened, setTeamOpened] = useState(false)
  const scrollHandler = useThrottledCallback(
    (event) => {
      dispatch(scrollReducer.actions.setScrollY(window.scrollY))
    },
    [],
    200
  )

  useEffect(() => {
    if (scrollToSection) {
      let elemId = Array.isArray(scrollToSection)
        ? scrollToSection[0]
        : scrollToSection
      const htmlElement = document.getElementById(elemId)

      if (htmlElement) htmlElement.scrollIntoView(true)
    }
  }, [scrollToSection])

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  const currentWidth = useWindowSize()

  let resolution: Resolution = "lgg"

  // const [fridayRendered, setFridayRendered] = useState(false)
  // React.useEffect(() => {
  //   const endFriday = 1733173199000

  //   const isFridayVisible = endFriday - new Date().getTime() > 0

  //   if (isFridayVisible) setFridayRendered(true)
  // }, [])

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

  return (
    <>
      <div className="app">
        {/* {["lgg", "lg"].includes(resolution) && (
          <Menu
            resolution={resolution}
          />
        )} */}
        <div className="app__container">
          <Earn referral={referral} resolution={resolution} />

          <Examples resolution={resolution} />

          <Achievements resolution={resolution} />

          {resolution === "sm" || resolution === "md" ? (
            <FeaturesSm resolution={resolution} />
          ) : (
            <Features resolution={resolution} />
          )}

          <Guarantee />

          {/* <Roadmap resolution={resolution} /> */}

          <Founders teamOpened={teamOpened} setTeamOpened={setTeamOpened} />
          <Team teamOpened={teamOpened} setTeamOpened={setTeamOpened} />

          {/* <Birthday /> */}

          {/* {fridayRendered && <TimerPromo />}  */}

          {/* <LoyaltySystem resolution={resolution} /> */}

          {/* <BuySubscription tariffs={tariffs} resolution={resolution} /> */}

          <BuySubscription tariffs={tariffs} resolution={resolution} />

          <Testimonials resolution={resolution} />

          <Histories />

          {/* <Partners /> */}

          <div className="app__container__faq" id="faq">
            <div className="app__container__faq__title">
              Часто задаваемые вопросы
            </div>
            <Accordion mode={"faq"} />
          </div>

          <OtherProducts />

          <Footer resolution={resolution} />
        </div>
      </div>

      <div className="back color dark" />

      <LoginIdPopup />

      {bannerCookieName && banner && (
        <AdBanner cookieName={bannerCookieName} banner={banner} />
      )}
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  const banners: TAdBanner[] = []

  const getBannerClosedCookie = (name: string) =>
    `banner ${name} closed`.replaceAll(" ", "_")
  const getCurrentBanner = async () => {
    const bs = banners.filter(
      (banner) =>
        new Date() >= new Date(banner.start) &&
        new Date() <= new Date(banner.end) &&
        !getCookie(getBannerClosedCookie(banner.name), context)
    )
    return bs.at(0) || null
  }

  const banner = await getCurrentBanner()
  const cookieName = banner ? getBannerClosedCookie(banner.name) : ""

  return { props: { banner, bannerCookieName: cookieName } }
}
