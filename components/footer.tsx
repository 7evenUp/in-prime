import React from "react"
import Link from "next/link"

import Crypton from "../public/images/jsx/footer/crypton"
import Discord from "../public/images/jsx/footer/discord"
import Vk from "../public/images/jsx/footer/vk"
import Instagram from "../public/images/jsx/footer/instagram"
import Telegram from "../public/images/jsx/footer/telegram"
import Youtube from "../public/images/jsx/footer/youtube"

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
  const categories = [
    {
      position: {
        lgg: 1750,
        lg: 1380,
        md: 1780,
        sm: 1300,
      },
    },
    {
      position: {
        lgg: 1050,
        lg: 780,
        md: 1000,
        sm: 800,
      },
    },
    {
      position: {
        lgg: 4120,
        lg: 3380,
        md: 3970,
        sm: 3000,
      },
    },
    {
      position: {
        lgg: 5050,
        lg: 4210,
        md: 4820,
        sm: 3620,
      },
    },
    {
      position: {
        lgg: 7080,
        lg: 6000,
        md: 6200,
        sm: 5770,
      },
    },
    {
      position: {
        lgg: 8400,
        lg: 7200,
        md: 7600,
        sm: 7600,
      },
    },
  ]

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
                  <a href="https://discord.gg/crypton" target={"_blank"}>
                    <Discord />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer__rectangle__right">
              <div className="footer__rectangle__right__column">
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories[0].position[resolution])}
                >
                  Возможности
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories[1].position[resolution])}
                >
                  Преимущества
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories[2].position[resolution])}
                >
                  Примеры заработка
                </div>
              </div>

              <div className="footer__rectangle__right__column">
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories[3].position[resolution])}
                >
                  Команда
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories[4].position[resolution])}
                >
                  Партнёры
                </div>
                <div
                  className="footer__rectangle__right__column__route"
                  onClick={() => toggleMenu(categories[5].position[resolution])}
                >
                  FAQ
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright-developers">
            <div className="footer__copyright-developers__text">
              Copyright © Crypton Prime, 2023. Все права защищены
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
                      toggleMenu(categories[0].position[resolution])
                    }
                  >
                    Возможности
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories[1].position[resolution])
                    }
                  >
                    Преимущества
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories[2].position[resolution])
                    }
                  >
                    Примеры заработка
                  </div>
                </div>

                <div className="footer__rectangle__right__column">
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories[3].position[resolution])
                    }
                  >
                    Команда
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories[4].position[resolution])
                    }
                  >
                    Партнёры
                  </div>
                  <div
                    className="footer__rectangle__right__column__route"
                    onClick={() =>
                      toggleMenu(categories[5].position[resolution])
                    }
                  >
                    FAQ
                  </div>
                </div>
              </div>
              <div className="footer__copyright-developers__text copyright">
                Copyright © Crypton Prime, 2023. Все права защищены
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
                    <a href="https://discord.gg/crypton" target={"_blank"}>
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
                        toggleMenu(categories[0].position[resolution])
                      }
                    >
                      Возможности
                    </div>
                    <div
                      className="footer__rectangle__right__column__route"
                      onClick={() =>
                        toggleMenu(categories[1].position[resolution])
                      }
                    >
                      Преимущества
                    </div>
                    <div
                      className="footer__rectangle__right__column__route"
                      onClick={() =>
                        toggleMenu(categories[2].position[resolution])
                      }
                    >
                      Примеры заработка
                    </div>
                  </div>

                  <div className="footer__rectangle__right__column">
                    <div
                      className="footer__rectangle__right__column__route"
                      onClick={() =>
                        toggleMenu(categories[3].position[resolution])
                      }
                    >
                      Команда
                    </div>
                    <div
                      className="footer__rectangle__right__column__route"
                      onClick={() =>
                        toggleMenu(categories[4].position[resolution])
                      }
                    >
                      Партнёры
                    </div>
                    <div
                      className="footer__rectangle__right__column__route"
                      onClick={() =>
                        toggleMenu(categories[5].position[resolution])
                      }
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
                      <a href="https://discord.gg/crypton" target={"_blank"}>
                        <Discord />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__copyright-developers__text container">
              <div className="copyright">
                Copyright © Crypton Prime, 2023. Все права защищены
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
        </>
      )}
    </footer>
  )
}

export default Footer
