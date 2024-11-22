import React, { useEffect, useState } from "react"

import Categories from "@/components/categories"
import MobileMenu from "@/components/mobile-menu"

import { Resolution } from "@/types/resolution"

import styles from "./Earn.module.scss"
import clsx from "clsx"

interface EarnProps {
  resolution: Resolution
  referral: string | string[]
  currentY: number
  setCurrentY: React.Dispatch<React.SetStateAction<number>>
}

const Earn = ({ resolution, referral, currentY, setCurrentY }: EarnProps) => {
  const [docEnv, setDocEnv] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDocEnv(true)
    }
  }, [])

  const [mobileMenu, changeMobileMenu] = useState(false)
  const [scrollY, setScrollY] = React.useState(0)

  const scrollHandler = React.useCallback((event) => {
    setScrollY(window.scrollY)
  }, [])

  const positions = {
    guarantee: docEnv
      ? document.getElementById("guarantee").offsetTop -
        document.getElementById("header").clientHeight
      : 0,
    subscription: docEnv
      ? document.getElementById("subscribe").offsetTop -
        document.getElementById("header").clientHeight
      : 0,
    gift: docEnv
      ? document.getElementById("gifts").offsetTop -
        document.getElementById("header").clientHeight
      : 0,
  }

  const scrollToSubscriptions = () => {
    window.scrollTo({
      top: positions.subscription,
      behavior: "smooth",
    })
    setCurrentY(positions.subscription)
  }

  const scrollToGuarantee = () => {
    window.scrollTo({
      top: positions.guarantee,
      behavior: "smooth",
    })
    setCurrentY(positions.guarantee)
  }

  const scrollToGift = () => {
    window.scrollTo({
      top: positions.gift,
      behavior: "smooth",
    })
    setCurrentY(positions.gift)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  function toggleMenu(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
    setCurrentY(position)
  }

  const categories = [
    {
      number: "03",
      name: "Возможности",
      position: docEnv
        ? document.getElementById("features").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      number: "04",
      name: "Кейсы",
      position: docEnv
        ? document.getElementById("examples").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      number: "05",
      name: "Роадмап",
      position: docEnv
        ? document.getElementById("roadmap").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      number: "06",
      name: "О нас",
      position: docEnv
        ? document.getElementById("founder").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      number: "07",
      name: "Отзывы",
      position: docEnv
        ? document.getElementById("testimonials").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      number: "08",
      name: "Истории успеха",
      position: docEnv
        ? document.getElementById("histories").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
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

  return (
    <section className="app__container__earn">
      {/* <div className="app__container__earn__left-gradient" />
      <div className="app__container__earn__right-gradient" /> */}

      <div className="app__container__earn__promo" onClick={scrollToGift} />

      <MobileMenu
        open={mobileMenu}
        changeMobileMenu={() => changeMobileMenu(!mobileMenu)}
        resolution={resolution}
        currentY={currentY}
        setCurrentY={setCurrentY}
        referral={referral}
      />

      <div
        className="app__container__earn__header-bg"
        id="header"
        style={{
          background: scrollY ? "rgba(34, 34, 34, 0.8)" : "transparent",
        }}
      />

      <header className="app__container__earn__header">
        <div className="app__container__earn__header__logo" />
        <div className="app__container__earn__header__menu">
          {categories.map((elem, index) => {
            return (
              <div
                className="app__container__earn__header__menu__item"
                onClick={() => toggleMenu(elem.position)}
                key={index}
              >
                <div className="name">{elem.name}</div>
              </div>
            )
          })}
        </div>
        <div className="menu-sub-block">
          <div
            className="app__container__earn__header__subscribe"
            onClick={scrollToSubscriptions}
          >
            <div className="app__container__earn__header__subscribe__text">
              Оформить подписку
            </div>
          </div>
          {["md", "sm"].includes(resolution) && (
            <div className="mobile-menu-button-wrapper">
              <div
                className={`mobile-menu-button open`}
                onClick={() => changeMobileMenu(!mobileMenu)}
              />
            </div>
          )}
        </div>
      </header>

      {/* <Categories /> */}

      <h1 className={styles.title}>
        Зарабатывайте
        <br />
        <span> на крипте проще</span>
      </h1>

      <div className={styles.description}>
        Получите в Prime <span>понятный план действий</span> и{" "}
        <span>поддержку</span> от наших экспертов для извлечения максимальной{" "}
        прибыли всего за пару кликов.
      </div>
      <div className={styles.footer}>
        <button className={styles.button1} onClick={scrollToGuarantee}>
          Гарантируем окупаемость
        </button>
        <button className={styles.button2} onClick={scrollToSubscriptions}>
          Забрать подарок
        </button>
      </div>

      <div className={styles.prime_bottom}>
        <span>CRYPTON PRIME</span>
        <div className={styles.prime_arrow} />
      </div>

      <div className={styles.gradient} />

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
