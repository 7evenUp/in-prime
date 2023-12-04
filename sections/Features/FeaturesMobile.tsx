import React, { useState } from "react"
import Image, { StaticImageData } from "next/image"
import * as Tabs from "@radix-ui/react-tabs"
import { Swiper, SwiperSlide } from "swiper/react"

import { useSwiperReactive } from "@/hooks/useSwiperReactive"

import {
  CalendarIcon,
  CalendarIconGradient,
  ChatIcon,
  ChatIconGradient,
  ContentIcon,
  ContentIconGradient,
  GuaranteeIcon,
  GuaranteeIconGradient,
  HelperIcon,
  HelperIconGradient,
  MeetupsIcon,
  MeetupsIconGradient,
  InvestingIcon,
  InvestingIconGradient
} from "./Icons"

import styles from "./Features.module.scss"

import { data as featuresData } from "@/data/features"

import { Resolution } from "@/types/resolution"
import { makeDescrLink } from "./Features"

const swiperWidth = {
  lgg: 700,
  lg: 621,
  md: "100%",
  sm: "100%",
}

const FeaturesMobile = ({ resolution }: { resolution: Resolution }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Что входит в подписку</h2>
      <FeaturesTabs resolution={resolution} />
    </section>
  )
}


export default FeaturesMobile

const FeaturesTabs = ({ resolution }: { resolution: Resolution }) => {
  const [openFaq, setOpenFaq] = useState(1)

  function toggle(current) {
    if (current == openFaq) {
      setOpenFaq(-1)
    } else {
      setOpenFaq(current)
    }
  }
  const checkOpened = (id: number) => id === openFaq ? true : false
  const checkOpenedState = (id: number) => id === openFaq ? "active" : ""

  return (
    <div className={styles.TabsRoot}>
      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(1)}
        aria-expanded={checkOpened(1)}
        data-state={checkOpenedState(1)}
      >
        <div className={styles.trigger_container}>
          <div className={styles.icon_wrapper}>
            <CalendarIcon />
            <CalendarIconGradient />
          </div>
          <span>Календарь по заработку</span>
        </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(1)}
      >
        <Slider opened={checkOpened(1)} data={featuresData.calendar} resolution={resolution} />
      </div>

      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(2)}
        aria-expanded={checkOpened(2)}
        data-state={checkOpenedState(2)}
      >
        <div className={styles.trigger_container}>
          <div className={styles.icon_wrapper}>
            <ContentIcon />
            <ContentIconGradient />
          </div>
          <span>Экспертный контент</span>
        </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(2)}
      >
        <Slider opened={checkOpened(2)}  data={featuresData.content} resolution={resolution} />
      </div>

      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(3)}
        aria-expanded={checkOpened(3)}
        data-state={checkOpenedState(3)}
      >
        <div className={styles.trigger_container}>
          <div className={styles.icon_wrapper}>
            <ChatIcon />
            <ChatIconGradient />
          </div>
          <span>Чат и дружное комьюнити</span>
        </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(3)}
      >
        <Slider opened={checkOpened(3)}  data={featuresData.chat} resolution={resolution} />
      </div>

      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(4)}
        aria-expanded={checkOpened(4)}
        data-state={checkOpenedState(4)}
      >
        <div className={styles.trigger_container}>
          <div className={styles.icon_wrapper}>
            <MeetupsIcon />
            <MeetupsIconGradient />
          </div>
          <span>Онлайн встречи и практика</span>
        </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(4)}
      >
        <Slider opened={checkOpened(4)}  data={featuresData.meetups} resolution={resolution} />
      </div>

      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(5)}
        aria-expanded={checkOpened(5)}
        data-state={checkOpenedState(5)}
      >
        <div className={styles.trigger_container}>
          <div className={styles.icon_wrapper}>
            <HelperIcon />
            <HelperIconGradient />
          </div>
          <span>Личный помощник</span>
        </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(5)}
      >
        <Slider opened={checkOpened(5)}  data={featuresData.helper} resolution={resolution} />
      </div>

      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(6)}
        aria-expanded={checkOpened(6)}
        data-state={checkOpenedState(6)}
      >
        <div className={styles.trigger_container}>
             <div className={styles.icon_wrapper}>
               <GuaranteeIcon />
               <GuaranteeIconGradient />
             </div>
             <span>Гарантия прибыли</span>
           </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(6)}
      >
        <Slider opened={checkOpened(6)}  data={featuresData.guarantee} resolution={resolution} />
      </div>

      <div
        className={styles.TabsTrigger}
        onClick={() => toggle(7)}
        aria-expanded={checkOpened(7)}
        data-state={checkOpenedState(7)}
      >
        <div className={styles.trigger_container}>
             <div className={styles.icon_wrapper}>
              <InvestingIcon />
              <InvestingIconGradient />
             </div>
             <span>Инвестируем за вас</span>
           </div>
      </div>
      <div
        className={`accordion__content faq`}
        aria-expanded={!checkOpened(7)}
      >
        <Slider opened={checkOpened(7)}  data={featuresData.investing} resolution={resolution} />
      </div>
    </div>
  )
}

const Slider = ({
  data,
  resolution,
  opened
}: {
  data: Array<{ imgSrc: StaticImageData; description: string }>
  resolution: Resolution,
  opened: boolean
}) => {
  return (
    <Swiper
      slidesPerView={1}
      style={{ width: swiperWidth[resolution] }}
      className={styles.swiper}
    >
      {data.map(({ imgSrc, description }) => (
        <SwiperSlide key={description} className={styles.swiper_slide_wrapper}>
          {({ isActive }) => (
            <div
              className={styles.swiper_slide}
              style={{ opacity: isActive ? 1 : 0 }}
            >
              <Image
                className={styles.swiper_image}
                src={imgSrc}
                alt={`Image of: ${description}`}
                quality={100}
              />
              <Pagination amount={data.length} />
              {/* <p className={styles.description}>{description}</p> */}
              {makeDescrLink(description)}
            </div>
          )}
        </SwiperSlide>
      ))}

      <Navigation />
      
    </Swiper>
  )
}

const Navigation = () => {
  const swiper = useSwiperReactive()

  return (
    <>
      <button
        className={`${styles.swipe_btn} ${styles.swipe_btn__prev}`}
        style={{ display: swiper.activeIndex === 0 ? "none" : "block" }}
        onClick={() => swiper.slidePrev()}
      >
        <ArrowLeft />
      </button>
      <button
        className={`${styles.swipe_btn} ${styles.swipe_btn__next}`}
        style={{
          display:
            swiper.activeIndex === swiper.slides.length - 1 ? "none" : "block",
        }}
        onClick={() => swiper.slideNext()}
      >
        <ArrowRight />
      </button>
    </>
  )
}

const Pagination = ({ amount }: { amount: number }) => {
  const swiper = useSwiperReactive()

  return (
    <div className={styles.pagination}>
      {new Array(amount).fill(null).map((_, i) => (
        <button
          key={i}
          className={styles.pagination_button}
          onClick={() => swiper.slideTo(i)}
          style={{
            background: swiper.activeIndex === i ? "white" : "transparent",
          }}
        />
      ))}
    </div>
  )
}

const ArrowLeft = () => (
  <svg
    width="15"
    height="28"
    viewBox="0 0 15 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.4244 26.748L0.764946 14.787C0.560164 14.5769 0.445556 14.2952 0.445555 14.0018C0.445555 13.7084 0.560164 13.4266 0.764945 13.2165L12.4244 1.25104C12.5198 1.15307 12.6339 1.0752 12.7599 1.02203C12.8858 0.968858 13.0212 0.941464 13.1579 0.941464C13.2947 0.941464 13.43 0.968858 13.556 1.02203C13.682 1.0752 13.7961 1.15307 13.8914 1.25104C14.0877 1.45196 14.1976 1.72168 14.1976 2.00254C14.1976 2.2834 14.0877 2.55312 13.8914 2.75404L2.9272 14.0018L13.8914 25.2473C14.087 25.4481 14.1965 25.7173 14.1965 25.9977C14.1965 26.278 14.087 26.5472 13.8914 26.748C13.7961 26.846 13.682 26.9239 13.556 26.9771C13.43 27.0302 13.2947 27.0576 13.1579 27.0576C13.0212 27.0576 12.8859 27.0302 12.7599 26.9771C12.6339 26.9239 12.5198 26.846 12.4244 26.748Z"
      fill="currentColor"
    />
  </svg>
)

const ArrowRight = () => (
  <svg
    width="15"
    height="28"
    viewBox="0 0 15 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.57555 26.748L14.2351 14.787C14.4398 14.5769 14.5544 14.2952 14.5544 14.0018C14.5544 13.7084 14.4398 13.4266 14.2351 13.2165L2.57555 1.25104C2.48016 1.15307 2.36611 1.0752 2.24013 1.02203C2.11415 0.968858 1.9788 0.941464 1.84206 0.941464C1.70531 0.941464 1.56996 0.968858 1.44398 1.02203C1.318 1.0752 1.20395 1.15307 1.10856 1.25104C0.912304 1.45196 0.802435 1.72168 0.802435 2.00254C0.802435 2.2834 0.912304 2.55312 1.10856 2.75404L12.0728 14.0018L1.10855 25.2473C0.912975 25.4481 0.803532 25.7173 0.803532 25.9977C0.803532 26.278 0.912975 26.5472 1.10855 26.748C1.20394 26.846 1.318 26.9239 1.44397 26.9771C1.56995 27.0302 1.70531 27.0576 1.84205 27.0576C1.97879 27.0576 2.11415 27.0302 2.24013 26.9771C2.36611 26.9239 2.48016 26.846 2.57555 26.748Z"
      fill="currentColor"
    />
  </svg>
)
