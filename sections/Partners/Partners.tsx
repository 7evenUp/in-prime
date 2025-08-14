import React from "react"
import Image from "next/image"

import BinanceImg from "@/public/images/png/partners/Binance.png"
import ImpossibleImg from "@/public/images/png/partners/IF.png"
import AuraImg from "@/public/images/png/partners/Aura.png"
import NearImg from "@/public/images/png/partners/Near.png"
import TrustImg from "@/public/images/png/partners/trustwallet.png"
import TaikoImg from "@/public/images/png/partners/taiko.png"
import CyberImg from "@/public/images/png/partners/cyberconnect.png"
import BitgetImg from "@/public/images/png/partners/bitget.png"
import OKXImg from "@/public/images/png/partners/okx.png"

import styles from "./Partners.module.scss"

const Partners = () => {
  return (
    <div className={styles.container}>
      <div className={styles.partners}>
        <div className={styles.row}>
          <Image src={BinanceImg} alt="Binance" />
          <Image src={ImpossibleImg} alt="Impossible Finance" />
          <Image src={AuraImg} alt="Aura Network" />
          <Image src={NearImg} alt="Near" />
          <Image src={TrustImg} alt="Trust Wallet" />
          <Image src={TaikoImg} alt="Taiko" />
          <Image src={BitgetImg} alt="Bitget" />
          <Image src={OKXImg} alt="OKX" />
          <Image src={CyberImg} alt="Cyber Connect" />
          {/* Дублирование для корректной анимации */}
          <Image src={BinanceImg} alt="Binance" aria-hidden="true" />
          <Image
            src={ImpossibleImg}
            alt="Impossible Finance"
            aria-hidden="true"
          />
          <Image src={AuraImg} alt="Aura Network" aria-hidden="true" />
          <Image src={NearImg} alt="Near" aria-hidden="true" />
          <Image src={TrustImg} alt="Trust Wallet" aria-hidden="true" />
          <Image src={TaikoImg} alt="Taiko" aria-hidden="true" />
          <Image src={BitgetImg} alt="Bitget" />
          <Image src={OKXImg} alt="OKX" />
          <Image src={CyberImg} alt="Cyber Connect" aria-hidden="true" />
          {/* Дублирование для корректной анимации */}
          <Image src={BinanceImg} alt="Binance" aria-hidden="true" />
          <Image
            src={ImpossibleImg}
            alt="Impossible Finance"
            aria-hidden="true"
          />
          <Image src={AuraImg} alt="Aura Network" aria-hidden="true" />
          <Image src={NearImg} alt="Near" aria-hidden="true" />
          <Image src={TrustImg} alt="Trust Wallet" aria-hidden="true" />
          <Image src={TaikoImg} alt="Taiko" aria-hidden="true" />
          <Image src={BitgetImg} alt="Bitget" />
          <Image src={OKXImg} alt="OKX" />
          <Image src={CyberImg} alt="Cyber Connect" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export default Partners
