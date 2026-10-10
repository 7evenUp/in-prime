import React, { useEffect, useState } from "react"

import Categories from "@/demo/redesign/components/categories"
import MobileMenu from "@/demo/redesign/components/mobile-menu"

import { Resolution } from "@/demo/redesign/types/resolution"

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
        Prime – приватное комьюнити с авторским контентом по заработку в
        криптовалюте. Наша команда отбирает лучшие события,
        подготавливает детальные инструкции и помогает получить первую прибыль.
      </div>
      <div className={styles.footer}>
        <p>
          PRIME - ПРОДУКТ ЭКОСИСТЕМЫ{" "}
          <a
            href="https://crypton.xyz"
            target="_blank"
            className={styles.footer_link}
          >
            CRYPTON
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </p>
      </div>
    </section>
  )
}

export default Earn
