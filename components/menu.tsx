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
        lgg: 980,
        lg: 780,
      },
    },
    {
      number: "03",
      name: "Возможности",
      position: {
        lgg: 1750,
        lg: 1450,
      },
    },
    {
      number: "04",
      name: "Кейсы",
      position: {
        lgg: 4378,
        lg: 3748,
      },
    },
    {
      number: "05",
      name: "Команда",
      position: {
        lgg: 5372,
        lg: 4650,
      },
    },
    {
      number: "06",
      name: "Подписка",
      position: {
        lgg: 8880,
        lg: 7910,
      },
    },
    {
      number: "07",
      name: "Отзывы",
      position: {
        lgg: 9790,
        lg: 8700,
      },
    },
    {
      number: "08",
      name: "FAQ",
      position: {
        lgg: 11300,
        lg: 9950,
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
