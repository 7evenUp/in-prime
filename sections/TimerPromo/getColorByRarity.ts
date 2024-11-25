type Rarity = "common" | "uncommon" | "mythical" | "rare" | "legendary"

const rarityColors: Record<Rarity, string> = {
  common: "#fff",
  uncommon: "linear-gradient(90deg, #82a4fe 0%, #6e95ff 100%)",
  mythical: "linear-gradient(90deg, #bca5f9 0%, #bf9ef5 100%)",
  rare: "linear-gradient(90deg, #fd545f 0%, #fc686b 100%)",
  legendary: "linear-gradient(90deg, #ffee37 0%, #ffeb1a 100%)",
}

export const getColorByRarity = (
  rarity: string | null,
  bgColor?: string | null
): string => {
  return rarityColors[rarity as Rarity] || "#fff"
}
