import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import styles from "./Achievements.module.scss"

import { Resolution } from "@/types/resolution"

const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"

interface AchievementsData {
  id: number
  image: string
  imageSize: {
    id: "small" | "medium" | "large"
    label: "Small" | "Medium" | "Large"
  }
  isActive: boolean
  order: number
}

const Achievements = ({ resolution }: { resolution: Resolution }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const response = await axios.get<AchievementsData[]>(
        ID_URL + "landing/participant-achievements/"
      )

      return response.data
        .sort((a, b) => a.order - b.order)
        .filter((el) => el.isActive)
    },
  })

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

        {isLoading ? (
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              <div className={styles.skeleton} />
            </div>
          </div>
        ) : (
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {achievements.map((achievement) => {
                let neededAchievement: AchievementsData | null = null

                if (
                  resolution === "sm" &&
                  achievement.imageSize.id === "small"
                ) {
                  neededAchievement = achievement
                }
                if (
                  resolution === "md" &&
                  achievement.imageSize.id === "medium"
                ) {
                  neededAchievement = achievement
                }
                if (
                  (resolution === "lg" || resolution === "lgg") &&
                  achievement.imageSize.id === "large"
                ) {
                  neededAchievement = achievement
                }

                if (neededAchievement !== null) {
                  return (
                    <div key={achievement.id} className={styles.embla__slide}>
                      <img
                        src={neededAchievement.image}
                        alt=""
                        className={styles.image}
                      />
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )}
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
