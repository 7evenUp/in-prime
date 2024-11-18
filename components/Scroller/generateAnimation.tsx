import clsx from "clsx"

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
  winItem: { color: string; numberInContainer: number },
  prizes: Array<{ color: string; numberInContainer: number }>
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

        const classNames = clsx(styles.container, {
          [styles.red]: prizes[generatedId].color === "red",
          [styles.yellow]: prizes[generatedId].color === "yellow",
          [styles.blue]: prizes[generatedId].color === "blue",
          [styles.green]: prizes[generatedId].color === "green",
          [styles.winRed]: el === 40 && winItem.color === "red",
          [styles.winYellow]: el === 40 && winItem.color === "yellow",
          [styles.winBlue]: el === 40 && winItem.color === "blue",
          [styles.winGreen]: el === 40 && winItem.color === "green",
        })

        return (
          <div className={classNames} key={el}>
            {el}
          </div>
        )
      })}
    </>
  )
}
