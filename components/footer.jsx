import React from "react";
import Link from "next/link";
import { useState } from "react";

import Crypton from "/public/images/jsx/footer/crypton.jsx";
import Discord from "/public/images/jsx/footer/discord.jsx";
import Vk from "/public/images/jsx/footer/vk.jsx";
import Instagram from "/public/images/jsx/footer/instagram.jsx";
import Telegram from "/public/images/jsx/footer/telegram.jsx";
import Youtube from "/public/images/jsx/footer/youtube.jsx";

function Footer(props) {
  const resolution = props.resolution;
  const currentY = props.currentY;
  const setCurrentY = props.setCurrentY;

  function toggleMenu(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
    setCurrentY(position);
  }
  const categories =  [
    {
      position: {
        lgg: 1750,
        lg: 1400,
        md: 1800,
        sm: 1300,
      },
    },
    {
      position: {
        lgg: 1100,
        lg: 780,
        md: 1050,
        sm: 810,
      },
    },
    {
      position: {
        lgg: 4160,
        lg: 3400,
        md: 3980,
        sm: 3050,
      },
    },
    {
      position: {
        lgg: 5050,
        lg: 4210,
        md: 4850,
        sm: 3650,
      },
    },
    {
      position: {
        lgg: 6700,
        lg: 5720,
        md: 5840,
        sm: 5170,
      },
    },
    {
      position: {
        lgg: 9500,
        lg: 8355,
        md: 8860,
        sm: 8635,
      },
    },
  ];

  return (
    <div className="footer">
      {["lgg", "lg"].includes(props.resolution) ? (
        <>
          <div className="footer__rectangle">
            <Link href="/">
              <a>
                <div className="footer__rectangle__logo"></div>
              </a>
            </Link>

            <div className="footer__rectangle__socials">
              <div className="footer__rectangle__socials__title">
                Подписывайся на нас в соцсетях:
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
                  <a href="https://discord.gg/pP7QMjs4yQ" target={"_blank"}>
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
              Copyright © Crypton Prime, 2022. Все права защищены
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
          <div className="footer__gradient"></div>
        </>
      ) : props.resolution == "md" ? (
        <>
          <div className="footer__rectangle">
            <div className="container">
              <Link href="/">
                <a>
                  <div className="footer__rectangle__logo"></div>
                </a>
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
                Copyright © Crypton Prime, 2022. Все права защищены
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
                    <a href="https://discord.gg/pP7QMjs4yQ" target={"_blank"}>
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
          <div className="footer__gradient"></div>
        </>
      ) : (
        <>
          <>
            <div className="footer__rectangle">
              <div className="container">
                <Link href="/">
                  <a>
                    <div className="footer__rectangle__logo"></div>
                  </a>
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
                      <a href="https://discord.gg/pP7QMjs4yQ" target={"_blank"}>
                        <Discord />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__copyright-developers__text container">
              <div className="copyright">
                Copyright © Crypton Prime, 2022. Все права защищены
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
            <div className="footer__gradient"></div>
          </>
        </>
      )}
    </div>
  );
}

export default Footer;
