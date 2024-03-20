import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Footer from "@/components/footer";
// import Features from "@/components/features"
import Examples from "@/components/examples";
import Accordion from "@/components/accordion/accordion";
import Menu from "@/components/menu";
import OtherProducts from "@/components/other-products";
import Team from "@/components/team";
import Ribbon from "@/components/ribbon";

import SubscribeArrow from "@/public/images/jsx/subscribe/arrow";
import Telegram from "@/public/images/jsx/ceo/telegram";
import YouTube from "@/public/images/jsx/ceo/you-tube";
import TeamArrow from "@/public/images/jsx/ceo/arrow";
import More from "@/public/images/jsx/subscribe/more";

import Testimonials from "@/sections/Testimonials/Testimonials";
import Histories from "@/sections/Histories/Histories";
import Benefits from "@/sections/Benefits/Benefits";
import Features from "@/sections/Features/Features";
import Partners from "@/sections/Partners/Partners";
import Roadmap from "@/sections/Roadmap/Roadmap";
import Earn from "@/sections/Earn/Earn";

import { Resolution } from "@/types/resolution";
import RibbonSale from "@/components/ribbon-sale";
// import Countdown from "@/components/countdown";
import FeaturesMobile from "@/sections/Features/FeaturesMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import Founders from "@/sections/founders/Founders";
import FoundersMobile from "@/sections/founders/FoundersMobile";
import PartnersMobile from "@/sections/Partners/PartnersMobile";
import BuySubscr from "@/public/images/jsx/subscribe/buy-subscr";
import BuySubscrLg from "@/public/images/jsx/subscribe/buy-subscr-lg";
import BuySubscrMd from "@/public/images/jsx/subscribe/buy-subscr-md";
import BuySubscrSm from "@/public/images/jsx/subscribe/buy-subscr-sm";

import Getgems from "@/public/images/jsx/loyalty/getgems";
import Mythical from "@/public/images/jsx/loyalty/mythical";
import Legendary from "@/public/images/jsx/loyalty/legendary";
import Crypton from "@/public/images/jsx/footer/crypton";
import Points500 from "@/public/images/jsx/loyalty/points500";
import Points50 from "@/public/images/jsx/loyalty/points50";
import Points150 from "@/public/images/jsx/loyalty/points150";
import Points50Md from "@/public/images/jsx/loyalty/points50-md";
import Points150Md from "@/public/images/jsx/loyalty/points150-md";
import Points500Md from "@/public/images/jsx/loyalty/points500-md";
import Points50Sm from "@/public/images/jsx/loyalty/points50-sm";
import Points150Sm from "@/public/images/jsx/loyalty/points150-sm";
import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"

const useWindowSize = () => {
  const [currentWidth, setCurrentWidth] = useState(0);

  const handleResize = () => {
    setCurrentWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return currentWidth;
};

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <div />;
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
    );
  }
};

const Home = (props) => {
  const router = useRouter();
  const referral = router.query.ref || "agent";

  const [currentY, setCurrentY] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);

  const [timerProgress, setTimerProgress] = useState(0);

  const currentWidth = useWindowSize();

  let resolution: Resolution = "lgg";

  switch (true) {
    case currentWidth >= 1920:
      resolution = "lgg";
      break;
    case currentWidth < 1920 && currentWidth >= 1368:
      resolution = "lg";
      break;
    case currentWidth < 1368 && currentWidth >= 768:
      resolution = "md";
      break;
    case currentWidth < 768:
      resolution = "sm";
      break;
    default:
      break;
  }

  // const tariffs = {
  //   lgg: <SelectLggTariff />,
  //   lg: <SelectLgTariff />,
  //   md: <SelectMdTariff />,
  //   sm: <SelectSmTariff />,
  // };
  const tariffs = {
    lgg: <BuySubscr />,
    lg: <BuySubscrLg />,
    md: <BuySubscrMd />,
    sm: <BuySubscrSm />,
  };
  const points50 = {
    lgg: <Points50 />,
    lg: <Points50 />,
    md: <Points50Md />,
    sm: <Points50Sm />,
  };
  const points150 = {
    lgg: <Points150 />,
    lg: <Points150 />,
    md: <Points150Md />,
    sm: <Points150Sm />,
  };
  const points500 = {
    lgg: <Points500 />,
    lg: <Points500 />,
    md: <Points500Md />,
    sm: <Points500Md />,
  };

  const moreInfo = {
    lgg: 11825,
    lg: 10451,
    md: 11520,
    sm: 10450,
  };

  const wheelHandler = (event) => {
    setCurrentY(window.scrollY);
  };

  useEffect(() => {
    setTimerProgress(
      Math.round(
        Date.now() >= 1700830800000
          ? ((Date.now() - 1700830800000) / (1701377940000 - 1700830800000)) *
              100
          : 0
      )
    );
  }, []);
  useEffect(() => {
    window.addEventListener("wheel", wheelHandler);

    return () => {
      window.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const toggleFaq = (index: number) => {
    window.scrollTo({
      top: moreInfo[resolution],
      behavior: "smooth",
    });
    setOpenFaq(index);
    setCurrentY(moreInfo[resolution]);
  };

  return (
    <>
      <div className="app">
        {["lgg", "lg"].includes(resolution) && (
          <Menu
            resolution={resolution}
            currentY={currentY}
            setCurrentY={setCurrentY}
          />
        )}
        <div className="app__container">
          <Earn
            currentY={currentY}
            setCurrentY={setCurrentY}
            referral={referral}
            resolution={resolution}
          />

          <Benefits />
          {resolution === "sm" ? (
            <FeaturesMobile resolution={resolution} />
          ) : (
            <Features resolution={resolution} />
          )}
          {/* <Features resolution={resolution} /> */}
          <Roadmap resolution={resolution} />

          {/* <div className="app__container__video-block" id="video">
            <div className="app__container__video-block__video">
              <iframe
                style={{ borderRadius: "8px", border: 0 }}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cRucxHqqWZA"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="app__container__video-block__description-block">
              <div className="app__container__video-block__description-block__title">
                Все возможности Prime
              </div>
              <div className="app__container__video-block__description-block__description">
                Узнайте больше о том, что вас ждет в Prime, после приобретения
                подписки!
              </div>
            </div>
          </div> */}

          <div className="app__container__guarantee" id="guarantee">
            <div className="app__container__guarantee__block">
              <div className="app__container__guarantee__block__title" />
              <div className="app__container__guarantee__block__description">
                Если по какой-то причине подписка за месяц не окупилась, то мы
                продлим её ещё на месяц бесплатно!
              </div>
              <div
                className="app__container__guarantee__block__button"
                onClick={() => toggleFaq(2)}
              >
                <div className="app__container__guarantee__block__button__text">
                  Подробнее
                </div>
                <div className="app__container__guarantee__block__button__arrow">
                  <More />
                </div>
              </div>
            </div>
          </div>

          <Ribbon currentWidth={currentWidth} />

          <div className="app__container__examples" id="examples">
            <div className="app__container__examples__title">
              Реальные
              <br />
              примеры заработка
            </div>
            <Examples resolution={resolution} />
          </div>

          {resolution === "sm" ? <FoundersMobile /> : <Founders />}

          <Team resolution={resolution} />

          {resolution === "sm" ? <PartnersMobile /> : <Partners />}

          <div className="app__container__loyalty">
            <div className="app__container__loyalty__content">
              <div className="app__container__loyalty__content__header">
                Система лояльности
              </div>
              <div className="app__container__loyalty__content__info">
                <div className="app__container__loyalty__content__info__cashback">
                  <div className="app__container__loyalty__content__info__cashback__main">
                    <div className="app__container__loyalty__content__info__cashback__main__text">
                      За покупку любой подписки экосистемы Crypton вы получите <b>кешбек</b> в виде Crypton Points
                    </div>
                    <div className="app__container__loyalty__content__info__cashback__main__points">
                      <div className="app__container__loyalty__content__info__cashback__main__points__block _1">
                        <Crypton/>
                        <div>
                          {points50[resolution]}
                        </div>
                      </div>
                      <div className="app__container__loyalty__content__info__cashback__main__points__block _2">
                        <Crypton/>
                        <div>
                          {points150[resolution]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app__container__loyalty__content__info__cashback__discount">
                    <div>Базовый кэшбек —</div>
                    <b>5%</b>
                  </div>
                </div>
                <div className="app__container__loyalty__content__info__cards">
                  <div className="app__container__loyalty__content__info__cards__discount">
                    <div className="app__container__loyalty__content__info__cards__discount__subtitle">
                      При наличии NFT <br/> Nutcrackers кешбек
                    </div>
                    <div className="app__container__loyalty__content__info__cards__discount__title">
                      до 20%
                    </div>
                    <div className="app__container__loyalty__content__info__cards__discount__button">
                      <a
                          href={`https://getgems.io/nutcrackers`}
                          target={"_blank"}
                      >
                        <Getgems/>
                      </a>
                    </div>
                    <div className="app__container__loyalty__content__info__cards__discount__nutcrackers"/>
                  </div>
                  <div className="app__container__loyalty__content__info__cards__rarity">
                    <div className="app__container__loyalty__content__info__cards__rarity__title">
                      Чем <b>выше редкость</b> <br/> Щелкунчика, тем <b>больше</b> <br/> Crypton Points вы получите
                    </div>
                    <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers">
                      <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block">
                        <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__nutcracker _1"/>
                        <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__text _1">
                          <Legendary />
                        </div>
                      </div>

                      <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block">
                        <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__text _2">
                          <Mythical />
                        </div>
                        <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__nutcracker _2"/>
                      </div>
                    </div>
                    <div className="app__container__loyalty__content__info__cards__rarity__points">
                      <Crypton />
                      <div>
                        {points500[resolution]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="app__container__subscribe" id="subscribe">
            <div className="app__container__subscribe__noise"/>
            <div className="app__container__subscribe__back">
              <div className="app__container__subscribe__back__left-gradient"/>
              <div className="app__container__subscribe__back__right-gradient"/>
            </div>
            <div className="app__container__subscribe__content">
              <div className="app__container__subscribe__content__header">
                <div className="app__container__subscribe__content__title" />
              </div>
              <div className="app__container__subscribe__content__cost bottom">
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _5" />
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      1 месяц
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _74" />
                    <div className="app__container__subscribe__content__cost__block__body__discount _45" />
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _6" />
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      3 месяца
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _214" />
                    <div className="app__container__subscribe__content__cost__block__body__discount _225" />
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _7" />
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      6 месяцев
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _405" />
                    <div className="app__container__subscribe__content__cost__block__body__discount _446" />
                  </div>
                </div>
                <div className="app__container__subscribe__content__cost__block">
                  <div className="app__container__subscribe__content__cost__block__header">
                    <div className="app__container__subscribe__content__cost__block__header__gradient _8" />
                    <div className="app__container__subscribe__content__cost__block__header__title">
                      12 месяцев
                    </div>
                  </div>
                  <div className="app__container__subscribe__content__cost__block__body">
                    <div className="app__container__subscribe__content__cost__block__body__price _765" />
                    <div className="app__container__subscribe__content__cost__block__body__discount _880" />
                  </div>
                </div>
              </div>
              <div className="app__container__subscribe__content__link__mark">
                При оплате картой конвертация в рубли осуществляется по курсу ЦБ
                РФ
              </div>
              <div className="app__container__subscribe__content__link">
                <BuySubscriptionDialog>
                  <div className="app__container__subscribe__content__link__button">
                    {tariffs[resolution]}
                    <SubscribeArrow />
                  </div>
                </BuySubscriptionDialog>
                {/*<div className="app__container__subscribe__content__link__description">*/}
                {/*  С оформлением тарифа вам поможет наш бот в Telegram*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          <Testimonials />
          <Histories />

          <div className="app__container__faq" id="faq">
            <div className="app__container__faq__title">
              Часто задаваемые вопросы
            </div>
            <Accordion mode={"faq"} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          </div>

          <OtherProducts />
          <Footer
            resolution={resolution}
            currentY={currentY}
            setCurrentY={setCurrentY}
          />
        </div>
      </div>

      <div className="back color dark" />
      <div className="back noise" />
    </>
  )
};

export default Home;
