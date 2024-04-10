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
    advantages: {
      lgg: 984,
      lg: 780,
      md: 940,
      sm: 740,
    },
    opportunities: {
      lgg: 1812,
      lg: 1450,
      md: 1750,
      sm: 1296,
    },
    examples: {
      lgg: 4000,
      lg: 3415,
      md: 4166,
      sm: 3177,
    },
    team: {
      lgg: 5888,
      lg: 5155,
      md: 5950,
      sm: 4430,
    },
    partners: {
      lgg: 9720,
      lg: 8670,
      md: 10096,
      sm: 9289,
    },
    faq: {
      lgg: 10290,
      lg: 9120,
      md: 10495,
      sm: 9614,
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
                <div className="footer__rectangle__socials__links__link crypton">
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
              {/* <a href="https://t.me/airin7sh" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Designed by Iren Shcherbakova
                </div>
              </a>
              <a href="https://t.me/granium" target={"_blank"}>
                <div className="footer__copyright-developers__text">
                  Developed by Granium
                </div>
              </a> */}
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
                      toggleMenu(categories.advantages[resolution])
                    }
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
              <div className="footer__copyright-developers__text copyright">
                Copyright © Crypton Prime, {currentYear}. Все права защищены
              </div>
              <div className="footer__rectangle__socials">
                <div className="footer__rectangle__socials__links">
                  <div className="footer__rectangle__socials__links__link crypton">
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
          {/* <div className="footer__copyright-developers">
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
          </div> */}
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
                      toggleMenu(categories.advantages[resolution])
                    }
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
              <div className="footer__rectangle__socials">
                <div className="footer__rectangle__socials__links">
                  <div className="footer__rectangle__socials__links__link crypton">
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
          {/* <div className="footer__copyright-developers">
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
          </div> */}
          <div className="footer__gradient" />
        </>
      )}
    </footer>
  )
}

export default Footer
