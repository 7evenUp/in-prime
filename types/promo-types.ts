export interface IContainers {
  containers: IContainer[]
  totalCount: number
}

export interface IContainer {
  id: number
  name: string
  price: number
  image: string | null
  order: number
  isVisible: boolean
  prizes: IPrizes[]
}

export interface IPrizes {
  prize: IPrize
  numberInContainer: number
  remainingQuantity: number
}

export interface IPrize {
  id: number
  title: string
  description: string | null
  image: string | null
  link: string | null
  rarity: string | null
  backgorundColor: string | null
  totalCountForUser: number
  photos: {
    id: number
    file: string
    orderNumber: number
  }[]
}
