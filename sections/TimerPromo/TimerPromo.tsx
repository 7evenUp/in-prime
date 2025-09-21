"use client"
import React, { useMemo } from "react"

import Countdown from "@/components/countdown"

import styles from "./TimerPromo.module.scss"

// 2025-09-28T20:59:59Z
const endDate = 1759093199000

const TimerPromo = () => {
  const difference = endDate - new Date().getTime()

  const days = useMemo(() => {
    if (difference <= 0) return 0
    return Math.floor(difference / (1000 * 60 * 60 * 24))
  }, [difference])

  const hours = useMemo(() => {
    if (difference <= 0) return 0

    return Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  }, [difference])
  const minutes = useMemo(() => {
    if (difference <= 0) return 0

    return Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  }, [difference])

  return (
    <div className={styles.timer} id="gifts">
      <h2 className={styles.timer__time__text}>До конца акции осталось:</h2>
      <Countdown
        className={styles.timer__time__progress}
        date={endDate}
        classNameNumber={styles.timer__time__progress__date}
      />
      <div className={styles.timer__time__progress__sub}>
        <span>
          {days === 0
            ? "дней"
            : days === 1
            ? "день"
            : days < 5
            ? "дня"
            : "дней"}
        </span>
        <span>
          {hours === 0
            ? "часов"
            : hours === 1
            ? "час"
            : hours < 5 || hours === 22 || hours === 23 || hours === 24
            ? "часа"
            : "часов"}
        </span>
        <span>
          {minutes === 0
            ? "минут"
            : minutes === 1 || minutes === 21
            ? "минута"
            : minutes < 5 || minutes === 22 || minutes === 23 || minutes === 24
            ? "минуты"
            : "минут"}
        </span>
      </div>
    </div>
  )
}

export default TimerPromo
