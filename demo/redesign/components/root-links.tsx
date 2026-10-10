import React from "react"

import ArrowUp from "@/public/redesign-assets/images/jsx/icons/arrow-up"

const RootLinks = (props) => {
  return (
    <a href={props.link} target={"_blank"}>
      <div className={`root__column__item ${"hover-" + props.hover}`}>
        <ArrowUp />
        <div className="root__column__item__text">{props.title}</div>
      </div>
    </a>
  )
}

export default RootLinks
