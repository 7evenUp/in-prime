import React from "react"

import styles from "./AdvantagesSm.module.scss"

const AdvantagesSm = () => {
  return (
    <div id="benefits" className={styles.advantages}>
      <h1 className={styles.title}>Преимущества подписки Prime</h1>
      <div className={styles.content}>
        <div className={styles.image} />
        <ul className={styles.list}>
          <li className={styles.item}>Структурированная информация</li>
          <li className={styles.item}>Огромное количество возможностей</li>
          <li className={styles.item}>Для опытных и новичков</li>
          <li className={styles.item}>Доступный язык изложения</li>
          <li className={styles.item}>Готовность к любым исходам на рынке</li>
          <li className={styles.item}>Экономия времени</li>
        </ul>
      </div>
    </div>
  )
}

export default AdvantagesSm
