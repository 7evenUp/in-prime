import React, { useRef } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"

import Slide1Lg from "@/public/images/png/achievements/slide-1-lg.png"
import Slide2Lg from "@/public/images/png/achievements/slide-2-lg.png"
import Slide1Md from "@/public/images/png/achievements/slide-1-md.png"
import Slide2Md from "@/public/images/png/achievements/slide-2-md.png"
import Slide1Sm from "@/public/images/png/achievements/slide-1-sm.png"
import Slide2Sm from "@/public/images/png/achievements/slide-2-sm.png"
import Slide3Sm from "@/public/images/png/achievements/slide-3-sm.png"
import Slide4Sm from "@/public/images/png/achievements/slide-4-sm.png"

import styles from "./Achievements.module.scss"

import { Resolution } from "@/types/resolution"

const Achievements = ({ resolution }: { resolution: Resolution }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  return (
    <section className={styles.container} id="achievements">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Достижения участников</h2>
        <p className={styles.title_description}>
          Отзывы о победах и знаниях, полученных в Prime
        </p>

        <div className={styles.navigation}>
          <button
            className={styles.arrow_btn}
            onClick={() => emblaApi.scrollPrev()}
          >
            <Arrow className={styles.arrow_prev} />
          </button>
          <button
            className={styles.arrow_btn}
            onClick={() => emblaApi.scrollNext()}
          >
            <Arrow className={styles.arrow_next} />
          </button>
        </div>

        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.embla__container}>
            {resolution === "sm" && (
              <>
                <div className={styles.embla__slide}>
                  <Image src={Slide1Sm} alt="" className={styles.image} />
                </div>
                <div className={styles.embla__slide}>
                  <Image src={Slide2Sm} alt="" className={styles.image} />
                </div>
                <div className={styles.embla__slide}>
                  <Image src={Slide3Sm} alt="" className={styles.image} />
                </div>
                <div className={styles.embla__slide}>
                  <Image src={Slide4Sm} alt="" className={styles.image} />
                </div>
              </>
            )}
            {resolution === "md" && (
              <>
                <div className={styles.embla__slide}>
                  <Image src={Slide1Md} alt="" className={styles.image} />
                </div>
                <div className={styles.embla__slide}>
                  <Image src={Slide2Md} alt="" className={styles.image} />
                </div>
              </>
            )}
            {(resolution === "lg" || resolution === "lgg") && (
              <>
                <div className={styles.embla__slide}>
                  <Image src={Slide1Lg} alt="" className={styles.image} />
                </div>
                <div className={styles.embla__slide}>
                  <Image src={Slide2Lg} alt="" className={styles.image} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements

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
