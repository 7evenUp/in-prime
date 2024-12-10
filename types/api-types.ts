export interface Subscription {
  id: number
  baseDiscount: number | null
  baseDiscountAmount: number | null
  referralDiscountKind: string | null
  referralDiscountAmount: number | null
  benefits: Array<{
    id: number
    file: null | string
    translations: {
      ru: {
        name: string
        description: string | null
      }
    }
    remainingCount: number | null
  }>
  duration: {
    id: number
    label: string
  }
  isActive: boolean
  kindId: 1 | 2 // 1 - prime | 2 - calendar
  name: string
  price: number
  individualPrice?: number
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
}
