import React, { useEffect, useState } from "react"

import Categories from "@/components/categories"
import MobileMenu from "@/components/mobile-menu"
import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

import { Resolution } from "@/types/resolution"

import styles from "./Earn.module.scss"

interface EarnProps {
  resolution: Resolution
  referral: string | string[]
  currentY: number
  setCurrentY: React.Dispatch<React.SetStateAction<number>>
}

const positions = {
  lgg: 8130,
  lg: 7150,
  md: 7740,
  sm: 6250,
}

const Earn = ({ resolution, referral, currentY, setCurrentY }: EarnProps) => {
  const [mobileMenu, changeMobileMenu] = useState(false)
  const [scrollY, setScrollY] = React.useState(0)

  const scrollHandler = React.useCallback((event) => {
    setScrollY(window.scrollY)
  }, [])

  const scrollToSubscriptions = () => {
    window.scrollTo({
      top: 6775,
      behavior: "smooth",
    })
    setCurrentY(6775)
  }

  const scrollToGuarantee = () => {
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    })
    setCurrentY(700)
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
          {/* <BuySubscriptionDialog>
            <div className="app__container__earn__header__subscribe">
              <div className="app__container__earn__header__subscribe__text">
                Оформить подписку
              </div>
              <div className="app__container__earn__header__subscribe__logo" />
            </div>
          </BuySubscriptionDialog> */}
          <a
            href={`https://t.me/CryptonLobbyBot?start=${referral}`}
            target={"_blank"}
          >
            <div className="app__container__earn__header__subscribe">
              <div className="app__container__earn__header__subscribe__text">
                Оформить подписку
              </div>
              <div className="app__container__earn__header__subscribe__logo" />
            </div>
          </a>
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
        <button className={styles.button} onClick={scrollToGuarantee}>
          Гарантируем окупаемость
        </button>
        <button className={styles.button} onClick={scrollToSubscriptions}>
          Вступить в сообщество
        </button>
      </div>
    </section>
  )
}

export default Earn
