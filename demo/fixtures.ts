import { examples } from "@/data/examples-old"
import { fallbackSubscriptions } from "@/sections/BuySubscription/fallback"
import type { Prize } from "@/blackFriday/Scroller/types"
import type { SiteVersion } from "./versions"
import { hasGifts } from "./versions"

// Case text and artwork come from the original repository, not the retired API.
export const incomeCases = Object.entries(examples).map(([name, items], group) => ({
  id: group + 1, name, order: group,
  incomeCases: items.map((item, order) => ({
    id: (group + 1) * 100 + order, group: group + 1, order, isActive: true,
    title: item.title, earn: item.earn, spend: item.spend, category: item.category,
    condition: item.condition, resource: item.resources,
    image: typeof item.img === "string" ? item.img : item.img.src,
    link: null,
  })),
}))

export const achievements = [
  ...[1, 2, 3, 4].map(i => ({ image: `/images/png/achievements/slide-${i}-sm.png`, size: "small" })),
  ...[1, 2].map(i => ({ image: `/images/png/achievements/slide-${i}-md.png`, size: "medium" })),
  ...[1, 2].map(i => ({ image: `/images/png/achievements/slide-${i}-lg.png`, size: "large" })),
].map((item, i) => ({ id: i + 1, order: i, isActive: true,
  image: item.image, imageSize: { id: item.size, label: item.size } }))

const localBenefitImage = (file: string) => {
  if (file.includes("spx1")) return "/images/black-friday/gifts/Safepal.png"
  if (file.includes("sweater")) return "/images/black-friday/gifts/Sweater.png"
  if (file.includes("pasha")) return "/images/png/ceo/pasha-square.png"
  return null
}
export function getSubscriptions(version: SiteVersion) {
  if (version === "legacy" || version === "redesign") {
    const prime = fallbackSubscriptions.find(sub => sub.id === 1)
    return [1, 3, 6, 12].map((months, i) => ({ ...prime, id: 501 + i,
      name: `Prime ${months} months`, duration: { id: months, label: String(months) },
      price: (version === "redesign" ? [74, 214, 405, 765] : [74, 214, 414, 765])[i], baseDiscount: null, baseDiscountAmount: null,
      benefits: prime.benefits.filter(benefit => !benefit.file),
    }))
  }
  return fallbackSubscriptions.map(sub => ({ ...sub,
    // Seasonal benefits only appear in the matching showcase.
    benefits: sub.benefits.filter(benefit => !benefit.file || (hasGifts(version) && localBenefitImage(benefit.file)))
      .map(benefit => ({ ...benefit,
        file: benefit.file ? localBenefitImage(benefit.file) : null })),
    ...(version === "black-friday" ? {
      baseDiscount: 50, baseDiscountAmount: sub.price * 0.5,
      isPromotionalModeActive: true,
    } : {}),
  }))
}

const giftNames = ["Iphone", "Macbook", "PS 5", "Steam", "Airpods", "Apple Watch", "Ledger", "Dolphin", "Tangem", "Safepal", "Scarf", "Sweater", "TG Premium", "ID", "TG Stars"]
const giftTitles = ["iPhone", "MacBook", "PlayStation 5", "Подарочная карта Steam", "AirPods", "Apple Watch", "Ledger", "Dolphin", "Tangem", "SafePal", "Шарф Crypton", "Свитер Web3 X-mas", "Telegram Premium", "Бонус Crypton ID", "Telegram Stars"]
export const prizes: Prize[] = giftNames.map((name, i) => ({
  id: i + 1, title: giftTitles[i],
  description: "Демонстрационный подарок из оригинальной промокампании Crypton. Попробуйте открыть кейс и увидеть случайный результат.",
  image: `/images/black-friday/gifts/${name}.png`,
  backgroundColor: i < 3 ? "#ae64ff" : "#67d9c7", rarity: i < 3 ? "legendary" : i < 10 ? "rare" : "common",
  link: null, nftImageUrl: null, totalCountForUser: 1, photos: [],
}))
export const containers = { totalCount: 1, containers: [{
  id: 1, image: "/images/black-friday/black-friday-white-gift.png", isVisible: true,
  name: "Подарочный кейс", order: 0, price: 0,
  prizes: prizes.map(prize => ({ prize, numberInContainer: 100, remainingQuantity: 100 })),
}] }

export const paymentMethods = [
  { id: 1, method: { id: "crypto", label: "Криптовалюта" }, currency: { id: "USDT", label: "USDT" }, network: { id: "BSC", label: "BSC" }, isDefault: true },
  { id: 2, method: { id: "crypto", label: "Криптовалюта" }, currency: { id: "USDT", label: "USDT" }, network: { id: "TRC20", label: "TRC20" }, isDefault: false },
  { id: 3, method: { id: "crypto", label: "Криптовалюта" }, currency: { id: "TON", label: "TON" }, network: { id: "TON", label: "TON" }, isDefault: false },
  { id: 4, method: { id: "card", label: "Банковская карта" }, currency: { id: "RUB", label: "RUB" }, network: null, isDefault: false },
].map(method => ({ ...method, isActive: true, createdDatetime: "2023-09-01T00:00:00Z" }))

