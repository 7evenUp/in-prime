import React from "react"
import Image from "next/image"
import * as Collapsible from "@radix-ui/react-collapsible"
import clsx from "clsx"

import guarantee1 from "@/public/images/png/features/guarantee-1.png"
import guarantee2 from "@/public/images/png/features/guarantee-2.png"

import styles from "./Guarantee.module.scss"

const Guarantee = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <section className={styles.section} id="guarantee">
      <div className={styles.container}>
        <h2 className={styles.title}>Гарантируем, что вы окупите подписку</h2>
        <p className={styles.text}>
          Мы выделяем криптособытия с гарантированным заработком, чтобы вы точно
          получили прибыль и окупили подписку.
        </p>
        <p className={styles.text_first}>
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
        <div className={styles.content}>
          <div className={styles.content_item}>
            <Image
              src={guarantee1}
              alt="Выполняйте активности с пометкой “Гарант” и будьте уверены, что цена подписки окупится!"
            />
            <p>
              Выполняйте активности с пометкой “Гарант” и будь уверены, что цена
              подписки окупится!
            </p>
          </div>
          <div className={styles.content_item}>
            <Image
              src={guarantee2}
              alt="Если у тебя не получилось окупить подписку, то предоставь отчёт выполненных активностей наставнику и мы продлим Prime ещё на один месяц абсолютно бесплатно!"
            />
            <p>
              Если у тебя не получилось окупить подписку, то предоставь отчёт
              выполненных активностей наставнику и мы продлим Prime ещё на один
              месяц абсолютно бесплатно!
            </p>
          </div>
        </div>
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
              В рамках нашего сообщества вы найдете “гарантированные события”,
              заработок на которых практически обеспечен. Найти их не составит
              труда, поскольку они удобно размещены в отдельном разделе
              веб-календаря.
            </p>
            <p className={styles.text}>
              Если ответственно выполнять данные активности, придерживаясь
              ключевых правил и возможностей абуза, то вы окупите подписку. В
              случае, если вы выполнили все гарант. активности, но подписку так
              и не удалось окупить, то обязательно напишите{" "}
              <a href="https://t.me/crypton_support" target="_blank">
                Наставнику
              </a>
              , предоставив все необходимые доказательства участия. Мы продлим
              подписку бесплатно, начислив недостающую сумму для продления, если
              вы не окупились по нашей вине.
            </p>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </section>
  )
}

export default Guarantee
