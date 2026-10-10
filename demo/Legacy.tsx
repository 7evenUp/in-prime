import { useState } from "react"

import Home from "./legacy/Home"
import RedesignHome from "./redesign/Home"
import BuySubscriptionDialog from "@/components/BuySubscriptionDialog"
import { getSubscriptions } from "./fixtures"
import { Resolution } from "@/types/resolution"

export default function Legacy({ resolution, version = "legacy" }: { resolution: Resolution; version?: "legacy" | "redesign" }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => getSubscriptions(version)[0])
  const [, setPromo] = useState("")
  return <>

    <div className={`${version}-site`} onClickCapture={event => {
      const tariff = (event.target as Element).closest?.(".app__container__subscribe__content__cost__block")
      if (tariff) {
        const months = Number(tariff.querySelector(".app__container__subscribe__content__cost__block__header__title")?.textContent.trim().split(" ")[0])
        const subscription = getSubscriptions(version).find(sub => sub.duration.id === months)
        if (subscription) { setSelected(subscription); setOpen(true) }
        return
      }
      const link = (event.target as Element).closest?.("a")
      if (link?.href.includes("t.me/CryptonLobbyBot")) {
        event.preventDefault(); event.stopPropagation(); setOpen(true)
      }
    }}>{version === "redesign" ? <RedesignHome /> : <Home />}</div>
    <BuySubscriptionDialog selectedSubscription={selected}
      order={1} resolution={resolution} setPromoForSubmit={setPromo} dialogOpen={open}
      setDialogOpen={setOpen} activePromocode={null} fallbackPromocode={null}>
      <span />
    </BuySubscriptionDialog>
  </>
}
