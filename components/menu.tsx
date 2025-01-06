import { scrollReducer, getSection } from '@/redux/reducers/scrollReducer'
import React from "react"
import { useSelector } from "react-redux"

const Menu = (props) => {
  const resolution = props.resolution
  const scrollY = useSelector(scrollReducer.selectors.getScrollY)

  function toggleMenu(position) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    })
  }

  const categories = [
    { number: "01", ...getSection("Главная") },
    { number: "02", ...getSection("Преимущества") },
    { number: "03", ...getSection("Возможности") },
    { number: "04", ...getSection("Кейсы") },
    { number: "05", ...getSection("Команда") },
    { number: "06", ...getSection("Подписка") },
    { number: "07", ...getSection("Отзывы") },
    { number: "08", ...getSection("FAQ") },
  ]

  return (
    <>
      {resolution != "lgg" || resolution != "lg" ? (
        <div className="app__menu">
          {categories.map((elem, index) => {
            const position = elem.getPosition()
            return (
              <div
                className="app__menu__category"
                onClick={() => toggleMenu(position)}
                key={index}
              >
                <div className="number">{elem.number}</div>
                <div className="name">{elem.name}</div>
                {scrollY >= position &&
                (index == categories.length - 1 ||
                  scrollY < categories[index + 1].getPosition()) ? (
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
