import { IPrize, IPrizes } from "@/types/promo-types"
import styles from "./generateAnimation.module.scss"

const weightedSample = (items: Record<number, number>) => {
  const total = Object.values(items).reduce((sum, weight) => sum + weight, 0)

  const rnd = Math.random() * total
  let accumulator = 0

  for (const [item, weight] of Object.entries(items)) {
    accumulator += weight

    if (rnd < accumulator) {
      return item
    }
  }
}

export const generateAnimation = (
  length: number,
  winItem: IPrize,
  prizes: IPrizes[]
) => {
  const samples: Record<number, number> = {}

  for (let i = 0; i < prizes.length; i++) {
    samples[i] = prizes[i].numberInContainer
  }

  return (
    <>
      {Array.from({ length }, (_, index) => index + 1).map((el) => {
        const generatedResult = weightedSample(samples)
        const generatedId =
          generatedResult === undefined ? 0 : parseInt(generatedResult, 10)

        return (
          <div className={styles.prizeBox} key={el}>
            {el === 40 ? (
              <img
                src={winItem.image}
                alt={`Win Item ${el}`}
                className={styles.prizeImage}
              />
            ) : prizes[generatedId]?.prize?.image ? (
              <img
                src={prizes[generatedId].prize.image}
                alt={`Prize ${generatedId}`}
                className={styles.prizeImage}
              />
            ) : (
              <span className={styles.prizeTitle}>
                {prizes[generatedId]?.prize?.title || "No Title"}
              </span>
            )}
          </div>
        )
      })}
    </>
  )
}
