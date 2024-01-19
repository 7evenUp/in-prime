import React from "react"
import Link from "next/link"

import Crypton from "../public/images/jsx/footer/crypton"
import Discord from "../public/images/jsx/footer/discord"
import Vk from "../public/images/jsx/footer/vk"
import Instagram from "../public/images/jsx/footer/instagram"
import Telegram from "../public/images/jsx/footer/telegram"
import Youtube from "../public/images/jsx/footer/youtube"

const currentYear = new Date().getFullYear()

const Footer = (props) => {
  const resolution = props.resolution
  const currentY = props.currentY
  const setCurrentY = props.setCurrentY

  function toggleMenu(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
    setCurrentY(position)
  }
  const categories = {
    opportunities: {
      lgg: 1750,
      lg: 1410,
      md: 1776,
      sm: 1296,
    },
    advantages: {
      lgg: 980,
      lg: 810,
      md: 930,
      sm: 740,
    },
    examples: {
      lgg: 4348,
      lg: 3708,
      md: 4688,
      sm: 3700,
    },
    team: {
      lgg: 5312,
      lg: 4610,
      md: 5590,
      sm: 4290,
    },
    partners: {
      lgg: 7341,
      lg: 6430,
      md: 6990,
      sm: 5830,
    },
    faq: {
      lgg: 10450,
      lg: 9150,
      md: 10200,
      sm: 8740,
    },
  }

  return (
    <footer className="footer">
      {["lgg", "lg"].includes(props.resolution) ? (
        <>
          <div className="footer__rectangle">
            <Link href="/">
              <div className="footer__rectangle__logo" />
            </Link>

            <div className="footer__rectangle__socials">
              <div className="footer__rectangle__socials__title">
                Подписывайтесь на нас в соцсетях:
              </div>
              <div className="footer__rectangle__socials__links">
                <div className="footer__rectangle__socials__links__link">
                  <a href="https://crypton.xyz" target={"_blank"}>
                    <Crypton />
                  </a>
                </div>
                <div className="footer__rectangle__socials__links__link">
                  <a href="https://vk.com/off_crypton" target={"_blank"}>
                    <Vk />
                  </a>
                </div>
                <div className="footer__rectangle__socials__links__link">
                  <a
                    href="https://www.instagram.com/crypton_ru/"
                    target={"_blank"}
                  >
                    <Instagram />
                  </a>
                </div>
                <div className="footer__rectangle__socials__links__link">
                  <a href="https://t.me/crypton_off" target={"_blank"}>
                    <Telegram />
                  </a>
                </div>
                <div className="footer__rectangle__socials__links__link">
                  <a
                    href="https://www.youtube.com/c/CryptonAcademy/"
                    target={"_blank"}
                  >
                    <Youtube />
                  </a>
                </div>
                <div className="footer__rectangle__socials__links__link">
                  <a href="https://discord.gg/8b6vmMtqwA" target={"_blank"}>
                    <Discord />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer__rectangle__right">
              <div className="footer__rectangle__right__column">
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories.advantages[resolution])}
                >
                  Преимущества
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() =>
                    toggleMenu(categories.opportunities[resolution])
                  }
                >
                  Возможности
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories.examples[resolution])}
                >
                  Примеры заработка
                </div>
              </div>

              <div className="footer__rectangle__right__column">
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories.team[resolution])}
                >
                  Команда
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories.partners[resolution])}
                >
                  Партнёры
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories.faq[resolution])}
                >
                  FAQ
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright-developers">
            <div className="footer__copyright-developers__text">
              Copyright © Crypton Prime, {currentYear}. Все права защищены
            </div>
            <div className="developers">
              <a href="https://t.me/airin7sh" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Designed by Iren Shcherbakova
                </div>
              </a>
              <a href="https://t.me/granium" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Developed by Granium
                </div>
              </a>
            </div>
          </div>
          <div className="footer__gradient" />
        </>
      ) : props.resolution == "md" ? (
        <>
          <div className="footer__rectangle">
            <div className="container">
              <Link href="/">
                <div className="footer__rectangle__logo" />
              </Link>

              <div className="footer__rectangle__right">
                <div className="footer__rectangle__right__column">
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories.opportunities[resolution])
                    }
                  >
                    Возможности
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories.advantages[resolution])
                    }
                  >
                    Преимущества
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.examples[resolution])}
                  >
                    Примеры заработка
                  </div>
                </div>

                <div className="footer__rectangle__right__column">
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.team[resolution])}
                  >
                    Команда
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.partners[resolution])}
                  >
                    Партнёры
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.faq[resolution])}
                  >
                    FAQ
                  </div>
                </div>
              </div>
              <div className="footer__copyright-developers__text copyright">
                Copyright © Crypton Prime, {currentYear}. Все права защищены
              </div>
              <div className="footer__rectangle__socials">
                <div className="footer__rectangle__socials__links">
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://crypton.xyz" target={"_blank"}>
                      <Crypton />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://vk.com/off_crypton" target={"_blank"}>
                      <Vk />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a
                      href="https://www.instagram.com/crypton_ru/"
                      target={"_blank"}
                    >
                      <Instagram />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://t.me/crypton_off" target={"_blank"}>
                      <Telegram />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a
                      href="https://www.youtube.com/c/CryptonAcademy/"
                      target={"_blank"}
                    >
                      <Youtube />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://discord.gg/8b6vmMtqwA" target={"_blank"}>
                      <Discord />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright-developers">
            <div className="developers">
              <a href="https://t.me/airin7sh" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Designed by Iren Shcherbakova
                </div>
              </a>
              <a href="https://t.me/granium" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Developed by Granium
                </div>
              </a>
            </div>
          </div>
          <div className="footer__gradient" />
        </>
      ) : (
        <>
          <div className="footer__rectangle">
            <div className="container">
              <Link href="/">
                <div className="footer__rectangle__logo" />
              </Link>

              <div className="footer__rectangle__right">
                <div className="footer__rectangle__right__column">
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories.opportunities[resolution])
                    }
                  >
                    Возможности
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories.advantages[resolution])
                    }
                  >
                    Преимущества
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.examples[resolution])}
                  >
                    Примеры заработка
                  </div>
                </div>

                <div className="footer__rectangle__right__column">
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.team[resolution])}
                  >
                    Команда
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.partners[resolution])}
                  >
                    Партнёры
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() => toggleMenu(categories.faq[resolution])}
                  >
                    FAQ
                  </div>
                </div>
              </div>
              <div className="footer__rectangle__socials">
                <div className="footer__rectangle__socials__links">
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://crypton.xyz" target={"_blank"}>
                      <Crypton />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://vk.com/off_crypton" target={"_blank"}>
                      <Vk />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a
                      href="https://www.instagram.com/crypton_ru/"
                      target={"_blank"}
                    >
                      <Instagram />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://t.me/crypton_off" target={"_blank"}>
                      <Telegram />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a
                      href="https://www.youtube.com/c/CryptonAcademy/"
                      target={"_blank"}
                    >
                      <Youtube />
                    </a>
                  </div>
                  <div className="footer__rectangle__socials__links__link">
                    <a href="https://discord.gg/8b6vmMtqwA" target={"_blank"}>
                      <Discord />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright-developers__text container">
            <div className="copyright">
              Copyright © Crypton Prime, {currentYear}. Все права защищены
            </div>
          </div>
          <div className="footer__copyright-developers">
            <div className="developers">
              <a href="https://t.me/airin7sh" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Designed by Iren Shcherbakova
                </div>
              </a>
              <a href="https://t.me/granium" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Developed by Granium
                </div>
              </a>
            </div>
          </div>
          <div className="footer__gradient" />
        </>
      )}
    </footer>
  )
}

export default Footer
