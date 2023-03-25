import React, { useState } from "react";

const categories = [
  {
    title: "Чаты",
    cords: {
      lgg: {
        left: "123px",
        top: "100px",
      },
      lg: {
        left: "57px",
        top: "77px",
      },
      md: {
        left: "70px",
        top: "113px",
      },
      sm: {
        left: "-29px",
        top: "232px",
      },
    },
    description:
      "Наши подписчики активно общаются и делятся интересными материалами в трёх чатах: общем, NFT и о нодах. Тут вы всегда можете подискутировать на любую интересную вам тему в криптовалюте и найти единомышлеников.",
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
    title: "Публикации",
    cords: {
      lgg: {
        left: "454px",
        top: "5px",
      },
      lg: {
        left: "372px",
        top: "-10px",
      },
      md: {
        left: "208px",
        top: "29px",
      },
      sm: {
        left: "97px",
        top: "34px",
      },
    },
    description:
      "Каждый день мы публикуем различные варианты заработка с подробными инструкциями. Все публикуемые рубрики подходят как новичкам, так и продвинутым пользователям, покрывая почти все направления криптовалюты: от ретроспективных аирдропов до NFT, от продаж токенов до нод, амбассадорские программы, тестнеты, вайтлисты и многое-многое другое!",
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
    title: "Календарь",
    cords: {
      lgg: {
        left: "857px",
        top: "1px",
      },
      lg: {
        left: "731px",
        top: "15px",
      },
      md: {
        left: "449px",
        top: "9px",
      },
      sm: {
        left: "224px",
        top: "7px",
      },
    },
    description:
      "Расписание лучших событий по заработку в криптовалюте. Календарь не только отображает все актуальные события в различных направлениях, но и индивидуально подберет их под вас, учитывая ваш баланс.",
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
    title: "Сводки",
    cords: {
      lgg: {
        left: "1198px",
        top: "93px",
      },
      lg: {
        left: "1068px",
        top: "82px",
      },
      md: {
        left: "608px",
        top: "85px",
      },
      sm: {
        left: "248px",
        top: "121px",
      },
    },
    description:
      "Чтобы вы не пропускали лучшую информацию с наших чатов, каждое утро мы готовим для вас Ежедневную сводку, где отмечаем сообщения, достойные вашего внимания. А вечерняя Сводка активностей Prime напомнит о событиях, в которых точно стоит поучаствовать.",
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
    title: "Наставник",
    cords: {
      lgg: {
        left: "1115px",
        top: "357px",
      },
      lg: {
        left: "1013px",
        top: "302px",
      },
      md: {
        left: "551px",
        top: "228px",
      },
      sm: {
        left: "207px",
        top: "226px",
      },
    },
    description:
      "Ваш друг и помощник, который выручит в любом вопросе в сфере криптовалют и сориентирует вас в рамках подписки Prime. ",
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
    title: "Система лояльности",
    cords: {
      lgg: {
        left: "743px",
        top: "457px",
      },
      lg: {
        left: "697px",
        top: "407px",
      },
      md: {
        left: "357px",
        top: "313px",
      },
      sm: {
        left: "83px",
        top: "309px",
      },
    },
    description:
      "Мы поощряем наших активных подписчиков за их вклад в сообщество бесплатными подписками, вайтлистами в крутые проекты и другими подарками!",
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
    title: "АМА-сессии",
    cords: {
      lgg: {
        left: "372px",
        top: "466px",
      },
      lg: {
        left: "314px",
        top: "409px",
      },
      md: {
        left: "153px",
        top: "347px",
      },
      sm: {
        left: "-29px",
        top: "350px",
      },
    },
    description:
      "Основатель Crypton Павел Сычев (EnjoyMaloy) и команда Prime часто устраивают общие и тематические АМА-сессии (с англ. Ask Me Anything — спросите меня о чем угодно) для общения и прямого взаимодействия с сообществом.",
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
    title: "Складчины",
    cords: {
      lgg: {
        left: "-5px",
        top: "363px",
      },
      lg: {
        left: "-2px",
        top: "314px",
      },
      md: {
        left: "0px",
        top: "269px",
      },
      sm: {
        left: "-10px",
        top: "115px",
      },
    },
    description:
      "Не хватает токенов для участия в IDO? Нету возможности пройти KYC? Тогда функция участия в складчининах для вас.",
    gradient:
      "linear-gradient(240.95deg, rgba(255, 255, 255, 0.2) 12.5%, rgba(255, 255, 255, 0) 81.9%)",
    position: {
      lgg: "down",
      lg: "down",
      md: "up",
      sm: "up",
    },
  },
];

function Features(props) {
  const [mapIndex, SetMapIndex] = useState(-1);
  //background: radial-gradient(106.67% 106.67% at 26.67% 88.33%, #FF4A7A 1.04%, #BB44CC 100%) !important;

  const [hovered, setHovered] = useState(-1);

  function toggle(currentIndex) {
    currentIndex == mapIndex ? SetMapIndex(-1) : SetMapIndex(currentIndex);
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
              <div className="features-category__title ">{elem.title}</div>
              <div
                className={`features-category__circle ${
                  index == mapIndex || index == hovered ? "selected" : ""
                }`}
                style={{
                  background:
                    index != mapIndex && index != hovered ? elem.gradient : "",
                }}
                // onClick={() => toggle(index)}
                onMouseEnter={() => {setHovered(index); toggle(index)}}
                // onMouseLeave={() => setHovered(-1)}
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
                }}
                // onClick={() => toggle(index)}
                onMouseEnter={() => {setHovered(index); toggle(index)}}
                // onMouseLeave={() => setHovered(-1)}
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
          );
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
  );
}

export default Features;
