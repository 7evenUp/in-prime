import React from "react"

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
      position: 0,
    },
    {
      number: "02",
      name: "Преимущества",
      position:
        document.getElementById("benefits").offsetTop -
        document.getElementById("header").clientHeight,
    },
    {
      number: "03",
      name: "Возможности",
      position:
        document.getElementById("features").offsetTop -
        document.getElementById("header").clientHeight,
    },
    {
      number: "04",
      name: "Кейсы",
      position:
        document.getElementById("examples").offsetTop -
        document.getElementById("header").clientHeight,
    },
    {
      number: "05",
      name: "Команда",
      position:
        document.getElementById("founder").offsetTop -
        document.getElementById("header").clientHeight,
    },
    {
      number: "06",
      name: "Подписка",
      position:
        document.getElementById("subscribe").offsetTop -
        document.getElementById("header").clientHeight,
    },
    {
      number: "07",
      name: "Отзывы",
      position:
        document.getElementById("testimonials").offsetTop -
        document.getElementById("header").clientHeight,
    },
    {
      number: "08",
      name: "FAQ",
      position:
        document.getElementById("faq").offsetTop -
        document.getElementById("header").clientHeight,
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
                onClick={() => toggleMenu(elem.position)}
                key={index}
              >
                <div className="number">{elem.number}</div>
                <div className="name">{elem.name}</div>
                {currentY >= elem.position &&
                (index == categories.length - 1 ||
                  currentY < categories[index + 1].position) ? (
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
