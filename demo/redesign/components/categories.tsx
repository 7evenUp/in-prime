import React from "react"

import Node from "@/public/redesign-assets/images/jsx/categories/node"
import Launchpad from "@/public/redesign-assets/images/jsx/categories/launchpad"
import Testnet from "@/public/redesign-assets/images/jsx/categories/testnet"
import Nft from "@/public/redesign-assets/images/jsx/categories/nft"

const Categories = (props) => (
  <div className="categories">
    <div className="categories__big-circle"></div>
    <div className="categories__medium-circle"></div>
    <div className="categories__small-circle"></div>
    <div className="categories__top-line"></div>
    <div className="categories__left-line"></div>
    <div className="categories__bottom-line"></div>
    <div className="categories__right-line"></div>
    <div className="categories__cube"></div>
    <Node />
    <Launchpad />
    <Testnet />
    <Nft />
  </div>
)

export default Categories
