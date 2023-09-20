import React from "react"
import Image from "next/image"

import metamaskSrc from "@/public/images/svg/roadmap/metamask.svg"

import styles from "./Roadmap.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"

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
  return (
    <div className={styles.map_wrapper}>
      <div className={styles.map}>
        <Swiper slidesPerView={2} style={{width: 680}}>
          <SwiperSlide>
            <MapItem />
          </SwiperSlide>
          <SwiperSlide>
            <MapItem />
          </SwiperSlide>
          <SwiperSlide>
            <MapItem />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.mid_line} />
    </div>
  )
}

const MapItem = () => {
  return (
    <div className={styles.map_item}>
      <div className={styles.map_item_img_wrapper}>
        <Image
          src={metamaskSrc}
          alt="Project image"
          className={styles.map_item_img}
        />
        
      </div>
      <span className={styles.map_item_title}>Ретродроп от Metamask</span>
    </div>
  )
}
