"use client"
import React from "react"

import Countdown from "@/components/countdown"

import styles from "./TimerPromo.module.scss"

const endDate = 1732913999000

const TimerPromo = () => {
  return (
    <>
      <div className={styles.timer} id="gifts">
        <div className={styles.timer__time}>
          <div className={styles.timer__time__image} />
          <h1 className={styles.timer__title}>
            Максимальные скидки 1 раз в год!
          </h1>

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
        {/* <div className={styles.timer__bg} /> */}
      </div>
      <div id="subscriber1123" className={styles.timer__subscriber}>
        .
      </div>
    </>
  )
}

export default TimerPromo
