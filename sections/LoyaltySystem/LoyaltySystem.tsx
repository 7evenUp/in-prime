import React from "react"

import Points500 from "@/public/images/jsx/loyalty/points500"
import Points50 from "@/public/images/jsx/loyalty/points50"
import Points150 from "@/public/images/jsx/loyalty/points150"
import Points50Md from "@/public/images/jsx/loyalty/points50-md"
import Points150Md from "@/public/images/jsx/loyalty/points150-md"
import Points500Md from "@/public/images/jsx/loyalty/points500-md"
import Points50Sm from "@/public/images/jsx/loyalty/points50-sm"
import Points150Sm from "@/public/images/jsx/loyalty/points150-sm"
import Getgems from "@/public/images/jsx/loyalty/getgems"
import Mythical from "@/public/images/jsx/loyalty/mythical"
import Legendary from "@/public/images/jsx/loyalty/legendary"
import Crypton from "@/public/images/jsx/footer/crypton"

import { Resolution } from "@/types/resolution"

const points50 = {
  lgg: <Points50 />,
  lg: <Points50 />,
  md: <Points50Md />,
  sm: <Points50Sm />,
}
const points150 = {
  lgg: <Points150 />,
  lg: <Points150 />,
  md: <Points150Md />,
  sm: <Points150Sm />,
}
const points500 = {
  lgg: <Points500 />,
  lg: <Points500 />,
  md: <Points500Md />,
  sm: <Points500Md />,
}

const LoyaltySystem = ({ resolution }: { resolution: Resolution }) => {
  return (
    <div className="app__container__loyalty">
      <div className="app__container__loyalty__content">
        <div className="app__container__loyalty__content__header">
          Система лояльности
        </div>
        <div className="app__container__loyalty__content__info">
          <div className="app__container__loyalty__content__info__cashback">
            <div className="app__container__loyalty__content__info__cashback__main">
              <div className="app__container__loyalty__content__info__cashback__main__text">
                За покупку любой подписки экосистемы Crypton вы получите{" "}
                <b>кешбек</b> в виде Crypton Points
              </div>
              <div className="app__container__loyalty__content__info__cashback__main__points">
                <div className="app__container__loyalty__content__info__cashback__main__points__block _1">
                  <Crypton />
                  <div>{points50[resolution]}</div>
                </div>
                <div className="app__container__loyalty__content__info__cashback__main__points__block _2">
                  <Crypton />
                  <div>{points150[resolution]}</div>
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
                При наличии NFT <br /> Nutcrackers кешбек
              </div>
              <div className="app__container__loyalty__content__info__cards__discount__title">
                до 20%
              </div>
              <div className="app__container__loyalty__content__info__cards__discount__button">
                <a href={`https://getgems.io/nutcrackers`} target={"_blank"}>
                  <Getgems />
                </a>
              </div>
              <div className="app__container__loyalty__content__info__cards__discount__nutcrackers" />
            </div>
            <div className="app__container__loyalty__content__info__cards__rarity">
              <div className="app__container__loyalty__content__info__cards__rarity__title">
                Чем <b>выше редкость</b> <br /> Щелкунчика, тем <b>больше</b>{" "}
                <br /> Crypton Points вы получите
              </div>
              <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers">
                <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block">
                  <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__nutcracker _1" />
                  <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__text _1">
                    <Legendary />
                  </div>
                </div>

                <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block">
                  <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__text _2">
                    <Mythical />
                  </div>
                  <div className="app__container__loyalty__content__info__cards__rarity__nutcrackers__block__nutcracker _2" />
                </div>
              </div>
              <div className="app__container__loyalty__content__info__cards__rarity__points">
                <Crypton />
                <div>{points500[resolution]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoyaltySystem
