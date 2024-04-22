import React, { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

import { testimonialsData } from "@/data/testimonials"

import { useSwiperReactive } from "@/hooks/useSwiperReactive"

import styles from "./Testimonials.module.scss"

import { Resolution } from "@/types/resolution"

const Testimonials = ({ resolution }: { resolution: Resolution }) => {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className={styles.container} id="testimonials">
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы</h2>
        <div className={styles.navigation}>
          <button
            className={styles.arrow_btn}
            onClick={() => {
              if (activeIndex === 0) {
                if (resolution === "md" || resolution == "sm") {
                  swiperRef.current.swiper.slideTo(testimonialsData.length - 1)
                } else {
                  swiperRef.current.swiper.slideTo(
                    testimonialsData.length - 1 - 2
                  )
                }
              } else {
                swiperRef.current.swiper.slidePrev()
              }
            }}
          >
            <Arrow className={styles.arrow_prev} />
          </button>
          <button
            className={styles.arrow_btn}
            onClick={() => {
              if (activeIndex === testimonialsData.length - 1) {
                swiperRef.current.swiper.slideTo(0)
              } else {
                swiperRef.current.swiper.slideNext()
              }
            }}
          >
            <Arrow className={styles.arrow_next} />
          </button>
        </div>
      </div>

      <Swiper
        // @ts-ignore
        ref={swiperRef}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className={styles.swiper}
        wrapperClass={styles.swiper_wrapper}
        rewind={true}
      >
        {testimonialsData.map((testimonial, i) => (
          <SwiperSlide className={styles.slide} key={i}>
            <TestimonialsItem {...testimonial} cardIndex={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonials

const TestimonialsItem = ({
  avatar,
  date,
  link,
  name,
  text,
  cardIndex,
  isNew
}: {
  avatar: any
  name: string
  text: string
  date: string
  link: string
  cardIndex: number
  isNew?: boolean
}) => {
  const swiper = useSwiperReactive()
  // const formatedText = text.length > 225 ? text.slice(0, 225) + "..." : text

  return (
    <div
      className={styles.testimonial}
      style={{
        opacity:
          cardIndex < swiper.activeIndex
            ? 0
            : cardIndex > swiper.activeIndex + 2
            ? 0.5
            : 1,
      }}
    >
      <div className={styles.testimonial_header}>
        {avatar === null ? (
          <div className={styles.avatar}>{`${name[0]}${name[1]}`}</div>
        ) : typeof avatar === "string" ? (
          <div className={styles.avatar}>{`${name[0]}`}</div>
        ) : (
          <Image
            src={avatar}
            alt="avatar"
            width={48}
            height={48}
            style={{ borderRadius: "50%" }}
          />
        )}
        <span className={styles.name}>{name}</span>
        {isNew && (
          <div className={styles.new}>NEW</div>
        )}
      </div>
      <p className={styles.testimonial_text}>{text}</p>
      <div className={styles.testimonial_footer}>
        <span className={styles.date}>{date}</span>
        <a href={link} target="_blank" className={styles.link}>
          Читать полностью
        </a>
      </div>
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
