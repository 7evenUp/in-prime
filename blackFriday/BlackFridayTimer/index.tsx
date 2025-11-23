import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"

import styles from "./styles.module.css"
import PreviousGifts from "./PreviousGifts"

const img_urls = [
  "Iphone",
  "Macbook",
  "PS 5",
  "Steam",
  "Airpods",
  "Apple Watch",
  "Ledger",
  "Dolphin",
  "Tangem",
  "Safepal",
  "Scarf",
  "Sweater",
  "TG Premium",
  "ID",
  "TG Stars",
]

const BlackFridayTimer = () => {
  // "2025-11-29T21:00:00Z"
  const targetDate = 1764450000000 // конечная дата в мс

  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "0",
    minutes: "0",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = targetDate - now

      if (diff <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: "00", hours: "00", minutes: "00" })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)

      setTimeLeft({
        days: `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Какие подарки внутри бокса?</h2>

      <Image
        className={styles.image}
        src="/images/black-friday/black-friday-opened-gift.png"
        alt="Opened white box"
        width={549}
        height={358}
      />

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className={styles.button}>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6637 15C9.89389 16.3333 7.96939 16.3333 7.19959 15L0.271387 3C-0.498414 1.66667 0.463836 1.17996e-07 2.00344 2.52592e-07L15.8598 1.46396e-06C17.3994 1.59855e-06 18.3617 1.66667 17.5919 3L10.6637 15Z"
                fill="#222222"
              />
            </svg>
            Разверни и узнай
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.Overlay} />
          <Dialog.Content className={styles.Content}>
            <Dialog.Title className={styles.Title}>
              Бокс с подарками
            </Dialog.Title>
            <Dialog.Description className={styles.Description}>
              Вы можете получить любой из этих крутых призов
            </Dialog.Description>

            <div className={styles.dialog_boxes}>
              {img_urls.map((img, i) => (
                <img key={i} src={`/images/black-friday/gifts/${img}.png`} />
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className={styles.timer_wrapper}>
        <p className={styles.timer_title}>До конца акции осталось:</p>
        <div className={styles.time_row}>
          <div className={styles.time_col}>
            <span>{timeLeft.days}</span>
            <span>
              {timeLeft.days === "0"
                ? "дней"
                : timeLeft.days === "1"
                ? "день"
                : parseInt(timeLeft.days) < 5
                ? "дня"
                : "дней"}
            </span>
          </div>
          <div className={styles.time_col}>
            <span>:</span>
          </div>
          <div className={styles.time_col}>
            <span>{timeLeft.hours}</span>
            <span>
              {timeLeft.hours === "0"
                ? "часов"
                : timeLeft.hours === "1"
                ? "час"
                : parseInt(timeLeft.hours) < 5 ||
                  parseInt(timeLeft.hours) === 22 ||
                  parseInt(timeLeft.hours) === 23 ||
                  parseInt(timeLeft.hours) === 24
                ? "часа"
                : "часов"}
            </span>
          </div>
          <div className={styles.time_col}>
            <span>:</span>
          </div>
          <div className={styles.time_col}>
            <span>{timeLeft.minutes}</span>
            <span>
              {timeLeft.minutes === "0"
                ? "минут"
                : timeLeft.minutes === "1" || timeLeft.minutes === "21"
                ? "минута"
                : parseInt(timeLeft.minutes) < 5 ||
                  parseInt(timeLeft.minutes) === 22 ||
                  parseInt(timeLeft.minutes) === 23 ||
                  parseInt(timeLeft.minutes) === 24
                ? "минуты"
                : "минут"}
            </span>
          </div>
        </div>
      </div>

      <img
        src="/images/black-friday/black-friday-bg-pattern.png"
        className={styles.pattern}
      />

      <PreviousGifts />
    </div>
  )
}

export default BlackFridayTimer
