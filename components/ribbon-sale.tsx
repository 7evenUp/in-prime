import React, { Fragment } from "react"

const RibbonSale = ({ currentWidth}) => {
  let blockWidth = 580

  switch (true) {
    case currentWidth < 1920 && currentWidth >= 1368:
      blockWidth = 560
      break
    case currentWidth < 1368 && currentWidth >= 768:
      blockWidth = 418
      break
    case currentWidth < 768 && currentWidth >= 450:
      blockWidth = 281
      break
    case currentWidth < 450 && currentWidth >= 375:
      blockWidth = 230
      break
    case currentWidth < 375 && currentWidth >= 350:
      blockWidth = 230
      break
    default:
      break
  }

  let ribbon_text = () => {
    let ribbonLength = Math.floor((currentWidth * 4) / blockWidth) - 1
    let result = []
    for (let i = 0; i < ribbonLength; i++) {
      result.push(
        <Fragment key={i}>
          <div className="app__container__ribbon__ticker__text fill">
            Sale
          </div>
          <div className="app__container__ribbon__ticker__text outline">
            Sale
          </div>
        </Fragment>
      )
    }
    return result
  }

  return (
    <div className='app__container__ribbon__sale'>
      <div className="app__container__ribbon__ticker sale">{ribbon_text()}</div>
    </div>
  )
}

export default RibbonSale
