type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "immortal"
  | "contraband"
  | "legendary"

const rarityColors: Record<Rarity, string> = {
  common: "#a3a5a7",
  uncommon: "#008EFF",
  rare: "#615DFF",
  immortal: "#FAC70E",
  contraband: "#fa940e",
  legendary: "#ff4654",
}

export const getColorByRarity = (
  rarity: string | null,
  bgColor?: string | null
): string => {
  if (bgColor) return bgColor

  return rarityColors[rarity as Rarity] || "#FFFFFF"
}
