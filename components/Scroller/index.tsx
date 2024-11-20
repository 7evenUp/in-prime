"use client"
import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "motion/react"

import styles from "./Scroller.module.scss"

import { generateAnimation } from "./generateAnimation"
import { prizes } from "./prizes"

import getRandomInteger from "./getRandomInteger"
import clsx from "clsx"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/redux/hooks"
import { setLoginIDModal } from "@/redux/reducers/modalReducer"
const ClickWheelSound = "./click_wheel.mp3"
// const audio = new Audio(ClickWheelSound)

const PRIZE_WIDTH = 136
const GAP_BETWEEN_PRIZES = 16
const PRIZE_WIDTH_WITH_GAP = PRIZE_WIDTH + GAP_BETWEEN_PRIZES
const ANIMATION_DURATION_IN_SEC = 8
const AMOUNT_OF_GENERATED_PRIZES = 50

const Scroller = () => {
  const dispatch = useAppDispatch()
  const { isAuth, boxesLeft } = useSelector((state: RootState) => state.auth)

  const onAuthClick = () => {
    dispatch(setLoginIDModal(true))
  }

  const itemPassedRef = useRef(0)

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const ClickWheelSound = "./audio/click_wheel.mp3" // Путь к аудиофайлу в папке public
    const newAudio = new Audio(ClickWheelSound)

    setAudio(newAudio)
  }, [])

  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)
  const [animationStarted, setAnimationStarted] = useState(false)

  const x = useMotionValue(0)

  useMotionValueEvent(x, "animationComplete", () => {
    setAnimationStarted(false)
  })

  useEffect(() => {
    setWonPrizes(
      generateAnimation(
        AMOUNT_OF_GENERATED_PRIZES,
        { color: "blue", numberInContainer: 5 },
        prizes
      )
    )
  }, [])

  useEffect(() => {
    if (!animationStarted) return

    const intervalId = setInterval(() => {
      const itemPassed = Math.floor(Math.abs(x.get()) / PRIZE_WIDTH_WITH_GAP)

      if (itemPassed === itemPassedRef.current) {
        return
      } else {
        audio.currentTime = 0
        audio.play()
        itemPassedRef.current = itemPassed
      }
    }, 16)

    return () => clearInterval(intervalId)
  }, [animationStarted])

  const onOpenClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    x.jump(0)

    // Рандомная позиция по координате x, чтобы перекрестие упало на 40-ой элемент
    const randInt = getRandomInteger(5940, 6050)

    setWonPrizes(
      generateAnimation(
        AMOUNT_OF_GENERATED_PRIZES,
        { color: "red", numberInContainer: 5 },
        prizes
      )
    )

    setAnimationStarted(true)

    animate(x, -randInt, {
      duration: ANIMATION_DURATION_IN_SEC,
      ease: [0, 1.01, 0.73, 1],
    })
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <h1>Всего открытий боксов: 4</h1>
        <div className={styles.info}>
          <h1>Осталось открытий боксов: 2</h1>
          <button className={styles.button}>получить больше</button>
        </div>
      </div> */}

      <div className={styles.roulette}>
        <div className={styles.prizes}>
          <motion.div style={{ x }} className={styles.motionWrapper}>
            {wonPrizes}
          </motion.div>
          <RoundedTriangle className={`${styles.triangle} ${styles.top}`} />
          <RoundedTriangle className={`${styles.triangle} ${styles.bottom}`} />
        </div>

        <button
          className={styles.spinButton}
          onClick={isAuth ? onOpenClick : onAuthClick}
          disabled={boxesLeft === 0}
        >
          Крутить рулетку
        </button>
      </div>
    </div>
  )
}

export default Scroller

const RoundedTriangle = ({ className }: { className: string }) => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]", className)}
  >
    <path
      d="M11.4019 22.5C12.5566 24.5 15.4434 24.5 16.5981 22.5L26.9904 4.5C28.1451 2.5 26.7017 0 24.3923 0H3.60769C1.29829 0 -0.145082 2.5 1.00962 4.5L11.4019 22.5Z"
      fill="#FFE19C"
    />
  </svg>
)
