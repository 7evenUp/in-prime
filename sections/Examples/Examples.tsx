import React, { useRef, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import clsx from "clsx"

import ToggleLeft from "@/public/images/jsx/icons/toggle-left"
import ToggleRight from "@/public/images/jsx/icons/toggle-right"

import { examples } from "@/data/examples"

import { scrollToSection } from "@/redux/reducers/scrollReducer"

import { Resolution } from "@/types/resolution"

import styles from "./Examples.module.scss"

const spaces = {
  lgg: 22,
  lg: 22,
  md: 22,
  sm: 20,
}

const width = {
  lgg: 307,
  lg: 307,
  md: 307,
  sm: 270,
}

const Examples = ({ resolution }: { resolution: Resolution }) => {
  const [currentBlock, setCurrentBlock] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(0)
  const [showDescription, setShowDescription] = useState(-1)

  const scrollToSubscriptions = () => scrollToSection("Подписка")

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

  return (
    <div className={styles.container} id="examples">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Prime — стабильный
          <br />
          <span>источник заработка</span>
        </h1>
        <div className={styles.examples_content}>
          <div className={styles.examples_content__header}>
            <div className={styles.examples_content__header__months}>
              {Object.keys(examples).map((month, monthIndex) => (
                <div
                  className={clsx(
                    styles.examples_content__header__months__month,
                    monthIndex === currentMonth && styles.active
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
            className={styles.examples_content__blocks}
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
                const swiper_slide = (
                  <SwiperSlide
                    className={styles.examples_content__blocks__block}
                    key={title + projectIndex}
                    style={{
                      opacity:
                        projectIndex < currentBlock
                          ? 0.5
                          : projectIndex > currentBlock + 3
                          ? 0.5
                          : 1,
                    }}
                  >
                    <Image
                      src={img}
                      alt={title}
                      className={styles.examples_content__blocks__block__image}
                    />
                    <div
                      className={
                        styles.examples_content__blocks__block__content
                      }
                    >
                      <div
                        className={
                          styles.examples_content__blocks__block__content__title
                        }
                      >
                        {title}
                      </div>
                      <div className={styles.earned}>
                        <span className={styles.earned_title}>Заработано:</span>
                        <span className={styles.earned_value}>{earn}</span>
                      </div>
                      <div className={styles.invested}>
                        <span className={styles.invested_title}>Вложения:</span>
                        <span className={styles.invested_value}>{spend}</span>
                      </div>

                      <div
                        className={
                          styles.examples_content__blocks__block__content__cat_and_more
                        }
                      >
                        <div
                          className={
                            styles.examples_content__blocks__block__content__cat_and_more__cat
                          }
                        >
                          {category}
                        </div>
                        <div
                          className={clsx(
                            styles.examples_content__blocks__block__content__cat_and_more__more,
                            styles.toggle
                          )}
                          onClick={() => toggleDescription(projectIndex)}
                        >
                          {showDescription == projectIndex
                            ? "Скрыть"
                            : "Подробнее"}
                        </div>
                      </div>

                      <div
                        className={
                          styles.examples_content__blocks__block__content__extended_info
                        }
                        aria-expanded={showDescription != projectIndex}
                      >
                        <div
                          className={
                            styles.examples_content__blocks__block__content__extended_info__condition_title
                          }
                        >
                          Условия:
                        </div>
                        <div
                          className={
                            styles.examples_content__blocks__block__content__extended_info__condition_description
                          }
                        >
                          {condition}
                        </div>
                        {resources ? (
                          <>
                            <div
                              className={
                                styles.examples_content__blocks__block__content__extended_info__resources_title
                              }
                            >
                              Ресурсы:
                            </div>
                            <div
                              className={
                                styles.examples_content__blocks__block__content__extended_info__resources_description
                              }
                            >
                              {resources}
                            </div>
                          </>
                        ) : null}

                        {reportUrl != "crypton.xyz" && (
                          <a href={reportUrl} target="_blank">
                            <div
                              className={
                                styles.examples_content__blocks__block__content__extended_info__full_report
                              }
                            >
                              <div
                                className={
                                  styles.examples_content__blocks__block__content__extended_info__full_report__text
                                }
                              >
                                Событие в Calendar
                              </div>
                              <div
                                className={
                                  styles.examples_content__blocks__block__content__extended_info__full_report__arrow
                                }
                              />
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                )
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

        <button className={styles.button} onClick={scrollToSubscriptions}>
          Хочу так же
        </button>
      </div>
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
    <div className={styles.examples_content__header__toggle}>
      <div
        className={styles.examples_content__header__toggle__arrow}
        onClick={() => toggleBlock("down")}
      >
        <ToggleLeft opacity={currentBlock === 0 ? 0.5 : 1} />
      </div>
      {resolution === "lgg" && (
        <div className={styles.examples_content__header__toggle__count}>
          <span>{currentBlock + 1}</span>/<span>{projectsLength}</span>
        </div>
      )}
      <div
        className={styles.examples_content__header__toggle__arrow}
        onClick={() => toggleBlock("up")}
      >
        <ToggleRight opacity={currentBlock === projectsLength - 1 ? 0.5 : 1} />
      </div>
    </div>
  )
}
