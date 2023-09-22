import React from "react"
import Image from "next/image"

import BinanceImg from "@/public/images/png/partners/Binance.png"
import ImpossibleImg from "@/public/images/png/partners/IF.png"
import AuraImg from "@/public/images/png/partners/Aura.png"
import NearImg from "@/public/images/png/partners/Near.png"
import TrustImg from "@/public/images/png/partners/trustwallet.png"
import TaikoImg from "@/public/images/png/partners/taiko.png"
import DequestImg from "@/public/images/png/partners/dequest.png"
import CyberImg from "@/public/images/png/partners/cyberconnect.png"

import styles from "./Partners.module.scss"

const Partners = () => {
  return (
    <div className="app__container__partners" id="partners">
      <h2 className="app__container__partners__title" style={{ margin: 0 }}>
        Нам доверяют
      </h2>
      <div className={styles.partners}>
        <div className={styles.row}>
          <Image src={BinanceImg} alt="Binance" className={styles.binance} />
          <Image src={ImpossibleImg} alt="Impossible Finance" className={styles.if} />
          <Image src={AuraImg} alt="Aura Network" className={styles.aura} />
          <Image src={NearImg} alt="Near" className={styles.near} />
        </div>
        <div className={styles.row}>
          <Image src={TrustImg} alt="Trust Wallet" className={styles.trust} />
          <Image src={TaikoImg} alt="Taiko" className={styles.taiko} />
          <Image src={DequestImg} alt="DeQuest" className={styles.dequest} />
          <Image src={CyberImg} alt="Cyber Connect" className={styles.cyber} />
        </div>
      </div>
    </div>
  )
}

export default Partners
