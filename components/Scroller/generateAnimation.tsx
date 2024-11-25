import { IPrize, IPrizes } from "@/types/promo-types"
import styles from "./generateAnimation.module.scss"
import DialogPromo from "../DialogPromo/DialogPromo"

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

        const image =
          el === 40 ? winItem.image : prizes[generatedId].prize.image
        const title =
          el === 40 ? winItem.title : prizes[generatedId].prize.title
        const description =
          el === 40
            ? winItem.description
            : prizes[generatedId].prize.description
        const moreLink =
          el === 40 ? winItem.link : prizes[generatedId].prize.link
        const getgemsLink =
          el === 40
            ? winItem.nftImageUrl
            : prizes[generatedId].prize.nftImageUrl
        const rarity =
          el === 40 ? winItem.rarity : prizes[generatedId].prize.rarity
        return (
          <DialogPromo
            description={description}
            name={title}
            rarity={rarity}
            imgSrc={image}
            link={moreLink}
            nftImageUrl={getgemsLink}
          >
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
          </DialogPromo>
        )
      })}
    </>
  )
}
