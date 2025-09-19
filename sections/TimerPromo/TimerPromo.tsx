"use client"
import React from "react"

import Countdown from "@/components/countdown"

import styles from "./TimerPromo.module.scss"

// 2025-09-28T23:59:00
const endDate = 1759093140000

const TimerPromo = () => {
  return (
    <div className={styles.timer} id="gifts">
      <h2 className={styles.timer__time__text}>До конца акции осталось:</h2>
      <Countdown
        className={styles.timer__time__progress}
        date={endDate}
        classNameNumber={styles.timer__time__progress__date}
      />
      <div className={styles.timer__time__progress__sub}>
        <span>дня</span>
        <span>часов</span>
        <span>минут</span>
      </div>
    </div>
  )
}

export default TimerPromo
