"use client"
import React, { useEffect, useState } from "react"
import clsx from "clsx"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import * as Collapsible from "@radix-ui/react-collapsible"

import Countdown from "@/components/countdown"

import styles from "./TimerPromo.module.scss"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { IContainers } from "@/types/promo-types"
import DialogPromo from "@/components/DialogPromo/DialogPromo"

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

const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"
const EVENT_URL = process.env.NEXT_PUBLIC_EVENT_URL + "/api/"

interface Item {
  id: string
  number: number
}

const TimerPromo = () => {
  const [open, setOpen] = React.useState(false)

  const {
    data: containers,
    isError: isContainersError,
    isLoading: isContainersLoading,
  } = useQuery({
    queryKey: ["containers"],
    queryFn: async () => {
      const response = await axios.get<IContainers>(EVENT_URL + "containers")

      return response.data
    },
  })

  console.log(containers)

  const {
    data: openedBoxes,
    isError: isOpenedBoxesError,
    isLoading: isOpenedBoxesLoading,
  } = useQuery({
    queryKey: ["openedBoxes"],
    queryFn: async () => {
      const response = await axios.get<any[]>(
        ID_URL + "crypton-events/last-opened-containers/"
      )

      return response.data
    },
    refetchInterval: 60000,
  })

  const [items, setItems] = useState<Item[]>([])

  const [parent] = useAutoAnimate()
  useEffect(() => {
    const addRandomItem = () => {
      const newItem: Item = {
        id: Math.random().toString(36).substr(2, 9),
        number: Math.floor(Math.random() * 100),
      }

      setItems((prevItems) => [newItem, ...prevItems].slice(0, 30))
    }

    const intervalId = setInterval(addRandomItem, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={styles.timer} id="gifts">
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
              {isContainersLoading
                ? [...Array(10)].map((_, index) => <FullGift key={index} />)
                : containers?.containers[0].prizes.map((prize) => (
                    <FullGift
                      key={prize.prize.id}
                      text={prize.prize.title}
                      image={prize.prize.image}
                      description={prize.prize.description}
                      remainingQuantity={prize.remainingQuantity}
                    />
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
        <div className={styles.timer__last__list} ref={parent}>
          {items.map((item) => (
            <LastGift name={item.id} key={item.id} />
          ))}
        </div>
      </div>

      <div className={styles.timer__bg} />
    </div>
  )
}

const FullGift = ({
  text,
  image,
  description,
  remainingQuantity,
}: {
  text?: string
  image?: string
  description?: string
  remainingQuantity?: number
}) => {
  return (
    <DialogPromo description={description} name={text} imgSrc={image}>
      <div className={styles.fullGift}>
        <div className={styles.fullGift__image}>
          {image && <img src={image} alt={text} />}
        </div>
        <span className={styles.fullGift__text}>{text}</span>
        <div className={styles.fullGift__line} />
        <div className={styles.fullGift__count}>{remainingQuantity}</div>
      </div>
    </DialogPromo>
  )
}

const LastGift = ({ name }: { name: string }) => {
  return (
    <div className={styles.gift}>
      <div className={styles.gift__image}>
        {/* <img src="/images/png/last-gift.png" alt="Подарок" /> */}
      </div>
      <div className={styles.gift__hero}>
        {/* <img>mambaBlackz</img> */}
        <div className={styles.gift__hero__img} />
        <span className={styles.gift__hero__name}>{name}</span>
      </div>
      <div className={styles.gift__time}>12 мин назад</div>
    </div>
  )
}

export default TimerPromo
