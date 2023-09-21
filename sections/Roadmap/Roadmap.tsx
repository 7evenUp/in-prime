import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"

// Данные для отрисовки
import { data as roadmapData } from "@/data/roadmap"

import { VerticalDoneLines, VerticalLines } from "./Lines"

import styles from "./Roadmap.module.scss"

const Roadmap = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Дорожная карта по заработку</h2>

      <span className={styles.subtitle}>
        событий в Prime, на которых уже заработали и тех, на которых планируем
        заработать
      </span>

      <Map />
    </section>
  )
}

export default Roadmap

const Map = () => {
  const currentSlide = roadmapData.findIndex((el => el.top.isCurrent))
  
  return (
    <div className={styles.map_wrapper}>
      <div className={styles.mid_line} />
      <div className={styles.map}>
        <Swiper
          slidesPerView={1}
          initialSlide={currentSlide}
          style={{ width: 440 }}
          className={styles.swiper}
          wrapperClass={styles.swiper_wrapper}
        >
          {roadmapData.map(({ top, bottom }, i) => (
            <SwiperSlide className={styles.slide} key={i}>
              <MapItem {...top} className={styles.map_item__top} />
              <MapItem {...bottom} className={styles.map_item__bottom} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

const MapItem = ({
  imgSrc,
  title,
  isDone,
  isCurrent,
  className,
}: {
  imgSrc: any
  title: string
  isDone: boolean
  isCurrent?: boolean
  className?: string
}) => {
  return (
    <div
      className={clsx(
        styles.map_item,
        className,
        isDone && styles.map_item__done
      )}
    >
      {isDone ? <VerticalDoneLines /> : <VerticalLines />}

      <div className={styles.map_item_content}>
        <div className={styles.map_item_img_wrapper}>
          <Image
            src={imgSrc}
            alt="Project image"
          />
        </div>
        <span className={styles.map_item_title}>{title}</span>
      </div>
      <div className={styles.map_item_price_wrapper}>
        <span className={styles.map_item_price}>
          Заработано: <b>$2000</b>
        </span>
      </div>

      {isCurrent && <span className={styles.we_are_here}>Мы здесь</span>}
    </div>
  )
}
