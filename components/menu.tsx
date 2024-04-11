import React from "react"
import { useState } from "react"
import { useEffect } from "react" // don't forget

const Menu = (props) => {
  const resolution = props.resolution
  const currentY = props.currentY
  const setCurrentY = props.setCurrentY

  function toggleMenu(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
    setCurrentY(position)
  }

  const categories = [
    {
      number: "01",
      name: "Главная",
      position: {
        lgg: 0,
        lg: 0,
      },
    },
    {
      number: "02",
      name: "Преимущества",
      position: {
        lgg: 984,
        lg: 780,
      },
    },
    {
      number: "03",
      name: "Возможности",
      position: {
        lgg: 1812,
        lg: 1450,
      },
    },
    {
      number: "04",
      name: "Кейсы",
      position: {
        lgg: 4366,
        lg: 3765,
      },
    },
    {
      number: "05",
      name: "Команда",
      position: {
        lgg: 6267,
        lg: 5505,
      },
    },
    {
      number: "06",
      name: "Подписка",
      position: {
        lgg: 7597,
        lg: 6737,
      },
    },
    {
      number: "07",
      name: "Отзывы",
      position: {
        lgg: 8400,
        lg: 7559,
      },
    },
    {
      number: "08",
      name: "FAQ",
      position: {
        lgg: 10670,
        lg: 9472,
      },
    },
  ]
  return (
    <>
      {resolution != "lgg" || resolution != "lg" ? (
        <div className="app__menu">
          {categories.map((elem, index) => {
            return (
              <div
                className="app__menu__category"
                onClick={() => toggleMenu(elem.position[resolution])}
                key={index}
              >
                <div className="number">{elem.number}</div>
                <div className="name">{elem.name}</div>
                {currentY >= elem.position[resolution] &&
                (index == categories.length - 1 ||
                  currentY < categories[index + 1].position[resolution]) ? (
                  <div className="vector"></div>
                ) : (
                  ""
                )}
              </div>
            )
          })}
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Menu
