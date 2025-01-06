import { useEffect, useState } from "react"

import Crypton from "../public/images/jsx/footer/crypton"
import Discord from "../public/images/jsx/footer/discord"
import Vk from "../public/images/jsx/footer/vk"
import Instagram from "../public/images/jsx/footer/instagram"
import Telegram from "../public/images/jsx/footer/telegram"
import Youtube from "../public/images/jsx/footer/youtube"
import { getSection, scrollToSection } from '@/redux/reducers/scrollReducer'

const MobileMenu = (props) => {
  const [docEnv, setDocEnv] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDocEnv(true)
    }
  }, [])

  async function toggleMenu(section: {getPosition: ()=>number}) {
    await props.changeMobileMenu(!props.open)
    scrollToSection(section)
  }

  return (
    <div
      className="mobile-menu"
      style={{
        display: `${
          props.open == 1 && ["md", "sm"].includes(props.resolution)
            ? "flex"
            : "none"
        }`,
      }}
    >
      <div
        className="mobile-menu__background"
        onClick={props.changeMobileMenu}
      ></div>
      <div className="mobile-menu__container">
        <div className="mobile-menu__container__right-light"></div>
        <div className="mobile-menu__container__button-place">
          <div
            className={`mobile-menu-button close`}
            onClick={props.changeMobileMenu}
          ></div>
        </div>
        <div className="mobile-menu__container__cat-place">
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Преимущества'))}
          >
            Преимущества
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Возможности'))}
          >
            Возможности
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Кейсы'))}
          >
            Примеры заработка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Команда'))}
          >
            Команда
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Подписка'))}
          >
            Подписка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Отзывы'))}
          >
            Отзывы
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('Партнеры'))}
          >
            Партнеры
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(getSection('FAQ'))}
          >
            FAQ
          </div>
        </div>
        <div className="mobile-menu__container__subscribe-block">
          <button
            style={{
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="mobile-menu__container__subscribe-block__subscribe"
            onClick={() => toggleMenu(getSection('Подписка'))}
          >
            <div className="mobile-menu__container__subscribe-block__subscribe__text">
              Оформить подписку
            </div>
          </button>
        </div>
        <div className="mobile-menu__bottom__wrapper">
          <div className="mobile-menu__container__socials__links">
            <div className="mobile-menu__container__socials__links__link">
              <a href="https://crypton.xyz" target={"_blank"}>
                <Crypton />
              </a>
            </div>
            <div className="mobile-menu__container__socials__links__link">
              <a href="https://vk.com/off_crypton" target={"_blank"}>
                <Vk />
              </a>
            </div>
            <div className="mobile-menu__container__socials__links__link">
              <a href="https://www.instagram.com/crypton_ru/" target={"_blank"}>
                <Instagram />
              </a>
            </div>
            <div className="mobile-menu__container__socials__links__link">
              <a href="https://t.me/crypton_off" target={"_blank"}>
                <Telegram />
              </a>
            </div>
            <div className="mobile-menu__container__socials__links__link">
              <a
                href="https://www.youtube.com/c/CryptonAcademy/"
                target={"_blank"}
              >
                <Youtube />
              </a>
            </div>
            <div className="mobile-menu__container__socials__links__link">
              <a href="https://discord.gg/crypton" target={"_blank"}>
                <Discord />
              </a>
            </div>
          </div>
          <div className="mobile-menu__bottom__wrapper__copyright">
            Copyright © Crypton Prime, 2024. Все права защищены
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
