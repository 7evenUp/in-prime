import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

import { testimonialsData } from "@/data/testimonials"

import styles from "./Testimonials.module.scss"
import { useSwiperReactive } from "@/hooks/useSwiperReactive"

const Testimonials = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы</h2>
        <div>
          <button>ArrowLeft</button>
          <button>ArrowRight</button>
        </div>
      </div>

      <Swiper
        style={{ width: 442 }}
        slidesPerView={1}
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
  cardIndex
}: {
  avatar: any
  name: string
  text: string
  date: string
  link: string
  cardIndex: number
}) => {
  const swiper = useSwiperReactive()
  const formatedText = text.length > 225 ? text.slice(0, 225) + "..." : text

  return (
    <div className={styles.testimonial} style={{opacity: cardIndex < swiper.activeIndex ? 0 : 1}}>
      <div className={styles.testimonial_header}>
        <Image src={avatar} alt="avatar" width={48} height={48} />
        <span className={styles.name}>{name}</span>
      </div>
      <p className={styles.testimonial_text}>{formatedText}</p>
      <div className={styles.testimonial_footer}>
        <span className={styles.date}>{date}</span>
        <a href={link} target="_blank" className={styles.link}>
          Читать полностью
        </a>
      </div>
    </div>
  )
}
