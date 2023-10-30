import React, { useRef, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import clsx from "clsx"

import HistoriesImage from "@/public/images/png/histories/histories.png"
import TelegramIcon from "@/public/images/png/histories/telegram.svg"

import { useSwiperReactive } from "@/hooks/useSwiperReactive"

import { historiesData } from "@/data/histories"

import Modal from "./Modal/Modal"

import styles from "./Histories.module.scss"

const Histories = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className={styles.container} id="histories">
      <div className={styles.header}>
        <h2 className={styles.title}>Истории успеха</h2>
        <div className={styles.navigation}>
          <button
            className={clsx(
              styles.arrow_btn,
              activeIndex === 0 && styles.arrow_btn_disabled
            )}
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <Arrow className={styles.arrow_prev} />
          </button>
          <button
            className={clsx(
              styles.arrow_btn,
              activeIndex === historiesData.length - 1 &&
                styles.arrow_btn_disabled
            )}
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <Arrow className={styles.arrow_next} />
          </button>
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className={styles.swiper}
        wrapperClass={styles.swiper_wrapper}
      >
        {historiesData.map((history, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <HistoryCard {...history} cardIndex={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Histories

const HistoryCard = ({
  cardIndex,
  avatar,
  description,
  historyDataHTML,
  historyTitle,
  name,
  telegramLink,
  telegramUsername,
  timeWithPrime,
  picture,
}: {
  cardIndex: number
  avatar: StaticImageData
  picture: StaticImageData
  name: string
  timeWithPrime: string
  description: string
  telegramUsername: string
  telegramLink: string
  historyTitle: string
  historyDataHTML: string
}) => {
  const swiper = useSwiperReactive()

  return (
    <div
      className={styles.card_wrapper}
      style={{ opacity: cardIndex === swiper.activeIndex ? 1 : 0 }}
    >
      <div className={styles.card}>
        <div className={styles.card_header}>
          <Image src={avatar} alt="Avatar" className={styles.card_avatar} style={{borderRadius: '50%'}}/>
          <div className={styles.card_header_info}>
            <span className={styles.card_name}>{name}</span>
            <span className={styles.card_time}>{timeWithPrime}</span>
          </div>
        </div>
        <p className={styles.card_description}>{description}</p>
        <div className={styles.card_buttons}>
          <Modal title={historyTitle} textHtml={historyDataHTML}>
            <button className={styles.card_button}>Читать историю</button>
          </Modal>
          <a href={telegramLink} target="_blank" className={styles.card_button}>
            <Image
              src={TelegramIcon}
              alt="Telegram icon"
              className={styles.card_tg}
            />
            {telegramUsername}
          </a>
        </div>
      </div>
      <Image
        src={picture}
        alt="Истории успеха"
        className={styles.histories_image}
      />
    </div>
  )
}

const Arrow = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="41"
    height="14"
    viewBox="0 0 41 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.7172 1L39.374 6.65685L33.7172 12.3137"
      stroke="white"
      strokeWidth="2"
    />
    <path d="M38.4 6.7168H0" stroke="white" strokeWidth="2" />
  </svg>
)
