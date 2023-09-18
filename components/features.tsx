import React, { useState } from "react"

const categories = [
  {
    title: "Закрытый чат",
    cords: {
      lgg: {
        left: "72px",
        top: "100px",
      },
      lg: {
        left: "12px",
        top: "77px",
      },
      md: {
        left: "30px",
        top: "113px",
      },
      sm: {
        left: "-50px",
        top: "232px",
      },
    },
    description:
      "Все знают пословицу “С кем поведешься, от того и наберешься”, это про наш чат! Дружное сообщество единомышленников, новые знания и знакомства, получение опыта и квалификации.",
    gradient:
      "linear-gradient(287.14deg, rgba(255, 255, 255, 0.2) 6.09%, rgba(255, 255, 255, 0) 89.79%)",
    position: {
      lgg: "up",
      lg: "up",
      md: "up",
      sm: "up",
    },
  },
  {
    title: "Авторский контент",
    cords: {
      lgg: {
        left: "413px",
        top: "5px",
      },
      lg: {
        left: "338px",
        top: "-11px",
      },
      md: {
        left: "178px",
        top: "29px",
      },
      sm: {
        left: "87px",
        top: "34px",
      },
    },
    description:
      "Команда Prime состоит из опытных экспертов по каждому направлению заработка в крипте: от NFT и НОД до ТЕСТНЕТОВ и РЕТРОДРОПОВ. Наши авторы ведут свои “колонки”, публикуя перспективные события, инструкции, мысли и рекомендации.",
    gradient:
      "linear-gradient(142.54deg, rgba(255, 255, 255, 0) 6.15%, rgba(255, 255, 255, 0.2) 86.27%)",
    position: {
      lgg: "up",
      lg: "up",
      md: "up",
      sm: "up",
    },
  },
  {
    title: "Календарь событий",
    cords: {
      lgg: {
        left: "803px",
        top: "1px",
      },
      lg: {
        left: "685px",
        top: "15px",
      },
      md: {
        left: "409px",
        top: "9px",
      },
      sm: {
        left: "235px",
        top: "8px",
      },
    },
    description:
      "В подписку Prime бонусом входит наш отдельно разработанный продукт “Crypton календарь”. Благодаря ему крайне удобно отслеживать все предстоящие события по заработку в криптовалюте, изучать аналитику от команды и получать пошаговые инструкции.",
    gradient:
      "linear-gradient(84.24deg, rgba(255, 255, 255, 0.2) 19.72%, rgba(255, 255, 255, 0) 110.72%)",
    position: {
      lgg: "up",
      lg: "up",
      md: "up",
      sm: "up",
    },
  },
  {
    title: "Трансляции по заработку ",
    cords: {
      lgg: {
        left: "1064px",
        top: "91px",
        width: "350px",
      },
      lg: {
        left: "977px",
        top: "78px",
        width: "250px",
      },
      md: {
        left: "497px",
        top: "85px",
        width: "283px",
      },
      sm: {
        left: "209px",
        top: "121px",
      },
    },
    description:
      "Раз в неделю мы проводим прямые трансляции, где наши эксперты в режиме реального времени выполняют актуальные события по заработку, параллельно отвечая на все вопросы участников.",
    gradient:
      "linear-gradient(94.9deg, rgba(255, 255, 255, 0.1) 3.95%, rgba(255, 255, 255, 0) 112.19%)",
    position: {
      lgg: "up",
      lg: "up",
      md: "up",
      sm: "up",
    },
  },
  {
    title: "Личный помощник",
    cords: {
      lgg: {
        left: "1070px",
        top: "357px",
      },
      lg: {
        left: "973px",
        top: "302px",
      },
      md: {
        left: "519px",
        top: "228px",
      },
      sm: {
        left: "179px",
        top: "228px",
      },
    },
    description:
      "Появился вопрос? Что-то не получается? Запутались или не знаете, с чего начать? Мы в беде не оставим! За любой помощью вы всегда можете обращаться к опытному помощнику с глубокой экспертизой и большим опытом за плечами — Наставнику.",
    gradient:
      "linear-gradient(127.95deg, rgba(255, 255, 255, 0.2) 11.73%, rgba(255, 255, 255, 0) 93.8%)",
    position: {
      lgg: "down",
      lg: "down",
      md: "down",
      sm: "down",
    },
  },
  {
    title: "Фонд",
    cords: {
      lgg: {
        left: "830px",
        top: "457px",
      },
      lg: {
        left: "772px",
        top: "407px",
      },
      md: {
        left: "421px",
        top: "313px",
      },
      sm: {
        left: "90px",
        top: "310px",
      },
    },
    description: null,
    gradient:
      "linear-gradient(145.39deg, rgba(255, 255, 255, 0.2) 16.33%, rgba(255, 255, 255, 0) 89.11%)",
    position: {
      lgg: "down",
      lg: "down",
      md: "down",
      sm: "down",
    },
  },
  {
    title: "Гарантия окупаемости подписки",
    cords: {
      lgg: {
        left: "256px",
        top: "465px",
        fontSize: "1px",
      },
      lg: {
        left: "217px",
        top: "409px",
      },
      md: {
        left: "68px",
        top: "349px",
      },
      sm: {
        left: "-49px",
        top: "351px",
      },
    },
    description:
      "Мы уверены в своих силах и экспертизе, поэтому у нас всегда можно найти события по заработку, выполняя которые вы как минимум гарантировано окупаете стоимость подписки.",
    gradient:
      "linear-gradient(213.55deg, rgba(255, 255, 255, 0.2) 18.33%, rgba(255, 255, 255, 0) 89.03%)",
    position: {
      lgg: "down",
      lg: "down",
      md: "down",
      sm: "down",
    },
  },
  {
    title: "Живое общение",
    cords: {
      lgg: {
        left: "-33px",
        top: "363px",
      },
      lg: {
        left: "-24px",
        top: "314px",
      },
      md: {
        left: "-20px",
        top: "269px",
      },
      sm: {
        left: "-12px",
        top: "115px",
      },
    },
    description:
      "Посещайте наши закрытые голосовые сессии, на которых мы обсуждаем актуальные темы, важные события и горячие новости. Также в формате Вопрос-Ответ мы проводим АМА-сессии с экспертами из команды, участниками сообщества, гостями и основателем проекта Павлом, где каждый участник может задать любой интересующий вопрос или просто в удовольствие пообщаться.",
    gradient:
      "linear-gradient(240.95deg, rgba(255, 255, 255, 0.2) 12.5%, rgba(255, 255, 255, 0) 81.9%)",
    position: {
      lgg: "down",
      lg: "down",
      md: "up",
      sm: "up",
    },
  },
]

function Features(props) {
  const [mapIndex, setMapIndex] = useState(-1)
  const [hovered, setHovered] = useState(-1)

  function toggle(currentIndex) {
    currentIndex == mapIndex ? setMapIndex(-1) : setMapIndex(currentIndex)
  }

  return (
    <div className="app__container__features">
      <div className="app__container__features__title">
        Что входит в подписку
      </div>
      <div className="app__container__features__bubbles">
        {categories.map((elem, index) => {
          return elem.position[props.resolution] == "up" ? (
            <div
              className="features-category"
              style={{
                top: elem.cords[props.resolution].top,
                left: elem.cords[props.resolution].left,
              }}
              key={index}
            >
              <div
                className="features-category__title "
                style={{
                  width:
                    elem.title == "Трансляции по заработку "
                      ? elem.cords[props.resolution].width
                      : "auto",
                }}
              >
                {elem.title}
              </div>
              <div
                className={`features-category__circle ${
                  index == mapIndex || index == hovered ? "selected" : ""
                }`}
                style={{
                  background:
                    index != mapIndex && index != hovered ? elem.gradient : "",
                  transition: "0.5s",
                }}
                // onClick={() => toggle(index)}
                onMouseEnter={() => {
                  toggle(index)
                }}
                onMouseLeave={() => {
                  toggle(-1)
                }}
              ></div>
              {index == mapIndex ? (
                <div
                  className={`backlight small ${
                    elem.position[props.resolution]
                  }`}
                ></div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div
              className="features-category"
              style={{
                top: elem.cords[props.resolution].top,
                left: elem.cords[props.resolution].left,
              }}
              key={index}
            >
              <div
                className={`features-category__circle ${
                  index == mapIndex || index == hovered ? "selected" : ""
                }`}
                style={{
                  background:
                    index != mapIndex && index != hovered ? elem.gradient : "",
                  transition: "0.5s",
                }}
                // onClick={() => toggle(index)}
                onMouseEnter={() => {
                  toggle(index)
                }}
                onMouseLeave={() => {
                  toggle(-1)
                }}
              ></div>
              {index == mapIndex ? (
                <div
                  className={`backlight small ${
                    elem.position[props.resolution]
                  }`}
                ></div>
              ) : (
                ""
              )}
              <div className="features-category__title ">{elem.title}</div>
            </div>
          )
        })}

        <div className="app__container__features__bubbles__map">
          <div className="app__container__features__logo"></div>
          <div className="backlight big"></div>
        </div>
      </div>
      {mapIndex == -1 ? (
        <div className="app__container__features__description default ">
          НАВЕДИТЕ НА КАТЕГОРИЮ ДЛЯ ВЗАИМОДЕЙСТВИЯ
        </div>
      ) : (
        <div className="app__container__features__description ">
          {categories[mapIndex].description}
        </div>
      )}
    </div>
  )
}

export default Features
