import React from "react"
import clsx from "clsx"

import * as Collapsible from "@radix-ui/react-collapsible"

import Countdown from "@/components/countdown"

import styles from "./TimerPromo.module.scss"

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <div />
  } else {
    return (
      <span>
        <div className="date">
          {days / 10 >= 1 ? "" : "0"}
          {days}
        </div>
        <div className="sep">:</div>
        <div className="date">
          {hours / 10 >= 1 ? "" : "0"}
          {hours}
        </div>
        <div className="sep">:</div>
        <div className="date">
          {minutes / 10 >= 1 ? "" : "0"}
          {minutes}
        </div>
        <div className="sep">:</div>
        <div className="date">
          {seconds / 10 >= 1 ? "" : "0"}
          {seconds}
        </div>
      </span>
    )
  }
}

const endDate = 1731621600000

const TimerPromo = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={styles.timer}>
      <h1 className={styles.timer__title}>Какие подарки внутри бокса?</h1>
      <div className={styles.timer__image} />
      <div className={styles.timer__gifts}>
        <Collapsible.Root
          className={styles.CollapsibleRoot}
          open={open}
          onOpenChange={setOpen}
        >
          <Collapsible.Trigger className={styles.CollapsibleTrigger}>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(styles.icon, open && styles.icon__active)}
            >
              <path
                d="M10.7321 15C9.96225 16.3333 8.03775 16.3333 7.26795 15L0.339746 3C-0.430054 1.66667 0.532196 1.17996e-07 2.0718 2.52592e-07L15.9282 1.46396e-06C17.4678 1.59855e-06 18.4301 1.66667 17.6603 3L10.7321 15Z"
                fill="#222222"
              />
            </svg>
            Разверни и узнай
          </Collapsible.Trigger>

          <Collapsible.Content className={styles.CollapsibleContent}>
            <div className={styles.CollapsibleContent__list}>
              {[...Array(10)].map((_, index) => (
                <FullGift key={index} />
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      <div className={styles.timer__time}>
        <h2 className={styles.timer__time__text}>До конца акции осталось:</h2>
        <Countdown
          className={styles.timer__time__progress}
          date={endDate}
          classNameNumber={styles.timer__time__progress__date}
        />
        <div className={styles.timer__time__progress__sub}>
          <span>дня</span>
          <span>часов</span>
          <span>минут</span>
        </div>
      </div>

      <div className={styles.timer__last}>
        <h2 className={styles.timer__last__title}>Последние подарки</h2>
        <div className={styles.timer__last__list}>
          {[...Array(10)].map((_, index) => (
            <LastGift key={index} />
          ))}
        </div>
      </div>

      <div className={styles.timer__bg} />
    </div>
  )
}

const FullGift = () => {
  return (
    <div className={styles.fullGift}>
      <div className={styles.fullGift__image}>
        {/* <img src="/images/png/last-gift.png" alt="Подарок" /> */}
      </div>
      <span className={styles.fullGift__text}>Hoodie “Now or Never”</span>
    </div>
  )
}

const LastGift = () => {
  return (
    <div className={styles.gift}>
      <div className={styles.gift__image}>
        {/* <img src="/images/png/last-gift.png" alt="Подарок" /> */}
      </div>
      <div className={styles.gift__hero}>
        {/* <img>mambaBlackz</img> */}
        <div className={styles.gift__hero__img} />
        <span className={styles.gift__hero__name}>mambaBlackz</span>
      </div>
      <div className={styles.gift__time}>12 мин назад</div>
    </div>
  )
}

export default TimerPromo
