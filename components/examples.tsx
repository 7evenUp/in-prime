import React, { useRef, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import ToggleLeft from "../public/images/jsx/icons/toggle-left"
import ToggleRight from "../public/images/jsx/icons/toggle-right"

import { examples } from "@/data/examples"

import { Resolution } from "@/types/resolution"
import clsx from "clsx"

const LINEAR_GRADIENTS = [
  "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
  "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
  "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
]

const spaces = {
  lgg: 22,
  lg: 22,
  md: 22,
  sm: 20,
}

const width = {
  lgg: 400,
  lg: 400,
  md: 400,
  sm: 270,
}

const Examples = ({ resolution }: { resolution: Resolution }) => {
  const [currentBlock, setCurrentBlock] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(0)
  const [showDescription, setShowDescription] = useState(-1)

  const swiperRef = useRef(null)

  const changeBlock = (index: number) => {
    setCurrentBlock(index)
    setShowDescription(-1)
  }

  const toggleMonth = (monthIndex: number) => {
    if (currentMonth == monthIndex) {
      swiperRef.current?.swiper.slideTo(0)
      setCurrentMonth(0)
      setCurrentBlock(0)
      setShowDescription(-1)
    } else {
      setCurrentMonth(monthIndex)
      swiperRef.current?.swiper.slideTo(0)
      setCurrentBlock(0)
      setShowDescription(-1)
    }
  }

  const toggleBlock = (action: "up" | "down") => {
    if (
      action == "up" &&
      currentBlock < Object.entries(examples)[currentMonth][1].length - 1
    ) {
      swiperRef.current?.swiper.slideTo(currentBlock + 1)
      setCurrentBlock(currentBlock + 1)
      setShowDescription(-1)
    } else if (action == "down" && currentBlock > 0) {
      swiperRef.current?.swiper.slideTo(currentBlock - 1)

      setCurrentBlock(currentBlock - 1)
      setShowDescription(-1)
    }
  }

  const toggleDescription = (currentDescription: number) => {
    if (showDescription == currentDescription) {
      setShowDescription(-1)
    } else {
      setShowDescription(currentDescription)
    }
  }

  let currentGradient = 0
  return (
    <div className="examples-content">
      <div className="examples-content__header">
        <div className="examples-content__header__months">
          {Object.keys(examples).map((month, monthIndex) => (
            <div
              className={clsx(
                "examples-content__header__months__month",
                monthIndex === currentMonth && "active"
              )}
              onClick={() => toggleMonth(monthIndex)}
              key={monthIndex}
            >
              {month}
            </div>
          ))}
        </div>

        {["lgg", "lg"].includes(resolution) && (
          <PaginationToggle
            currentBlock={currentBlock}
            currentMonth={currentMonth}
            toggleBlock={toggleBlock}
            resolution={resolution}
          />
        )}
      </div>

      <Swiper
        // @ts-ignore
        ref={swiperRef}
        onSlideChange={(swiper) => changeBlock(swiper.activeIndex)}
        initialSlide={currentBlock}
        className="examples-content__blocks"
        spaceBetween={spaces[resolution]}
        slidesPerView={1}
        style={{ width: width[resolution] }}
      >
        {Object.entries(examples)[currentMonth][1].map(
          (
            {
              category,
              condition,
              earn,
              reportUrl,
              resources,
              spend,
              title,
              img,
            },
            projectIndex
          ) => {
            // if (currentGradient >= LINEAR_GRADIENTS.length) {
            //   currentGradient = 0
            // }

            const swiper_slide = (
              <SwiperSlide
                className="examples-content__blocks__block"
                key={title + projectIndex}
                style={{
                  opacity:
                    projectIndex < currentBlock
                      ? 0.5
                      : projectIndex > currentBlock + 2
                      ? 0.5
                      : 1,
                }}
              >
                <div
                  className="examples-content__blocks__block__gradient"
                  // style={{ background: LINEAR_GRADIENTS[currentGradient] }}
                />
                <Image
                  src={img}
                  alt={title}
                  className="examples-content__blocks__block__image"
                />
                <div className="examples-content__blocks__block__content">
                  <div className="examples-content__blocks__block__content__title ">
                    {title}
                  </div>
                  <div className="examples-content__blocks__block__content__in-out">
                    <div className="examples-content__blocks__block__content__in-out__col">
                      <div className="examples-content__blocks__block__content__in-out__col__title">
                        Заработано:
                      </div>
                      <div className="examples-content__blocks__block__content__in-out__col__sum">
                        {earn}
                      </div>
                    </div>

                    <div className="examples-content__blocks__block__content__in-out__col out">
                      <div className="examples-content__blocks__block__content__in-out__col__title white">
                        Вложения:
                      </div>
                      <div className="examples-content__blocks__block__content__in-out__col__sum white">
                        {spend}
                      </div>
                    </div>
                  </div>

                  <div className="examples-content__blocks__block__content__cat-and-more">
                    <div className="examples-content__blocks__block__content__cat-and-more__cat">
                      {category}
                    </div>
                    <div
                      className="examples-content__blocks__block__content__cat-and-more__more toggle"
                      onClick={() => toggleDescription(projectIndex)}
                    >
                      {showDescription == projectIndex ? "Скрыть" : "Подробнее"}
                    </div>
                  </div>

                  <div
                    className="examples-content__blocks__block__content__extended-info"
                    aria-expanded={showDescription != projectIndex}
                  >
                    <div className="examples-content__blocks__block__content__extended-info__condition-title">
                      Условия:
                    </div>
                    <div className="examples-content__blocks__block__content__extended-info__condition-description">
                      {condition}
                    </div>
                    {resources ? (
                      <>
                        <div className="examples-content__blocks__block__content__extended-info__resources-title">
                          Ресурсы:
                        </div>
                        <div className="examples-content__blocks__block__content__extended-info__resources-description">
                          {resources}
                        </div>
                      </>
                    ) : null}

                    {reportUrl != "crypton.xyz" && (
                      <a href={reportUrl} target="_blank">
                        <div className="examples-content__blocks__block__content__extended-info__full-report">
                          <div className="examples-content__blocks__block__content__extended-info__full-report__text">
                            Событие в Calendar
                          </div>
                          <div className="examples-content__blocks__block__content__extended-info__full-report__arrow" />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )
            // currentGradient++
            return swiper_slide
          }
        )}
      </Swiper>

      {/* {["md", "sm"].includes(resolution) && (
        <PaginationToggle
          currentBlock={currentBlock}
          currentMonth={currentMonth}
          toggleBlock={toggleBlock}
          resolution={resolution}
        />
      )} */}
    </div>
  )
}

export default Examples

const PaginationToggle = ({
  toggleBlock,
  currentBlock,
  currentMonth,
  resolution,
}: {
  currentMonth: number
  currentBlock: number
  resolution: Resolution
  toggleBlock: (action: "up" | "down") => void
}) => {
  const projectsLength = Object.entries(examples)[currentMonth][1].length

  return (
    <div className="examples-content__header__toggle">
      <div
        className="examples-content__header__toggle__arrow"
        onClick={() => toggleBlock("down")}
      >
        <ToggleLeft opacity={currentBlock === 0 ? 0.5 : 1} />
      </div>
      {resolution === "lgg" && (
        <div className="examples-content__header__toggle__count">
          <span>{currentBlock + 1}</span>/<span>{projectsLength}</span>
        </div>
      )}
      <div
        className="examples-content__header__toggle__arrow"
        onClick={() => toggleBlock("up")}
      >
        <ToggleRight opacity={currentBlock === projectsLength - 1 ? 0.5 : 1} />
      </div>
    </div>
  )
}
