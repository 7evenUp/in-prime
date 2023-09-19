import React from "react"
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
} from "./Icons"

import styles from "./Features.module.scss"

import {data as featuresData} from "@/data/features"

const Features = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Что входит в подписку</h2>
      <FeaturesTabs />
    </section>
  )
}

export default Features

const FeaturesTabs = () => {
  return (
    <Tabs.Root
      className={styles.TabsRoot}
      defaultValue="tab1"
      orientation="vertical"
    >
      <Tabs.List className={styles.TabsList} aria-label="Prime Features">
        <Tabs.Trigger className={styles.TabsTrigger} value="tab1">
          <div>
            <CalendarIcon />
            <CalendarIconGradient />
            <span>Календарь по заработку</span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
          <div>
            <ContentIcon />
            <ContentIconGradient />
            <span>Экспертный контент</span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab3">
          <div>
            <ChatIcon />
            <ChatIconGradient />
            <span>Чат и дружное комьюнити</span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab4">
          <div>
            <MeetupsIcon />
            <MeetupsIconGradient />
            <span>Онлайн встречи и практика</span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab5">
          <div>
            <HelperIcon />
            <HelperIconGradient />
            <span>Личный помощник</span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger className={styles.TabsTrigger} value="tab6">
          <div>
            <GuaranteeIcon />
            <GuaranteeIconGradient />
            <span>Гарантия прибыли</span>
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={styles.TabsContent} value="tab1">
        <Slider data={featuresData.calendar} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab2">
        <Slider data={featuresData.content} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab3">
        <Slider data={featuresData.chat} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab4">
        <Slider data={featuresData.meetups} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab5">
        <Slider data={featuresData.guarantee} />
      </Tabs.Content>
      <Tabs.Content className={styles.TabsContent} value="tab6">
        <Slider data={featuresData.helper} />
      </Tabs.Content>
    </Tabs.Root>
  )
}

const Slider = ({
  data,
}: {
  data: Array<{ imgSrc: StaticImageData; description: string }>
}) => {
  return (
    <Swiper
      slidesPerView={1}
      style={{ width: 700 }}
      className={styles.swiper}
      wrapperClass={styles.swiper_wrapper}
    >
      {data.map(({ imgSrc, description }, i) => (
        <SwiperSlide key={description}>
          {({ isActive }) => (
            <div
              className={styles.swiper_slide}
              style={{ opacity: isActive ? 1 : 0 }}
            >

              <Image
                src={imgSrc}
                alt={`Image of: ${description}`}
                quality={100}
              />
              <p className={styles.description}>{description}</p>
            </div>
          )}
        </SwiperSlide>
      ))}

      <Navigation />
      <Pagination amount={data.length} />
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
