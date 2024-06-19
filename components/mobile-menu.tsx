import { useEffect, useState } from "react"

import Crypton from "../public/images/jsx/footer/crypton"
import Discord from "../public/images/jsx/footer/discord"
import Vk from "../public/images/jsx/footer/vk"
import Instagram from "../public/images/jsx/footer/instagram"
import Telegram from "../public/images/jsx/footer/telegram"
import Youtube from "../public/images/jsx/footer/youtube"

const MobileMenu = (props) => {
  const [docEnv, setDocEnv] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDocEnv(true)
    }
  }, [])

  const setCurrentY = props.setCurrentY

  async function toggleMenu(position) {
    await props.changeMobileMenu(!props.open)
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
    setCurrentY(position)
  }

  const categories = [
    // Преимущества
    {
      position: docEnv
        ? document.getElementById("benefits").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    // Возможности
    {
      position: docEnv
        ? document.getElementById("features").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    // Примеры заработка
    {
      position: docEnv
        ? document.getElementById("examples").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    // Команда
    {
      position: docEnv
        ? document.getElementById("founder").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    // Подписка
    {
      position: docEnv
        ? document.getElementById("subscribe").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    // Отзывы
    // {
    //   position: {
    //     md: 10085,
    //     sm: 9946,
    //   },
    // },
    {
      // Отзывы
      position: docEnv
        ? document.getElementById("testimonials").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      // Партнёры
      position: docEnv
        ? document.getElementById("partners").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
    {
      // FAQ
      position: docEnv
        ? document.getElementById("faq").offsetTop -
          document.getElementById("header").clientHeight
        : 0,
    },
  ]

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
            onClick={() => toggleMenu(categories[0].position)}
          >
            Преимущества
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[1].position)}
          >
            Возможности
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[2].position)}
          >
            Примеры заработка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[3].position)}
          >
            Команда
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[4].position)}
          >
            Подписка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[5].position)}
          >
            Отзывы
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[6].position)}
          >
            Партнеры
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[7].position)}
          >
            FAQ
          </div>
        </div>
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
        <div className="mobile-menu__container__subscribe-block">
          <button
            style={{
              background: "transparent",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="mobile-menu__container__subscribe-block__subscribe"
            onClick={() => toggleMenu(categories[4].position)}
          >
            <div className="mobile-menu__container__subscribe-block__subscribe__text">
              Оформить подписку
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
