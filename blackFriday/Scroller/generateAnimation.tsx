import { ContainerPrize, Prize } from "./types"

import InfoDialog from "./InfoDialog"

import styles from "./styles.module.css"

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
  winItem: Prize,
  prizes: ContainerPrize[]
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
          generatedResult === undefined ? 0 : parseInt(generatedResult)

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

        return (
          <InfoDialog
            key={el}
            image={image}
            title={title}
            description={description}
            moreLink={moreLink}
            getgemsLink={getgemsLink}
          >
            <div className={styles.prize}>
              <img src={image} className={styles.prize_img} />
            </div>
          </InfoDialog>
        )
      })}
    </>
  )
}
