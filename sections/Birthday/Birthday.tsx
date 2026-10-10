import React from "react"

import styles from "./Birthday.module.scss"

const Birthday = () => {
  return (
    <div className={styles.birthday}>
      <h1 className={styles.birthday__title}>
        Crypton <br /> Birthday
      </h1>

      <h2 className={styles.birthday__subtitle}>
        Купи подписку Prime и получи возможность выиграть топовый подарок!
      </h2>
      <span className={styles.birthday__text}>
        Выбирайте подписку и открывайте подарочные боксы.
        <br />
        Покупайте подписку, крутите рулетку, чтобы получить крутой приз.
        <br />
        Попробуйте открыть кейс прямо на этой странице.
      </span>

      <div className={styles.birthday__line}>
        НЕ УПУСТИ СВОЙ ШАНС ПОЛУЧИТЬ ТОПОВЫЙ ПОДАРОК НЕ УПУСТИ СВОЙ ШАНС
        ПОЛУЧИТЬ ТОПОВЫЙ ПОДАРОК
      </div>

      <div className={styles.birthday__bg} />
    </div>
  )
}

export default Birthday
