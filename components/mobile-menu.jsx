import React from "react";

import Crypton from "/public/images/jsx/footer/crypton.jsx";
import Discord from "/public/images/jsx/footer/discord.jsx";
import Vk from "/public/images/jsx/footer/vk.jsx";
import Instagram from "/public/images/jsx/footer/instagram.jsx";
import Telegram from "/public/images/jsx/footer/telegram.jsx";
import Youtube from "/public/images/jsx/footer/youtube.jsx";

function MobileMenu(props) {
  const resolution = props.resolution;
  const currentY = props.currentY;
  const setCurrentY = props.setCurrentY;

  async function toggleMenu(position) {
    await props.changeMobileMenu(!props.open);
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
    setCurrentY(position);
  }

  const categories = [
    {
      position: {
        md: 1800,
        sm: 1300,
      },
    },
    {
      position: {
        md: 1020,
        sm: 800,
      },
    },
    {
      position: {
        md: 3980,
        sm: 3000,
      },
    },
    {
      position: {
        md: 4800,
        sm: 3630,
      },
    },
    {
      position: {
        md: 5800,
        sm: 5170,
      },
    },
    {
      position: {
        md: 6170,
        sm: 5670,
      },
    },
    {
      position: {
        md: 7230,
        sm: 7000,
      },
    },
  ];

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
            <a href="https://discord.gg/pP7QMjs4yQ" target={"_blank"}>
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
  );
}

export default MobileMenu;
