import React, { Dispatch, SetStateAction } from "react"
import * as Switch from "@radix-ui/react-switch"
import clsx from "clsx"

import styles from "./styles.module.scss"

const Switcher = ({
  showMonthlyPrice,
  setShowMonthlyPrice,
}: {
  showMonthlyPrice: boolean
  setShowMonthlyPrice: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className={styles.switch}>
      <div className={styles.switch_container}>
        <span
          className={clsx(
            styles.switch_text,
            showMonthlyPrice && styles.switch_text__active
          )}
          onClick={() => setShowMonthlyPrice(true)}
        >
          месяц
        </span>
        <Switch.Root
          className={styles.SwitchRoot}
          checked={showMonthlyPrice}
          onCheckedChange={setShowMonthlyPrice}
        >
          <Switch.Thumb className={styles.SwitchThumb} />
        </Switch.Root>
        <div className={styles.year} onClick={() => setShowMonthlyPrice(false)}>
          <span
            className={clsx(
              styles.switch_text,
              !showMonthlyPrice && styles.switch_text__active
            )}
          >
            год
          </span>
          <span
            className={clsx(
              styles.discount,
              !showMonthlyPrice && styles.discount__active
            )}
          >
            Выгода до -40%
          </span>
        </div>
      </div>
    </div>
  )
}

export default Switcher
