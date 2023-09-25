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
    {
      position: {
        md: 1776,
        sm: 1296,
      },
    },
    {
      position: {
        md: 930,
        sm: 740,
      },
    },
    {
      position: {
        md: 5350,
        sm: 4025,
      },
    },
    {
      position: {
        md: 6270,
        sm: 4600,
      },
    },
    {
      position: {
        md: 7660,
        sm: 6780,
      },
    },
    {
      position: {
        md: 8250,
        sm: 7670,
      },
    },
    {
      position: {
        md: 9220,
        sm: 8920,
      },
    },
    {
      position: {
        md: 10790,
        sm: 10130,
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
            Возможности
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[1].position[resolution])}
          >
            Преимущества
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
            Партнеры
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[5].position[resolution])}
          >
            Подписка
          </div>
          <div
            className="mobile-menu__container__cat-place__item"
            onClick={() => toggleMenu(categories[6].position[resolution])}
          >
            Отзывы
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
          <a
            href={`https://t.me/CryptonLobbyBot?start=${props.referral}`}
            target={"_blank"}
          >
            <div className="mobile-menu__container__subscribe-block__subscribe">
              <div className="mobile-menu__container__subscribe-block__subscribe__text">
                Оформить подписку
              </div>
              <div className="mobile-menu__container__subscribe-block__subscribe__logo"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
