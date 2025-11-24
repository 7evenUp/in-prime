export interface ContainersResponse {
  containers: Container[]
  totalCount: number
}

export interface Container {
  id: number
  image: string
  isVisible: true
  name: string
  order: number
  price: number
  prizes: ContainerPrize[]
}

export interface ContainerPrize {
  numberInContainer: number
  prize: Prize
  remainingQuantity: number
}

export interface Prize {
  backgroundColor: string
  description: string
  id: number
  image: string
  link: string
  nftImageUrl: string
  rarity: string
  title: string
  totalCountForUser: number
  photos: [
    {
      id: number
      file: string
      orderNumber: number
    }
  ]
}

export interface OpenContainerResponse {
  userData: string
  prize: Prize
}

export interface FreeSpinResponse {
  backgroundColor: string
  claimedAt: string | null
  description: string
  id: number
  image: string
  instruction: string
  isClaimed: true
  isSold: boolean
  isUsed: boolean
  kind: null
  photos: [
    {
      id: number
      file: string
      orderNumber: number
    }
  ]
  prizeId: number
  rarity: string
  receivedAt: string
  title: string | null
  type: string
  unionBalancePrice: number
  usedAt: string | null
  userData: string
}
