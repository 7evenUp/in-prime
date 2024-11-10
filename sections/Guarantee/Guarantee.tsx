import React from "react"
import Image from "next/image"
import * as Collapsible from "@radix-ui/react-collapsible"
import clsx from "clsx"
import { Swiper, SwiperSlide } from "swiper/react"

import { useSwiperReactive } from "@/hooks/useSwiperReactive"

import guarantee1 from "@/public/images/png/features/guarantee-1.png"
import guarantee2 from "@/public/images/png/features/guarantee-2.png"

import styles from "./Guarantee.module.scss"

const Guarantee = () => {
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const swiperRef = React.useRef(null)

  return (
    <section className={styles.section} id="guarantee">
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.title}>
            Гарантируем
            <div className={styles.title_accent}>окупаемость</div>
            подписки
          </h2>
          <p className={styles.text}>
            Мы выделяем криптособытия с гарантированным заработком, чтобы вы
            точно получили прибыль и окупили подписку.
          </p>
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
            <Swiper
              // @ts-ignore
              ref={swiperRef}
              slidesPerView={1}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className={styles.swiper}
              wrapperClass={styles.swiper_wrapper}
            >
              <SwiperSlide className={styles.slide}>
                <div className={styles.swiper_item}>
                  <Image
                    src={guarantee1}
                    alt="Выполняйте активности с пометкой “Гарант” и будьте уверены, что цена подписки окупится!"
                  />
                  <p>
                    Выполняйте активности с пометкой “Гарант” и будьте уверены,
                    что цена подписки окупится!
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <div className={styles.swiper_item}>
                  <Image
                    src={guarantee2}
                    alt="Мы оформим вам компенсацию бесплатно, если у вас не получится окупить Prime-подписку!"
                  />
                  <p>
                    Мы оформим вам компенсацию бесплатно, если у вас не
                    получится окупить Prime-подписку!
                  </p>
                </div>
              </SwiperSlide>
              <Pagination amount={2} />
            </Swiper>
            <p className={styles.text_small}>
              Перед покупкой ознакомьтесь с{" "}
              <a
                href="https://crypton-prime.notion.site/fb0eb6869a6d4117a9203ee49c6446dc"
                target="_blank"
              >
                условиями гарантии
              </a>
              , а любые вопросы задавайте{" "}
              <a
                href="https://t.me/crypton_support"
                target="_blank"
                className={styles.support}
              >
                Наставнику.
              </a>
            </p>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </section>
  )
}

export default Guarantee

const Pagination = ({ amount }: { amount: number }) => {
  const swiper = useSwiperReactive()

  return (
    <div className={styles.pagination}>
      {new Array(amount).fill(null).map((_, i) => (
        <button
          key={i}
          className={styles.pagination_button}
          onClick={() => swiper.slideTo(i)}
          style={{
            background: swiper.activeIndex === i ? "white" : "transparent",
          }}
        />
      ))}
    </div>
  )
}
