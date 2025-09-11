import clsx from "clsx"
import { useInView } from "react-intersection-observer"

import Telegram from "@/public/images/jsx/ceo/telegram"
import YouTube from "@/public/images/jsx/ceo/you-tube"
import ArrowTeam from "@/public/images/jsx/ceo/arrow-team"

import useSendEvent from "@/hooks/useSendEvent"

import styles from "./Founders.module.scss"

const Founders = ({
  teamOpened,
  setTeamOpened,
}: {
  teamOpened: boolean
  setTeamOpened: (opened: boolean) => void
}) => {
  const { sendEvent } = useSendEvent()

  const { ref } = useInView({
    triggerOnce: true,
    rootMargin: "-500px 0px",
    onChange: (inView) => {
      if (inView) {
        sendEvent({ name: "landing_view.team" })
      }
    },
  })

  return (
    <section className={styles.section} id="founder" ref={ref}>
      <h2 className={styles.title}>Спикеры</h2>
      <p className={styles.title_description}>
        Перенимайте опыт ведущих специалистови основателей Crypton и быстро
        растите в доходе.
      </p>

      <div className={styles.founders}>
        <div className={styles.founder}>
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

              <div className={styles.links}>
                <a
                  href="https://www.youtube.com/c/EnjoyMaloy"
                  target="_blank"
                  className={styles.link}
                >
                  <YouTube />
                  EnjoyMaloy
                </a>
                <a
                  href="https://www.youtube.com/c/EnjoyMaloy"
                  target="_blank"
                  className={styles.link}
                >
                  <Telegram />
                  TradeParty
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.founder}>
          <div className={styles.founder_default}>
            <img
              src="/images/png/ceo/vadim.png"
              alt="Вадим Тарасов"
              className={styles.founder_image}
            />
            <div className={styles.founder_info}>
              <h3 className={styles.founder_name}>Вадим Тарасов</h3>
              <p className={styles.founder_position}>
                Сооснователь экосистемы Crypton
              </p>
              <p className={styles.founder_experience}>
                Сооснователь экосистемы Crypton, один из авторов проекта Уголок
                Трейдера. В криптоиндустрии с 2017 года.
              </p>
              <div className={styles.links}>
                <a
                  href="https://t.me/about_traders"
                  target="_blank"
                  className={styles.link}
                >
                  <Telegram />
                  Уголок трейдера
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.founder}
          onClick={() => setTeamOpened(!teamOpened)}
        >
          <div className={clsx(styles.founder_default, styles.founder_team)}>
            <div className={styles.founder_team_title}>
              <h1 className={styles.founder_team_title_number}>+15</h1>
              <h2 className={styles.founder_team_title_text}>
                опытных <br /> криптанов
              </h2>
            </div>
            <div className={styles.founder_info}>
              <p
                className={clsx(styles.founder_position, styles.team)}
                style={{ color: "white" }}
              >
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
      <div id="subscriber" className={styles.subscriber}>
        .
      </div>
    </section>
  )
}

export default Founders
