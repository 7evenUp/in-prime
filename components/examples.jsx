import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import ToggleLeft from "/public/images/jsx/icons/toggle-left";
import ToggleRight from "/public/images/jsx/icons/toggle-right";

const examples = {
  январь: [
    {
      title: "NFT-whitelist Createra",
      earn: "$2300",
      spend: "$0",
      category: "NFT",
      condition: "Заполнить форму, проявлять активность в проекте.",
      resources: "От 30 минут.",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Airdrop боксов NFT от Link3",
      earn: "$300",
      spend: "$0",
      category: "Airdrop",
      condition:
        "Присутствовать на голосовых сессиях проектов и собрать определенное количество W3ST-токенов. Событие можно было масштабировать для увеличения шансов на победу.",
      resources: "$0 и 3 минуты времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Senior Pass на Bybit NFT",
      earn: "$87",
      spend: "$4",
      category: "NFT",
      condition: "Успеть купить NFT.",
      resources: "$4 и 5 минут времени.",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
  ],
  "август-декабрь 2022": [
    {
      title: "Airdrop токенов $SFP от Safepal",
      earn: "$210",
      spend: "$0",
      category: "Airdrop",
      condition:
        "Выполнить задания. Чем больше заданий выполнили, тем больше была награда.",
      resources: "15 минут на 1 аккаунт",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "NFT от AltLayer",
      earn: "$375",
      spend: "$100",
      category: "NFT",
      condition:
        "Выполнить задания на сайте, после чего можно было получить WL, который давал право принять участие в NFT-сейле.",
      resources: "15 минут",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "NFT-whitelist от Fates",
      earn: "$180",
      spend: "$0",
      category: "NFT",
      condition: "Проявлять активность в проекте.",
      resources: "5–6 часов",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "NFT-whitelist в Shatter-\npoint",
      earn: "$30",
      spend: "$0",
      category: "NFT",
      condition: "Проявлять активность в проекте.",
      resources: "1–2 часов",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Раффл от Hashverse",
      earn: "$330",
      spend: "$0",
      category: "NFT",
      condition:
        "Необходимо было пройти регистрацию в самом розыгрыше на Magic Eden.",
      resources: "$0 и 3 минуты времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "WL от KPRVERSE ",
      earn: "до $1500",
      spend: "$15",
      category: "NFT",
      condition: "Нужно было просто заполнить форму.",
      resources: "от $0 и 30 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Тестнет Stride",
      earn: "$150",
      spend: "$15",
      category: "Node",
      condition:
        "Требовалось тестировать платформу, выполнять поставленные задания и установить ноду.",
      resources: "$15 и 3 часа времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "Конкурс мемов от Leech Protocol",
      earn: "до $500",
      spend: "$0",
      category: "AirDrop",
      condition:
        "Нужно было всего лишь создать мем и опубликовать его в твиттере и дискорде.",
      resources: "$0 и 10 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Ранняя активность в Lens",
      earn: "$40",
      spend: "$0",
      category: "Ретродроп",
      condition: "Требовалось просто заполнив форму.",
      resources: "$0 и 2 минуты времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Airdrop от Castaways",
      earn: "$52",
      spend: "$0",
      category: "GameFi",
      condition: "Нужно было просто играть в игру.",
      resources: "$0 и 20 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "WL в Mighty Hero Action",
      earn: "$260",
      spend: "$10",
      category: "NFT",
      condition:
        "Необходимо было заполнить форму и проявлять активность в проекте",
      resources: "$0 и 10 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Нода Aptos",
      earn: "$2400",
      spend: "от $7.5",
      category: "Node",
      condition:
        "Нужно было поставить ноду Aptos и принять участие в одной фазе, тем самым заполнив необходимую форму.",
      resources: "от $7.5 и 3 часов времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Раффл The Hopeful (Azra Games)",
      earn: "~$650",
      spend: "$0",
      category: "NFT",
      condition:
        "Необходимо было пройти регистрацию в самом розыгрыше на Magic Eden.",
      resources: "$0 и 3 минуты времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Викторина BNB Boost",
      earn: "до $45",
      spend: "$0",
      category: "AirDrop",
      condition: "Достаточно было ответить на вопросы викторины.",
      resources: "$0 и 10 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "Тестнет KYVE",
      earn: "до $100",
      spend: "$0",
      category: "Testnet",
      condition:
        "Требовалось тестировать протокол и выполнять поставленные задания, благодаря чему вы могли попасть в таблицу лидеров.",
      resources: "$0 и ~3 часа времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Бесплатная NFT от Aptos",
      earn: "$1200",
      spend: "$0",
      category: "NFT",
      condition: "Все, что нужно было - это забрать бесплатную NFT на сайте.",
      resources: "$0 и 2 минуты времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "IEO токенов hiSAND33",
      earn: "$60",
      spend: "$140",
      category: "Token Sale",
      condition:
        "Надлежало пройти KYC на бирже KuCoin и принять участие в FCFS-распродаже токенов (кто успел, тот и купил токены).",
      resources: "$140 и 10 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Публичное SHO Sweat Economy",
      earn: "$1300",
      spend: "$500",
      category: "NFT",
      condition:
        "Нужно было держать на кошельке $500, после чего пройти регистрацию в розыгрыше.",
      resources: "$500 и 5 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Раффл Wakuland на Magic Eden",
      earn: "~$55",
      spend: "~$45",
      category: "NFT",
      condition:
        "Требовалось пройти регистрацию в самом раффле, либо выбить WhiteList через Discord.",
      resources: "$45 и 5 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "Вайтлист токена hiODBS",
      earn: "$61",
      spend: "$24",
      category: "WhiteList",
      condition:
        "Достаточно было заполнить форму KuCoin и принять участие в FCFS-распродаже токенов (кто первый успел, тот и купил)",
      resources: "$10 и 10 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Тестнет Canto",
      earn: "до $3400",
      spend: "$0",
      category: "Testnet",
      condition:
        "Требовалось заполнить форму-заявку, благодаря которой у вас появлялась возможность запросить тестовые токены в сети Canto.",
      resources: "15 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Распродажа NFT-Egg",
      earn: "~15 $SOL",
      spend: "6.97 $SOL",
      category: "NFT Sale",
      condition:
        "Принять участие в продаже NFT на MechaFightClub. Начальные цены NFT составляли приблизительно 6.969 $SOL, а итоговый заработок зависел от редкости NFT.",
      resources: "6.969 SOL (270$ на момент сейла) и 2 минуты времени.",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Вайтлист OG Badge",
      earn: "до $600",
      spend: "$0",
      category: "Whitelist",
      condition:
        "Нужно было заполнить форму, выполнив простые задания. После этого победители, которые попали в WhiteList, приняли участие в распродаже NFT на AltLayer.",
      resources: "5 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "Продажа токенов hiSAND33",
      earn: "$210",
      spend: "$140",
      category: "Token Sale",
      condition:
        "Нужно было купить токены hiSAND33 на бирже KuCoin в формате FCFS, что значит “кто первый кликнул = тот и купил”.",
      resources: "$140 и 2 минуты времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Игровой ивент от Pikaster",
      earn: "от $40",
      spend: "$0",
      category: "Play-to-Earn",
      condition:
        "Достаточно было сыграть в саму игру и активно продвигаться в рейтинге. Стартовые вложения не требовались.",
      resources: "5-6 часов времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "IGO Binance's 5th Anniversary",
      earn: "$170",
      spend: "~$2",
      category: "NFT Sale",
      condition:
        "Нужно было удерживать 0.1 $BNB на спотовом кошельке аккаунта Binance, после чего выкупить билеты для участия в розыгрыше. 1 билет стоил 2 $BUSD, максимум 4 билета на аккаунт.",
      resources: "0.1 $BNB, 2–8 $BUSD и 5 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Публичное SHO beFITTER",
      earn: "$2000+",
      spend: "$200",
      category: "Token Sale",
      condition:
        "Перед событием достаточно было удерживать не менее $2500 в виде любых токенов на своем кошельке.",
      resources: "$2500 и 5 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Публичное SHO beFITTER",
      earn: "$150",
      spend: "~$10",
      category: "NFT Sale",
      condition:
        "Необходимо было удерживать 0.1 $BNB на спотовом кошельке аккаунта Binance, после чего выкупить билеты для участия в розыгрыше. 1 билет стоил 10 $BUSD, максимум 1 билет на аккаунт.",
      resources: "0.1 $BNB, 10 $BUSD и 5 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FFCD9F 0%, #FF4A7A 100%)",
    },
    {
      title: "Раффл от Ledger",
      earn: "0.5 $ETH",
      spend: "0.3 $ETH",
      category: "NFT Sale",
      condition:
        "Требовалось иметь на вашем кошельке минимум 0.1337 $ETH ( ~$420), а также выполнить задания. В случае победы в розыгрыше вам предстояло выкупить NFT за 0.3 $ETH.",
      resources: "0.3 $ETH ( ~160$) и 5 минут вашего времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "Раффл от POTATOZ",
      earn: "~1.7 $ETH",
      spend: "$0",
      category: "NFT Sale",
      condition:
        "Достаточно было иметь на кошельке 0.069 $ETH (~100$), после чего выполнить все задания. В случае победы в розыгрыше у вас появлялась возможность бесплатно заминить NFT на MEMELAND.",
      resources: "0.069 $ETH (~100$) и 5 минут вашего времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
    {
      title: "Token Sale проекта CUBE",
      earn: "$1500",
      spend: "$50",
      category: "Token Sale",
      condition:
        "Достаточно было совершить торговый оборот на сумму не менее $500, а также удерживать на спотовом кошельке Huobi $100, после чего случайным образом выбирали победителей, которые смогут выкупить аллокацию в $50.",
      resources: "$110 и 10 минут времени",
      reportUrl: "crypton.xyz",
      gradient:
        "linear-gradient(90deg, #BB44CC 0%, #8AAEFB 52.08%, #4AE0CE 100%)",
    },
    {
      title: "IEO проекта Walken",
      earn: "$120",
      spend: "$12.5",
      category: "Token Sale",
      condition:
        "Нужно было удерживать 100 $USDT на спотовом кошельке аккаунта ByBit, после чего выиграть аллокацию.",
      resources: "$100 и 5 минут времени",
      reportUrl: "crypton.xyz",
      gradient: "linear-gradient(90deg, #FF4A7A 0%, #BB44CC 100%)",
    },
  ],
};

const spaces = {
  lgg: 50,
  lg: 50,
  md: 52,
  sm: 20,
};

const width = {
  lgg: 400,
  lg: 400,
  md: 400,
  sm: 270,
};

function Examples(props) {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [showDescription, setShowDescription] = useState(-1);

  const swiperRef = useRef(null);
  swiperRef.current?.swiper.slideTo(currentBlock);

  function changeBlock(index) {
    setCurrentBlock(index);
  }

  function toggleMonth(monthIndex) {
    if (currentMonth == monthIndex) {
      setCurrentMonth(0);
      setCurrentBlock(0);
      setShowDescription(-1);
    } else {
      setCurrentMonth(monthIndex);
      setCurrentBlock(0);
      setShowDescription(-1);
    }
  }

  function toggleBlock(action) {
    if (
      action == "up" &&
      currentBlock < Object.entries(examples)[currentMonth][1].length - 1
    ) {
      setCurrentBlock(currentBlock + 1);
      setShowDescription(-1);
    } else if (action == "down" && currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
      setShowDescription(-1);
    }
  }

  function toggleDescription(currentDescription) {
    if (showDescription == currentDescription) {
      setShowDescription(-1);
    } else {
      setShowDescription(currentDescription);
    }
  }

  // console.log(Object.entries(examples)[currentMonth]);

  return (
    <div className="examples-content">
      <div className="examples-content__header">
        <div className="examples-content__header__months">
          {Object.keys(examples).map((elem, index) => {
            return (
              <div
                className="examples-content__header__months__month "
                style={{ opacity: `${index == currentMonth ? 0.5 : 1}` }}
                onClick={() => toggleMonth(index)}
              >
                {elem}
              </div>
            );
          })}
        </div>

        {["lgg", "lg"].includes(props.resolution) ? (
          <div className="examples-content__header__toggle">
            <div
              className="examples-content__header__toggle__arrow"
              onClick={() => toggleBlock("down")}
            >
              <ToggleLeft opacity={currentBlock == 0 ? 0.5 : 1} />
            </div>

            <div className="examples-content__header__toggle__elem ">{`${
              currentBlock + 1
            }/${Object.entries(examples)[currentMonth][1].length}`}</div>

            <div
              className="examples-content__header__toggle__arrow"
              onClick={() => toggleBlock("up")}
            >
              <ToggleRight
                opacity={
                  currentBlock ==
                  Object.entries(examples)[currentMonth][1].length - 1
                    ? 0.5
                    : 1
                }
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => changeBlock(swiper.activeIndex)}
        initialSlide={currentBlock}
        className="examples-content__blocks"
        modules={[Pagination]}
        spaceBetween={spaces[props.resolution]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ width: width[props.resolution] }}
      >
        {Object.entries(examples)[currentMonth][1].map((elem, index) => {
          return (
            <SwiperSlide
              className="examples-content__blocks__block"
              key={currentMonth + index}
            >
              <div
                className="examples-content__blocks__block__gradient"
                style={{ background: elem.gradient }}
              ></div>
              <div className="examples-content__blocks__block__content">
                <div className="examples-content__blocks__block__content__title ">
                  {elem.title}
                </div>
                <div className="examples-content__blocks__block__content__in-out">
                  <div className="examples-content__blocks__block__content__in-out__col">
                    <div className="examples-content__blocks__block__content__in-out__col__title">
                      Заработано:
                    </div>
                    <div className="examples-content__blocks__block__content__in-out__col__sum">
                      {elem.earn}
                    </div>
                  </div>

                  <div className="examples-content__blocks__block__content__in-out__col out">
                    <div className="examples-content__blocks__block__content__in-out__col__title">
                      Вложения:
                    </div>
                    <div className="examples-content__blocks__block__content__in-out__col__sum">
                      {elem.spend}
                    </div>
                  </div>
                </div>

                <div className="examples-content__blocks__block__content__cat-and-more">
                  <div className="examples-content__blocks__block__content__cat-and-more__cat">
                    {elem.category}
                  </div>
                  <div
                    className="examples-content__blocks__block__content__cat-and-more__more toggle"
                    onClick={() => toggleDescription(index)}
                  >
                    {showDescription == index ? "Скрыть" : "Подробнее"}
                  </div>
                </div>

                <div
                  className="examples-content__blocks__block__content__extended-info"
                  aria-expanded={showDescription != index}
                >
                  <div className="examples-content__blocks__block__content__extended-info__condition-title">
                    Условия:
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__condition-description">
                    {elem.condition}
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__resources-title">
                    Ресурсы:
                  </div>
                  <div className="examples-content__blocks__block__content__extended-info__resources-description">
                    {elem.resources}
                  </div>
                  {/* <a href={elem.reportUrl}>
                    <div className="examples-content__blocks__block__content__extended-info__full-report">
                      <div className="examples-content__blocks__block__content__extended-info__full-report__text">
                        Полный отчет
                      </div>
                      <div className="examples-content__blocks__block__content__extended-info__full-report__arrow"></div>
                    </div>
                  </a> */}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {["md", "sm"].includes(props.resolution) ? (
        <div className="examples-content__header__toggle">
          <div
            className="examples-content__header__toggle__arrow"
            onClick={() => toggleBlock("down")}
          >
            <ToggleLeft opacity={currentBlock == 0 ? 0.5 : 1} />
          </div>

          <div className="examples-content__header__toggle__elem ">{`${
            currentBlock + 1
          }/${Object.entries(examples)[currentMonth][1].length}`}</div>

          <div
            className="examples-content__header__toggle__arrow"
            onClick={() => toggleBlock("up")}
          >
            <ToggleRight
              opacity={
                currentBlock ==
                Object.entries(examples)[currentMonth][1].length - 1
                  ? 0.5
                  : 1
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Examples;
