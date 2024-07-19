import React, { useEffect, useState } from "react"

import Categories from "@/components/categories"
import MobileMenu from "@/components/mobile-menu"

import { Resolution } from "@/types/resolution"

import styles from "./Earn.module.scss"

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

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  return (
    <section className="app__container__earn">
      <div className="app__container__earn__left-gradient" />
      <div className="app__container__earn__right-gradient" />

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
        style={{ background: scrollY ? "#131313" : "transparent" }}
      />

      <header className="app__container__earn__header">
        <div className="app__container__earn__header__logo" />
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
            <div style={{ width: "25px", zIndex: 101 }}>
              <div
                className={`mobile-menu-button open`}
                onClick={() => changeMobileMenu(!mobileMenu)}
              />
            </div>
          )}
        </div>
      </header>

      <Categories />

      <h1 className="app__container__earn__title">
        Зарабатывайте <br /> на криптовалюте
      </h1>

      <div className="app__container__earn__description">
        Получите в Prime понятный план действий и поддержку от наших экспертов
        для извлечения максимальной прибыли всего за пару кликов.
      </div>
      <div className={styles.footer}>
        <button className={styles.button1} onClick={scrollToGuarantee}>
          Гарантируем окупаемость
        </button>
        <button className={styles.button2} onClick={scrollToSubscriptions}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.6953 10.9512H11.1846V20.0003H18.6953V10.9512Z"
              fill="currentColor"
            />
            <path
              d="M9.81539 10.9512H2.30469V20.0003H9.81539V10.9512Z"
              fill="currentColor"
            />
            <path
              d="M16.3551 3.68875C16.5582 3.33426 16.6739 2.92805 16.6739 2.49652C16.6739 1.11992 15.4979 0 14.0525 0C12.9835 0 11.8896 0.526094 11.0515 1.4434C10.8441 1.67039 10.6594 1.91434 10.4996 2.1684C10.3399 1.91434 10.1551 1.67039 9.9477 1.4434C9.10963 0.526094 8.01579 0 6.94667 0C5.50128 0 4.32532 1.11996 4.32532 2.49652C4.32532 2.92801 4.4409 3.33426 4.6441 3.68875H1.07422V9.64652H9.81481V3.68875H11.1844V9.64652H19.925V3.68875H16.3551ZM6.94667 3.68875C6.25646 3.68875 5.69488 3.15391 5.69488 2.49652C5.69488 1.83914 6.25646 1.30434 6.94667 1.30434C8.1894 1.30434 9.37094 2.515 9.71478 3.68871L6.94667 3.68875ZM14.0525 3.68875H11.2844C11.6283 2.515 12.8098 1.30437 14.0525 1.30437C14.7428 1.30437 15.3043 1.83922 15.3043 2.49656C15.3043 3.15395 14.7428 3.68875 14.0525 3.68875Z"
              fill="currentColor"
            />
          </svg>
          Забрать подарок
        </button>
      </div>
    </section>
  )
}

export default Earn
