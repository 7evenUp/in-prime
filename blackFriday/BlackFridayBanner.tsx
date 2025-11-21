import React from "react"
import Image from "next/image"

import { scrollToSection } from "@/redux/reducers/scrollReducer"

import styles from "./styles.module.css"

const BlackFridayBanner = () => {
  return (
    <button
      className={styles.banner}
      onClick={() => scrollToSection("BlackFriday")}
    >
      <Image
        src={"/images/black-friday/black-friday-banner.png"}
        alt="black friday banner"
        fill={true}
      />
    </button>
  )
}

export default BlackFridayBanner
