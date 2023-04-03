import React from "react";

function Ribbon(props) {
  let blockWidth = 580;
  let currentWidth = props.currentWidth;
  switch (true) {
    case currentWidth < 1920 && currentWidth >= 1368:
      blockWidth = 560;
      break;
    case currentWidth < 1368 && currentWidth >= 768:
      blockWidth = 418;
      break;
    case currentWidth < 768 && currentWidth >= 450:
      blockWidth = 281;
      break;
    case currentWidth < 450 && currentWidth >= 375:
      blockWidth = 230;
      break;
    case currentWidth < 375 && currentWidth >= 350:
      blockWidth = 230;
      break;
    default:
      break;
  }

  let ribbon_text = () => {
    let ribbonLength = Math.floor((props.currentWidth * 2.5) / blockWidth) - 1;
    let result = [];
    for (let i = 0; i < ribbonLength; i++) {
      result.push(
        <>
          <div className="app__container__ribbon__ticker__text fill">
            Be free.
          </div>
          <div className="app__container__ribbon__ticker__text outline">
            Be Prime.
          </div>
        </>
      );
    }
    return result;
  };

  return (
    <div className="app__container__ribbon">
      <div className="app__container__ribbon__ticker">{ribbon_text()}</div>
    </div>
  );
}

export default Ribbon;
