import React, { useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"

// Данные для отрисовки
import { data as roadmapData } from "@/data/roadmap"

import { VerticalDoneLines, VerticalLines } from "./Lines"

import styles from "./Roadmap.module.scss"

import { Resolution } from "@/types/resolution"

const Roadmap = ({ resolution }: { resolution: Resolution }) => {
  return (
    <section className={styles.container} id="roadmap">
      <h2 className={styles.title}>Дорожная карта по заработку</h2>

      <span className={styles.subtitle}>
        События в Prime, на которых уже заработали или ожидаем заработок в
        будущем.
      </span>

      <Map resolution={resolution} />
    </section>
  )
}

export default Roadmap

const Map = ({ resolution }: { resolution: Resolution }) => {
  const currentSlide = roadmapData.findIndex((el) => el.top.isCurrent)

  return (
    <div className={styles.map_wrapper}>
      <div className={styles.mid_line} />
      <div className={styles.map}>
        <Swiper
          slidesPerView={1}
          initialSlide={currentSlide}
          className={styles.swiper}
        >
          {roadmapData.map(({ top, bottom }, i) => (
            <SwiperSlide className={styles.slide} key={i}>
              <MapItem
                {...top}
                className={styles.map_item__top}
                resolution={resolution}
              />
              {bottom ? (
                <MapItem
                  {...bottom}
                  className={styles.map_item__bottom}
                  resolution={resolution}
                />
              ) : null}
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
  isBlured,
  description,
  earned,
  isCurrent,
  className,
  resolution,
}: {
  imgSrc: any
  title: string
  isDone: boolean
  isBlured?: boolean
  earned?: number | string
  description: string
  isCurrent?: boolean
  className?: string
  resolution: Resolution
}) => {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div
      className={clsx(
        styles.map_item,
        className,
        isDone && styles.map_item__done
      )}
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      onClick={() =>
        resolution === "sm" && setShowDescription(!showDescription)
      }
    >
      {isDone ? <VerticalDoneLines /> : <VerticalLines />}

      <div
        className={clsx(
          styles.map_item_content,
          showDescription && styles.map_item_content__descOpen
        )}
      >
        <div className={styles.map_item_content_row}>
          <div className={styles.map_item_img_wrapper}>
            <Image
              src={imgSrc}
              alt="Project image"
              className={clsx(isBlured && styles.blur)}
            />
          </div>
          <span
            className={clsx(styles.map_item_title, isBlured && styles.blur)}
          >
            {title}
          </span>
          <button
            className={clsx(
              styles.map_item_arrow,
              showDescription && styles.map_item_arrow_rotated
            )}
            onClick={() => setShowDescription(!showDescription)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.20921 8.90711L10.5187 16.0324C10.6471 16.1575 10.8193 16.2275 10.9986 16.2275C11.1779 16.2275 11.3501 16.1575 11.4785 16.0324L18.7907 8.90711C18.8506 8.84881 18.8982 8.77911 18.9307 8.70213C18.9632 8.62514 18.9799 8.54242 18.9799 8.45886C18.9799 8.37529 18.9632 8.29258 18.9307 8.21559C18.8982 8.1386 18.8506 8.0689 18.7907 8.01061C18.6679 7.89068 18.5031 7.82353 18.3315 7.82353C18.1598 7.82353 17.995 7.89068 17.8722 8.01061L10.9986 14.711L4.12633 8.01061C4.00361 7.89109 3.83907 7.82421 3.66777 7.82421C3.49646 7.82421 3.33193 7.89109 3.20921 8.01061C3.14933 8.0689 3.10175 8.1386 3.06925 8.21559C3.03676 8.29258 3.02002 8.37529 3.02002 8.45886C3.02002 8.54242 3.03676 8.62514 3.06925 8.70213C3.10175 8.77912 3.14933 8.84881 3.20921 8.90711Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div
          className={clsx(
            styles.collapse,
            showDescription && styles.collapse_open,
            isDone && styles.collapse_done
          )}
        >
          <p style={{ minHeight: 0 }}>{description}</p>
        </div>
      </div>

      <div
        className={clsx(
          styles.map_item_price_wrapper,
          showDescription && styles.map_item_price_wrapper__descOpen
        )}
      >
        <span className={styles.map_item_price}>
          {earned ? (
            <>
              Заработано: <b>{earned}</b>
            </>
          ) : (
            "????"
          )}
        </span>
      </div>

      {isCurrent && <span className={styles.we_are_here}>Мы здесь</span>}
    </div>
  )
}
