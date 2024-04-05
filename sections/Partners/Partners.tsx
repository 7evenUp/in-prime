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
    <div className={styles.container} id="partners">
      <h2 className={styles.heading}>Нам доверяют</h2>
      <div className={styles.partners}>
        <div className={styles.row}>
          <Image src={BinanceImg} alt="Binance" className={styles.binance} />
          <Image
            src={ImpossibleImg}
            alt="Impossible Finance"
            className={styles.if}
          />
          <Image src={AuraImg} alt="Aura Network" className={styles.aura} />
          <Image src={NearImg} alt="Near" className={styles.near} />
          <Image src={TrustImg} alt="Trust Wallet" className={styles.trust} />
          <Image src={TaikoImg} alt="Taiko" className={styles.taiko} />
          <Image src={DequestImg} alt="DeQuest" className={styles.dequest} />
          <Image src={CyberImg} alt="Cyber Connect" className={styles.cyber} />
          {/* Дублирование для корректной анимации */}
          <Image
            src={BinanceImg}
            alt="Binance"
            className={styles.binance}
            aria-hidden="true"
          />
          <Image
            src={ImpossibleImg}
            alt="Impossible Finance"
            className={styles.if}
            aria-hidden="true"
          />
          <Image
            src={AuraImg}
            alt="Aura Network"
            className={styles.aura}
            aria-hidden="true"
          />
          <Image
            src={NearImg}
            alt="Near"
            className={styles.near}
            aria-hidden="true"
          />
          <Image
            src={TrustImg}
            alt="Trust Wallet"
            className={styles.trust}
            aria-hidden="true"
          />
          <Image
            src={TaikoImg}
            alt="Taiko"
            className={styles.taiko}
            aria-hidden="true"
          />
          <Image
            src={DequestImg}
            alt="DeQuest"
            className={styles.dequest}
            aria-hidden="true"
          />
          <Image
            src={CyberImg}
            alt="Cyber Connect"
            className={styles.cyber}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

export default Partners
