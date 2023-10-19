import React, { useRef, useState } from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import Image from "next/image"
import clsx from "clsx"

import { testimonialsData } from "@/data/testimonials"

import { useSwiperReactive } from "@/hooks/useSwiperReactive"

import styles from "./Testimonials.module.scss"

const Testimonials = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы</h2>
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
              activeIndex === testimonialsData.length - 1 &&
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
}: {
  avatar: any
  name: string
  text: string
  date: string
  link: string
  cardIndex: number
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
