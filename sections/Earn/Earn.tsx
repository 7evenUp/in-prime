import React, { useEffect, useState } from "react"
import {
  getSection,
  scrollReducer,
  scrollToSection,
} from "@/redux/reducers/scrollReducer"
import { useSelector } from "react-redux"
import clsx from "clsx"

// import Categories from "@/components/categories"
import MobileMenu from "@/components/mobile-menu"

import { Resolution } from "@/types/resolution"

import styles from "./Earn.module.scss"
import Partners from "../Partners/Partners"

interface EarnProps {
  resolution: Resolution
  referral: string | string[]
}

const Earn = ({ resolution, referral }: EarnProps) => {
  const [docEnv, setDocEnv] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDocEnv(true)
    }
  }, [])

  const [mobileMenu, changeMobileMenu] = useState(false)

  const scrollToSubscriptions = () => scrollToSection("Подписка")
  const scrollToGuarantee = () => scrollToSection("Окупаемость")

  const scrollY = useSelector(scrollReducer.selectors.getScrollY)

  function toggleMenu(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
  }

  const categories = [
    { number: "03", ...getSection("Возможности") },
    { number: "04", ...getSection("Кейсы") },
    { number: "05", ...getSection("Роадмап") },
    { number: "06", ...getSection("Команда"), name: "О нас" },
    { number: "07", ...getSection("FAQ") },
    { number: "08", ...getSection("Истории успеха") },
  ]

  const [lineCount, setLineCount] = useState(9)

  useEffect(() => {
    switch (resolution) {
      case "lgg":
        setLineCount(12)
        break
      case "lg":
        setLineCount(9)
        break
      case "md":
        setLineCount(5)
        break
      case "sm":
        setLineCount(4)
        break
      default:
        setLineCount(4)
        break
    }
  }, [resolution, setLineCount])

  const [fridayRendered, setFridayRendered] = useState(false)
  React.useEffect(() => {
    const endFriday = 1733173199000

    const isFridayVisible = endFriday - new Date().getTime() > 0

    if (isFridayVisible) setFridayRendered(true)
  }, [])

  return (
    <section className="app__container__earn">
      {/* <div className="app__container__earn__left-gradient" />
      <div className="app__container__earn__right-gradient" /> */}

      {/* <div className="app__container__earn__promo__wrapper"> */}
      {fridayRendered && (
        <div
          className="app__container__earn__promo"
          onClick={scrollToSubscriptions}
        />
      )}

      {/* </div> */}

      <MobileMenu
        open={mobileMenu}
        changeMobileMenu={() => changeMobileMenu(!mobileMenu)}
        resolution={resolution}
        referral={referral}
      />

      <div
        className="app__container__earn__header-bg"
        id="header"
        style={{
          background: scrollY ? "rgba(34, 34, 34, 0.8)" : "transparent",
          backdropFilter: "blur(4px)",
        }}
      />

      <header className="app__container__earn__header">
        <div className="app__container__earn__header__logo" />
        <div className="app__container__earn__header__menu">
          {categories.map((elem, index) => {
            return (
              <div
                className="app__container__earn__header__menu__item"
                onClick={() => toggleMenu(elem.getPosition())}
                key={index}
              >
                <div className="name">{elem.name}</div>
              </div>
            )
          })}
        </div>
        <div className="menu-sub-block">
          {/* <div
            className="app__container__earn__header__subscribe"
            onClick={scrollToSubscriptions}
          >
            <div className="app__container__earn__header__subscribe__text">
              Оформить подписку
            </div>
          </div> */}
          {["md", "sm"].includes(resolution) && (
            <div
              className="mobile-menu-button-wrapper"
              onClick={() => changeMobileMenu(!mobileMenu)}
            >
              <div className={`mobile-menu-button open`} />
            </div>
          )}
        </div>
      </header>

      {/* <Categories /> */}

      <h1 className={styles.title}>
        Зарабатывайте в крипте
        <br />
        <span>больше с Prime</span>
      </h1>

      <div className={styles.description}>
        Экономьте силы и время с помощью готовых стратегий и помощи экспертов.{" "}
        <span>Освойте актуальные направления заработка</span> и чувствуйте себя
        уверенно на любом рынке
      </div>

      <div className={styles.footer}>
        {/* <button className={styles.button1} onClick={scrollToGuarantee}>
          Гарантируем окупаемость
        </button> */}
        <button className={styles.button1} onClick={scrollToSubscriptions}>
          Выбрать тариф
        </button>
      </div>

      <Partners />

      <div className={styles.gradient} />
      {resolution !== "sm" ? (
        <div className={styles.newYear} />
      ) : (
        <>
          <div className={styles.newYear__top} />
          <div className={styles.newYear__bottom} />
        </>
      )}

      <div className={styles.lines}>
        {[...Array(lineCount)].map((_, index) => (
          <div key={index} className={styles.line} />
        ))}
      </div>

      <div className={clsx(styles.lines, styles.lines__stars)}>
        {[...Array(lineCount)].map((_, index) => (
          <div key={index} className={styles.star} />
        ))}
      </div>
    </section>
  )
}

export default Earn
