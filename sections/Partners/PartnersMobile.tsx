import React from "react"
import Image from "next/image"

import BinanceImg from "@/public/images/png/partners/Binance-sm.png"
import ImpossibleImg from "@/public/images/png/partners/IF-sm.png"
import AuraImg from "@/public/images/png/partners/Aura-sm.png"
import NearImg from "@/public/images/png/partners/Near-sm.png"
import TrustImg from "@/public/images/png/partners/trustwallet-sm.png"
import TaikoImg from "@/public/images/png/partners/taiko-sm.png"
import DequestImg from "@/public/images/png/partners/dequest-sm.png"
import CyberconnectImg from "@/public/images/png/partners/cyberconnect-sm.png"

import styles from "./Partners.module.scss"

const PartnersMobile = () => {
  return (
    <div className="app__container__partners" id="partners">
      <h2 className="app__container__partners__title" style={{ margin: 0 }}>
        Нам доверяют
      </h2>
      <div className={styles.partners}>
        <div className={styles.row}>
          <Image src={BinanceImg} alt="Binance" className={styles.binance} />
          <Image src={ImpossibleImg} alt="Impossible Finance" className={styles.if} />
          <Image src={TrustImg} alt="Trust Wallet" className={styles.trust} />
          <Image src={NearImg} alt="Near" className={styles.near} />
        </div>
        <div className={styles.row}>
          <Image src={TaikoImg} alt="Taiko" className={styles.taiko} />
          <Image src={AuraImg} alt="Aura Network" className={styles.aura} />
          <Image src={DequestImg} alt="DeQuest" className={styles.dequest} />
          <Image src={CyberconnectImg} alt="CyberConnect" className={styles.cyberconnect} />
        </div>

      </div>
    </div>
  )
}

export default PartnersMobile
