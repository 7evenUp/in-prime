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
  const [mobileMenu, changeMobileMenu] = useState(false)
  const [scrollY, setScrollY] = React.useState(0)

  const scrollHandler = React.useCallback((event) => {
    setScrollY(window.scrollY)
  }, [])

  const positions = {
    guarantee: {
      lgg: 3150,
      lg: 2660,
      md: 3476,
      sm: 2676,
    },
    subscription: {
      lgg: 7597,
      lg: 6737,
      md: 8047,
      sm: 6404,
    },
  }

  const scrollToSubscriptions = () => {
    window.scrollTo({
      top: positions.subscription[resolution],
      behavior: "smooth",
    })
    setCurrentY(positions.subscription[resolution])
  }

  const scrollToGuarantee = () => {
    window.scrollTo({
      top: positions.guarantee[resolution],
      behavior: "smooth",
    })
    setCurrentY(positions.guarantee[resolution])
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
        Prime – приватное сообщество с авторским контентом по заработку в
        криптовалюте. Наша команда отбирает лучшие события, подготавливает
        детальные инструкции и помогает вам получать прибыль.
      </div>
      <div className={styles.footer}>
        <button className={styles.button1} onClick={scrollToGuarantee}>
          Гарантируем окупаемость
        </button>
        <button className={styles.button2} onClick={scrollToSubscriptions}>
          Вступить в сообщество
        </button>
      </div>
    </section>
  )
}

export default Earn
