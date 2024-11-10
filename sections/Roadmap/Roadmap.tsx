import React, { useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"

// Данные для отрисовки
import { data as roadmapData } from "@/data/roadmap"

import { Dot, DotCurrent } from "./Dots"

import styles from "./Roadmap.module.scss"

import { Resolution } from "@/types/resolution"
import { VerticalDoneLines, VerticalLines } from "./Lines"

const Roadmap = ({ resolution }: { resolution: Resolution }) => {
  return (
    <section className={styles.container} id="roadmap">
      <h2 className={styles.title}>Наш план по заработку $150 000+</h2>

      <span className={styles.subtitle}>
        событий в Prime, на которых уже заработали или ожидаем <br /> заработок
        в будущем
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
                  isBottom
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
  isBottom,
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
  isBottom?: boolean
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
      {/* {isDone ? <VerticalDoneLines /> : <VerticalLines />} */}
      {isCurrent ? <DotCurrent /> : <Dot />}
      <div
        className={clsx(
          styles.map_item_content,
          showDescription && styles.map_item_content__descOpen,
          isBottom && styles.map_item_content__descOpen__reversed,
          isCurrent && styles.map_item_content__current
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

          <div
            className={clsx(
              styles.map_item_earned,
              isCurrent && styles.current
            )}
          >
            {earned ? <b>{earned}</b> : "????"}
          </div>
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
        <div
          className={clsx(
            styles.map_item_content_arrow,
            isBottom && styles.map_item_content_arrow_reversed,
            isCurrent && styles.map_item_content_arrow_current
          )}
        >
          <svg
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 12L0.607694 -5.0249e-08L21.3923 1.7668e-06L11 12Z"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* <div
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
      </div> */}

      {/* {isCurrent && <span className={styles.we_are_here}>Мы здесь</span>} */}
    </div>
  )
}
