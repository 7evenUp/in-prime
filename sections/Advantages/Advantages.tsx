import React from "react"

import styles from "./Advantages.module.scss"

const Advantages = () => {
  return (
    <div id="benefits" className={styles.advantages}>
      <h1 className={styles.title}>Преимущества подписки Prime</h1>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.item}>Структурированная информация</li>
          <li className={styles.item}>Огромное количество возможностей</li>
          <li className={styles.item}>Для опытных и новичков</li>
        </ul>
        <div className={styles.image} />
        <ul className={`${styles.list} ${styles.list__reverse}`}>
          <li className={styles.item_reverse}>Доступный язык изложения</li>
          <li className={styles.item_reverse}>
            Готовность к любым исходам на рынке
          </li>
          <li className={styles.item_reverse}>Экономия времени</li>
        </ul>
      </div>
    </div>
  )
}

export default Advantages
