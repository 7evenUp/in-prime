import React from "react"

import Crypton from "../public/images/jsx/footer/crypton"
import Discord from "../public/images/jsx/footer/discord"
import Vk from "../public/images/jsx/footer/vk"
import Instagram from "../public/images/jsx/footer/instagram"
import Telegram from "../public/images/jsx/footer/telegram"
import Youtube from "../public/images/jsx/footer/youtube"

const MobileMenu = (props) => {
  const resolution = props.resolution
  const currentY = props.currentY
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
      position: {
        md: 940,
        sm: 740,
      },
    },
    // Возможности
    {
      position: {
        md: 1750,
        sm: 1296,
      },
    },
    // Примеры заработка
    {
      position: {
        md: 5070,
        sm: 3784,
      },
    },
    // Команда
    {
      position: {
        md: 6861,
        sm: 5037,
      },
    },
    // Подписка
    {
      position: {
        md: 8047,
        sm: 6404,
      },
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
      position: {
        md: 9350,
        sm: 8576,
      },
    },
    // {
    //   // Партнёры
    //   position: {
    //     md: 11741,
    //     sm: 11266,
    //   },
    // },
    {
      // Партнёры
      position: {
        md: 11005,
        sm: 9896,
      },
    },
    // {
    //   // FAQ
    //   position: {
    //     md: 12139,
    //     sm: 11591,
    //   },
    // },
    {
      // FAQ
      position: {
        md: 11403,
        sm: 10221,
      },
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
            onClick={() => toggleMenu(categories[0].position[resolution])}
          >
            Преимущества
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[1].position[resolution])}
          >
            Возможности
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[2].position[resolution])}
          >
            Примеры заработка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[3].position[resolution])}
          >
            Команда
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[4].position[resolution])}
          >
            Подписка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[5].position[resolution])}
          >
            Отзывы
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[6].position[resolution])}
          >
            Партнеры
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[7].position[resolution])}
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
            onClick={() => toggleMenu(categories[4].position[resolution])}
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
