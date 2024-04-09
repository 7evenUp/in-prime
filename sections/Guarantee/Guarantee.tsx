import React from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import clsx from "clsx"

import styles from "./Guarantee.module.scss"

const Guarantee = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <section className={styles.section} id="guarantee">
      <div className={styles.container}>
        <h2 className={styles.title}>Гарантируем, что вы окупите подписку</h2>
        <p className={styles.text}>
          Если по какой-то причине подписка за месяц не окупилась, то мы продлим
          её ещё на месяц бесплатно!
        </p>
        <p className={styles.text}>Только мы предлагаем такую возможность.</p>
        <Collapsible.Root
          className={styles.CollapsibleRoot}
          open={open}
          onOpenChange={setOpen}
        >
          <Collapsible.Trigger className={styles.CollapsibleTrigger}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={clsx(styles.icon, open && styles.icon__active)}
            >
              <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            </svg>
            <span>Подробнее</span>
          </Collapsible.Trigger>

          <Collapsible.Content className={styles.CollapsibleContent}>
            <p className={styles.text}>
              Мы выделяем криптособытия с гарантированным заработком, чтобы вы
              точно получили прибыль и окупили подписку. Если по нашей вине вы
              не смогли окупиться, мы продлим подписку бесплатно.
            </p>
            <p className={styles.text}>
              Перед покупкой ознакомьтесь с{" "}
              <a
                href="https://crypton-prime.notion.site/fb0eb6869a6d4117a9203ee49c6446dc"
                target="_blank"
              >
                условиями гарантии
              </a>
              , а любые вопросы задавайте{" "}
              <a href="https://t.me/crypton_support" target="_blank">
                Наставнику
              </a>
              .
            </p>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </section>
  )
}

export default Guarantee
