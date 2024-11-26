"use client"
import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import * as Collapsible from "@radix-ui/react-collapsible"

import Countdown from "@/components/countdown"

import styles from "./TimerPromo.module.scss"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { IContainers, ILastOpenedContainer } from "@/types/promo-types"
import DialogPromo from "@/components/DialogPromo/DialogPromo"
import { useAppDispatch } from "@/redux/hooks"
import { getColorByRarity } from "./getColorByRarity"
import { calculateTimeDifference } from "./calculateTimeDifference"
import { Swiper, SwiperSlide } from "swiper/react"

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

const endDate = 1732827540000
const ID_URL = process.env.NEXT_PUBLIC_ID_URL + "/api/v1/"

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
      const response = await axios.get<IContainers>(
        ID_URL + "crypton-events/containers/"
      )

      return response.data
    },
  })

  const prizesCount = containers?.containers[0].prizes.reduce(
    (acc, el) => acc + el.remainingQuantity,
    0
  )

  const {
    data: openedBoxes,
    isError: isOpenedBoxesError,
    isLoading: isOpenedBoxesLoading,
  } = useQuery({
    queryKey: ["openedBoxes"],
    queryFn: async () => {
      const response = await axios.get<ILastOpenedContainer[]>(
        ID_URL + "crypton-events/last-opened-containers/"
      )

      return response.data
    },
    refetchInterval: 60000,
  })

  const swiperRef = useRef(null)
  const [currentBlock, setCurrentBlock] = useState(0)

  const [renderedItems, setRenderedItems] = useState([])
  useEffect(() => {
    if (openedBoxes?.length > renderedItems.length) {
      const newItems = openedBoxes.slice(
        0,
        openedBoxes.length - renderedItems.length
      )
      setRenderedItems([...newItems, ...renderedItems])
    }
  }, [openedBoxes])

  return (
    <>
      <div className={styles.timer} id="gifts">
        {/* <div className={styles.timer__image} /> */}
        {/* <div className={styles.timer__gifts}>
          <h1 className={styles.CollapsibleContent__title}>
            Осталось подарков: {prizesCount}
          </h1>
        </div> */}

        <div className={styles.timer__time}>
          <div className={styles.timer__time__image} />
          <h1 className={styles.timer__title}>
            Максимальные скидки 1 раз в год!
          </h1>

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
        {/* <div className={styles.timer__bg} /> */}
      </div>
      <div id="subscriber1123" className={styles.timer__subscriber}>
        .
      </div>
    </>
  )
}

const FullGift = ({
  text,
  image,
  description,
  remainingQuantity,
  rarity,
  bgColor,
  link,
  nftImageUrl,
}: {
  text?: string
  image?: string
  description?: string
  remainingQuantity?: number
  rarity?: string | null
  bgColor?: string | null
  link?: string | null
  nftImageUrl?: string | null
}) => {
  return (
    <DialogPromo
      description={description}
      name={text}
      rarity={rarity}
      bgColor={bgColor}
      imgSrc={image}
      link={link}
      nftImageUrl={nftImageUrl}
    >
      <div className={styles.fullGift}>
        <div className={styles.fullGift__image}>
          {image && <img src={image} alt={text} />}
        </div>
        <span className={styles.fullGift__text}>{text}</span>
        {/* <div
          className={styles.fullGift__line}
          style={{ background: getColorByRarity(rarity, bgColor) }}
        /> */}
        {remainingQuantity !== undefined && (
          <div
            className={styles.fullGift__count}
            style={{ background: getColorByRarity(rarity, bgColor) }}
          >
            {remainingQuantity}
          </div>
        )}
      </div>
    </DialogPromo>
  )
}

const LastGift = ({
  openedDatetime,
  prizeImageUrl,
  prizeTitle,
  userProfileAvatar,
  userProfileName,
  prizeDescription,
  prizeRarity,
  prizeNftImageUrl,
  prizeLink,
}: ILastOpenedContainer) => {
  return (
    <div className={styles.gift}>
      <DialogPromo
        description={prizeDescription}
        name={prizeTitle}
        rarity={prizeRarity}
        imgSrc={prizeImageUrl}
        nftImageUrl={prizeNftImageUrl}
        link={prizeLink}
      >
        <div className={styles.gift__image}>
          <img src={prizeImageUrl} alt={prizeTitle} />
        </div>
      </DialogPromo>

      <div className={styles.gift__hero}>
        <div
          className={styles.gift__hero__img}
          style={{ backgroundImage: `url(${userProfileAvatar})` }}
        />
        <span className={styles.gift__hero__name}>{userProfileName}</span>
      </div>
      <div className={styles.gift__time}>
        {calculateTimeDifference(openedDatetime)}
      </div>
    </div>
  )
}

export default TimerPromo

const Arrow = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="41"
    height="14"
    viewBox="0 0 41 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.7172 1L39.374 6.65685L33.7172 12.3137"
      stroke="white"
      strokeWidth="2"
    />
    <path d="M38.4 6.7168H0" stroke="white" strokeWidth="2" />
  </svg>
)
