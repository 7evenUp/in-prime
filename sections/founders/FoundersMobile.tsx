import TeamArrow from '@/public/images/jsx/ceo/arrow'
import Telegram from '@/public/images/jsx/ceo/telegram'
import YouTube from '@/public/images/jsx/ceo/you-tube'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

const FoundersMobile =() => {
  return (
<div className="app__container__about-ceo" id="founder">
    <div className="app__container__about-ceo__right-light" />
    <div className="app__container__about-ceo__title">Команда</div>
    <div className="app__container__about-ceo__founders">
    <Swiper
        className="app__container__about-ceo__founders__swiper"
        spaceBetween={60}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
        <SwiperSlide>
        <div className="app__container__about-ceo__ceo">
            <div className="app__container__about-ceo__ceo__photo pavel" />
            <div className="app__container__about-ceo__ceo__description">
            <div className="app__container__about-ceo__ceo__description__name">
                Павел Сычев
            </div>
            <div className="app__container__about-ceo__ceo__description__job">
                Основатель экосистемы{" "}
                <a href="https://crypton.xyz">Crypton </a>
            </div>
            <div className="app__container__about-ceo__ceo__description__channels">
                <div className="app__container__about-ceo__ceo__description__channels__title">
                Автор каналов:
                </div>

                <a
                href="https://www.youtube.com/c/EnjoyMaloy"
                target={"_blank"}
                >
                <div className="app__container__about-ceo__ceo__description__channels__link">
                    <YouTube />
                    <div className="app__container__about-ceo__ceo__description__channels__link__text">
                    EnjoyMaloy
                    </div>
                    <TeamArrow />
                </div>
                </a>

                <a href="https://t.me/tradeparty1337" target={"_blank"}>
                <div className="app__container__about-ceo__ceo__description__channels__link">
                    <Telegram />
                    <div className="app__container__about-ceo__ceo__description__channels__link__text">
                    TradeParty
                    </div>
                    <TeamArrow />
                </div>
                </a>
            </div>
            <div className="app__container__about-ceo__ceo__description__experience">
                Имеет более 5 лет опыта в криптоиндустрии. Инфлюенсер 2022
                года{" "}
                <a
                href="https://twitter.com/binance/status/1545462193155604481"
                target={"_blank"}
                >
                по версии Binance
                </a>
                .
            </div>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="app__container__about-ceo__ceo">
            <div className="app__container__about-ceo__ceo__photo vadim" />
            <div className="app__container__about-ceo__ceo__description">
            <div className="app__container__about-ceo__ceo__description__name">
                Вадим Тарасов
            </div>
            <div className="app__container__about-ceo__ceo__description__job">
                Сооснователь экосистемы{" "}
                <a href="https://crypton.xyz">Crypton </a>
            </div>
            <div className="app__container__about-ceo__ceo__description__channels">
                <div className="app__container__about-ceo__ceo__description__channels__title">
                Один из авторов канала
                </div>

                <a href="https://t.me/about_traders" target={"_blank"}>
                <div className="app__container__about-ceo__ceo__description__channels__link">
                    <Telegram />
                    <div className="app__container__about-ceo__ceo__description__channels__link__text">
                    Уголок трейдера
                    </div>
                    <TeamArrow />
                </div>
                </a>
            </div>
            <div className="app__container__about-ceo__ceo__description__experience">
                В криптоиндустрии с 2017 года.
            </div>
            </div>
        </div>
        </SwiperSlide>
    </Swiper>
    </div>
    </div>
  )
}

export default FoundersMobile
