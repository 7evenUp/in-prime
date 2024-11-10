import TeamArrow from "@/public/images/jsx/ceo/arrow"
import Telegram from "@/public/images/jsx/ceo/telegram"
import YouTube from "@/public/images/jsx/ceo/you-tube"

import styles from "./Founders.module.scss"
import { FC } from "react"
import clsx from "clsx"
import ArrowTeam from "@/public/images/jsx/ceo/arrow-team"

interface FoundersProps {
  teamOpened: boolean
  setTeamOpened: (opened: boolean) => void
}

const Founders: FC<FoundersProps> = ({ teamOpened, setTeamOpened }) => {
  return (
    <section className={styles.section} id="founder">
      <div className={styles.gradient} />
      <h2 className={styles.title}>Команда</h2>
      <div className={styles.founders}>
        <div className={styles.founder}>
          <div className={styles.founder_top_mobile}>
            <img
              src="/images/png/ceo/pasha.png"
              alt="Павел Сычев"
              className={styles.founder_image}
            />
            <div>
              <h3 className={styles.founder_name}>Павел Сычев</h3>
              <p className={styles.founder_position}>
                Сооснователь экосистемы Crypton
              </p>
            </div>
          </div>
          <div className={styles.founder_bottom_mobile}>
            <div className={styles.founder_channels}>
              <span className={styles.founder_channels_title}>
                Автор каналов:
              </span>
              <div className={styles.founder_channels_list}>
                <a href="https://www.youtube.com/c/EnjoyMaloy" target="_blank">
                  <div className="app__container__about-ceo__ceo__description__channels__link">
                    <YouTube />
                    <span className="app__container__about-ceo__ceo__description__channels__link__text">
                      EnjoyMaloy
                    </span>
                    <TeamArrow />
                  </div>
                </a>

                <a href="https://t.me/tradeparty1337" target="_blank">
                  <div className="app__container__about-ceo__ceo__description__channels__link">
                    <Telegram />
                    <span className="app__container__about-ceo__ceo__description__channels__link__text">
                      TradeParty
                    </span>
                    <TeamArrow />
                  </div>
                </a>
              </div>
            </div>
            <p className={styles.founder_experience}>
              Имеет более 5 лет опыта в криптоиндустрии. Инфлюенсер 2022 года{" "}
              <a
                href="https://twitter.com/binance/status/1545462193155604481"
                target="_blank"
              >
                по версии Binance
              </a>
              .
            </p>
          </div>
          <div className={styles.founder_default}>
            <img
              src="/images/png/ceo/pasha.png"
              alt="Павел Сычев"
              className={styles.founder_image}
            />
            <div className={styles.founder_info}>
              <h3 className={styles.founder_name}>Павел Сычев</h3>
              <p className={styles.founder_position}>
                Сооснователь экосистемы Crypton
              </p>
              <div className={styles.founder_channels}>
                <span className={styles.founder_channels_title}>
                  Автор каналов:
                </span>
                <div className={styles.founder_channels_list}>
                  <a
                    href="https://www.youtube.com/c/EnjoyMaloy"
                    target="_blank"
                  >
                    <div className="app__container__about-ceo__ceo__description__channels__link">
                      <YouTube />
                      <span className="app__container__about-ceo__ceo__description__channels__link__text">
                        EnjoyMaloy
                      </span>
                      <TeamArrow />
                    </div>
                  </a>

                  <a href="https://t.me/tradeparty1337" target="_blank">
                    <div className="app__container__about-ceo__ceo__description__channels__link">
                      <Telegram />
                      <span className="app__container__about-ceo__ceo__description__channels__link__text">
                        TradeParty
                      </span>
                      <TeamArrow />
                    </div>
                  </a>
                </div>
              </div>
              <p className={styles.founder_experience}>
                Имеет более 5 лет опыта в криптоиндустрии. Инфлюенсер 2022 года{" "}
                <a
                  href="https://twitter.com/binance/status/1545462193155604481"
                  target="_blank"
                >
                  по версии Binance
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className={styles.founder}>
          <div className={styles.founder_top_mobile}>
            <img
              src="/images/png/ceo/vadim.png"
              alt="Вадим Тарасов"
              className={styles.founder_image}
            />
            <div>
              <h3 className={styles.founder_name}>Вадим Тарасов</h3>
              <p className={styles.founder_position}>
                <a href="https://crypton.xyz" target="_blank">
                  Crypton
                </a>{" "}
                Co-Founder (COO)
              </p>
            </div>
          </div>
          <div className={styles.founder_bottom_mobile}>
            <div className={styles.founder_channels}>
              <span className={styles.founder_channels_title}>
                Автор канала:
              </span>
              <div className={styles.founder_channels_list}>
                <a href="https://t.me/about_traders" target="_blank">
                  <div className="app__container__about-ceo__ceo__description__channels__link">
                    <Telegram />
                    <div className="app__container__about-ceo__ceo__description__channels__link__text">
                      Уголок трейдера
                    </div>
                    <TeamArrow />
                  </div>
                </a>
              </div>
            </div>
            <p className={styles.founder_experience}>
              В криптоиндустрии с 2017 года.
            </p>
          </div>
          <div className={styles.founder_default}>
            <img
              src="/images/png/ceo/vadim.png"
              alt="Вадим Тарасов"
              className={styles.founder_image}
            />
            <div className={styles.founder_info}>
              <h3 className={styles.founder_name}>Вадим Тарасов</h3>
              <p className={styles.founder_position}>
                <a href="https://crypton.xyz" target="_blank">
                  Crypton
                </a>{" "}
                Co-Founder (COO)
              </p>
              <div className={styles.founder_channels}>
                <span className={styles.founder_channels_title}>
                  Автор канала:
                </span>
                <div className={styles.founder_channels_list}>
                  <a href="https://t.me/about_traders" target="_blank">
                    <div className="app__container__about-ceo__ceo__description__channels__link">
                      <Telegram />
                      <div className="app__container__about-ceo__ceo__description__channels__link__text">
                        Уголок трейдера
                      </div>
                      <TeamArrow />
                    </div>
                  </a>
                </div>
              </div>
              <p className={styles.founder_experience}>
                В криптоиндустрии с 2017 года.
              </p>
            </div>
          </div>
        </div>

        <div
          className={styles.founder}
          onClick={() => setTeamOpened(!teamOpened)}
        >
          <div className={styles.founder_top_mobile}>
            <div className={styles.founder_team_title}>
              <h1>+15</h1>
              <h2>опытных криптанов</h2>
            </div>
            <div>
              <h3 className={styles.founder_name}>Вадим Тарасов</h3>
              <p className={styles.founder_position}>
                <a href="https://crypton.xyz" target="_blank">
                  Crypton
                </a>{" "}
                Co-Founder (COO)
              </p>
            </div>
          </div>
          <div className={styles.founder_bottom_mobile}>
            <div className={styles.founder_channels}>
              <span className={styles.founder_channels_title}>
                Автор канала:
              </span>
              <div className={styles.founder_channels_list}>
                <a href="https://t.me/about_traders" target="_blank">
                  <div className="app__container__about-ceo__ceo__description__channels__link">
                    <Telegram />
                    <div className="app__container__about-ceo__ceo__description__channels__link__text">
                      Уголок трейдера
                    </div>
                    <TeamArrow />
                  </div>
                </a>
              </div>
            </div>
            <p className={styles.founder_experience}>
              В криптоиндустрии с 2017 года.
            </p>
          </div>
          <div className={clsx(styles.founder_default, styles.founder_team)}>
            <div className={styles.founder_team_title}>
              <h1 className={styles.founder_team_title_number}>+15</h1>
              <h2 className={styles.founder_team_title_text}>
                опытных <br /> криптанов
              </h2>
            </div>
            <div className={styles.founder_info}>
              <p className={clsx(styles.founder_position, styles.team)}>
                (ТЫК сюда, чтобы посмотреть всех членов команды)
              </p>
              <ArrowTeam
                className={clsx(
                  styles.founder_position_arrow,
                  teamOpened && styles.founder_position_arrow_active
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Founders
