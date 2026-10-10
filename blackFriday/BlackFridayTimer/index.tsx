import { useEffect, useState } from "react"
import InfoDialog from "../Scroller/InfoDialog"
import { prizes } from "@/demo/fixtures"
import styles from "./styles.module.css"
export default function BlackFridayTimer() {
  const [timeLeft, setTimeLeft] = useState(["07", "00", "00"])
  useEffect(() => {
    const end = Date.now() + 7 * 86400000
    const update = () => {
      const seconds = Math.max(0, Math.floor((end - Date.now()) / 1000))
      setTimeLeft([Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60].map(value => String(value).padStart(2, "0")))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return <div className={styles.section}>
    <div className={styles.giftBlock}>
      <h2 className={styles.title}>Какие подарки внутри бокса?</h2>
      <img className={styles.image} src="/images/black-friday/black-friday-opened-gift.png" alt="Подарочный бокс" width="549" height="358" />
      <details className={styles.catalog}>
        <summary>Разверни и узнай</summary>
        <div className={styles.dialog_boxes}>
          {prizes.map(prize => <InfoDialog key={prize.id} image={prize.image} title={prize.title} description={prize.description} moreLink={null} getgemsLink={null}>
            <div className={styles.giftButton}><img src={prize.image} alt={prize.title} width="96" height="96" /></div>
          </InfoDialog>)}
        </div>
      </details>
    </div>
    <div className={styles.timer_wrapper}>
      <p className={styles.timer_title}>До конца акции осталось:</p>
      <div className={styles.time_row} role="timer" aria-label="До конца акции">
        {timeLeft.map((value, index) => <div className={styles.time_col} key={index}><span>{value}</span><span>{["дней", "часов", "минут"][index]}</span></div>)}
      </div>
    </div>
  </div>
}
