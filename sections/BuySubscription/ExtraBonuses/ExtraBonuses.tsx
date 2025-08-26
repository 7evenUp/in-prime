import React, { useMemo } from "react"
import clsx from "clsx"

import { BonusIcon } from "../Icons"
import BenefitCard from "../BenefitCard"

import { Benefit } from "@/types/api-types"

import styles from "../BuySubscription.module.scss"

const ExtraBonuses = ({ benefits }: { benefits: Benefit[] }) => {
  const neededBenefits = useMemo(() => {
    if (!benefits || benefits.length === 0) return []

    const neededBenefits = benefits.filter(
      (benefit) =>
        benefit.type === "INVENTORY" || benefit.type === "PERSONAL_CONSULTING"
    )

    if (neededBenefits.length === 0) return []

    return neededBenefits
  }, [benefits])

  if (neededBenefits.length === 0) return null

  return (
    <>
      <div
        className={clsx(
          styles.bonuses_heading
          // order === 0 && styles.bonuses_heading_first
        )}
      >
        <div className={styles.bonuses_icon}>
          <BonusIcon />
        </div>
        <span className={styles.bonuses_heading_text}>ЭКСТРА БОНУСЫ</span>
      </div>

      <ul className={clsx(styles.bonuses, styles.bonuses__small)}>
        {neededBenefits.map(
          (benefit) =>
            benefit.file &&
            benefit.remainingCount !== 0 && (
              <BenefitCard
                key={benefit.id}
                benefit={{
                  file: benefit.file,
                  name: benefit.translations.ru.name,
                  description: benefit.translations.ru.description,
                }}
              />
            )
        )}
      </ul>
    </>
  )
}

export default ExtraBonuses
