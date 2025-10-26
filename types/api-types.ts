export interface Subscription {
  id: number
  baseDiscount: number | null
  baseDiscountAmount: number | null
  referralDiscountKind: string | null
  referralDiscountAmount: number | null
  benefits: Benefit[]
  duration: {
    id: number
    label: string
  }
  isActive: boolean
  isPromotionalModeActive: boolean
  kindId: number
  name: string
  price: number
  individualPrice?: number
  kind: {
    id: number
    name: string
    rang: number
  }
}

export interface Benefit {
  id: number
  file: null | string
  translations: {
    ru: {
      name: string
      description: string | null
    }
  }
  quantity: number | null
  remainingCount: number | null
  type: string | null
}

export interface Promocode {
  code: string
  discountAmount: number
  discountKind: { id: "MONEY" | "PERCENT"; label: "Money" | "%" }
  discounts: Array<{
    subscriptionId: number
    discountAmount: number
  }>
  isReferralCode: boolean
  validForSubscriptions: number[]
  invalidForSubscriptions: number[]
}

export interface PaymentsMethod {
  createdDatetime: string
  currency: {
    id: string
    label: string
  }
  id: number
  isActive: boolean
  isDefault: boolean
  method: {
    id: "crypto" | "card"
    label: string
  }
  network: {
    id: string
    label: string
  } | null
}

export interface PaymentRequestArgs {
  paymentType: "crypto" | "card"
  network?: string
  currency?: string
  isReceiptNeed: boolean
  successUrl: string
  failUrl: string
  subscriptionId: number
  promoCode?: string
  referral_code?: string | string[]
  email: string
  utm?: string
}
