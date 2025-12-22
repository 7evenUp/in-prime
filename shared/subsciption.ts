import { fallbackSubscriptions } from "@/sections/BuySubscription/fallback"
import { Promocode, Subscription } from "@/types/api-types"

type CalculatedSubscriptionDetails = {
  originalPrice: number
  originalMonthlyPrice: number
  finalPrice: number
  finalMonthlyPrice: number
  totalDiscount?: null | { value: number; type: "$" | "%" }
}

export const getIsPromocodeValidForSubscription = ({
  subscription,
  promocode,
}: {
  subscription: Pick<Subscription, "id">
  promocode?: Pick<
    Promocode,
    "validForSubscriptions" | "invalidForSubscriptions"
  > | null
}) => {
  return (
    promocode &&
    (promocode.validForSubscriptions.length === 0 ||
      promocode.validForSubscriptions.includes(subscription.id)) &&
    (promocode.invalidForSubscriptions.length === 0 ||
      !promocode.invalidForSubscriptions.includes(subscription.id))
  )
}

export const calculateSubscriptionDetails = ({
  subscription,
  promocode,
}: {
  subscription: Pick<
    Subscription,
    | "baseDiscount"
    | "baseDiscountAmount"
    | "price"
    | "id"
    | "duration"
    | "individualPrice"
    | "referralDiscountAmount"
    | "referralDiscountKind"
    | "isPromotionalModeActive"
  >
  promocode?: Pick<
    Promocode,
    | "discountKind"
    | "discountAmount"
    | "discounts"
    | "validForSubscriptions"
    | "invalidForSubscriptions"
  > | null
}): CalculatedSubscriptionDetails => {
  const {
    baseDiscountAmount,
    baseDiscount,
    price,
    id,
    duration,
    individualPrice,
    referralDiscountAmount,
    referralDiscountKind,
    isPromotionalModeActive,
  } = subscription

  const isPromocodeValidForSubscription = getIsPromocodeValidForSubscription({
    subscription,
    promocode,
  })
  if (!isPromocodeValidForSubscription) promocode = null

  // Вычисляем цену подписки
  const subscriptionPrice = individualPrice || price

  // Вычисляем максимальную скидку (промокод или реферальная)
  const matchedDiscount = promocode?.discounts.find(
    (el) => el.subscriptionId === id
  )
  const preferredDiscount = matchedDiscount
    ? matchedDiscount.discountAmount
    : promocode?.discountAmount || 0

  const referralDiscount = referralDiscountAmount
    ? referralDiscountKind === "MONEY"
      ? referralDiscountAmount
      : Math.ceil(subscriptionPrice * referralDiscountAmount)
    : 0

  const promocodeDiscount = promocode
    ? promocode.discountKind?.id === "MONEY"
      ? preferredDiscount
      : Math.ceil(subscriptionPrice * preferredDiscount)
    : 0

  const maxDiscount = Math.max(referralDiscount, promocodeDiscount)

  // Вычисляем итоговую цену
  let effectiveDiscount = 0

  if (baseDiscount && baseDiscountAmount === null) {
    effectiveDiscount =
      Math.ceil(subscriptionPrice * (baseDiscount / 100)) + maxDiscount
  } else {
    effectiveDiscount = (baseDiscountAmount || 0) + maxDiscount
  }

  const finalPrice = subscriptionPrice - effectiveDiscount

  // Вычисляем общую скидку
  let discountValue: number
  let discountType: "$" | "%"

  // Если есть baseDiscount и promocode, комбинируем
  if (baseDiscount && promocode) {
    if (promocode.discountKind.id === "MONEY") {
      // Если промокод дает денежную скидку, конвертируем ее в проценты
      discountValue =
        (promocode.discountAmount * 100) / subscriptionPrice + baseDiscount
      discountType = "%" // Мы всегда работаем с процентами
    } else {
      // Если промокод дает процентную скидку, просто добавляем
      discountValue = baseDiscount + preferredDiscount * 100
      discountType = "%"
    }
  } else if (baseDiscount) {
    // Если есть только baseDiscount
    discountValue = baseDiscount
    discountType = "%"
  } else if (promocode) {
    // Если нет baseDiscount, используем только промокод
    if (promocode.discountKind.id === "MONEY") {
      // Если промокод дает денежную скидку, конвертируем ее в проценты
      discountValue = preferredDiscount
      discountType = "$"
    } else {
      // Если промокод дает процентную скидку
      discountValue = preferredDiscount * 100
      discountType = "%"
    }
  }

  const res = {
    finalPrice,
    finalMonthlyPrice: Math.round(finalPrice / duration.id),

    originalPrice: subscriptionPrice,
    originalMonthlyPrice: Math.round(subscriptionPrice / duration.id),

    totalDiscount: discountValue
      ? { value: Math.floor(discountValue), type: discountType }
      : null,
  }

  return res
}

const promocodeNull = null
const promocodeNEW = {
  code: "NEW",
  discountKind: { id: "PERCENT", label: "%" },
  discountAmount: 0.1,
  discounts: [
    { subscriptionId: 3, discountAmount: 0.15 },
    { subscriptionId: 4, discountAmount: 0.15 },
    { subscriptionId: 6, discountAmount: 0.2 },
  ],
  isReferralCode: false,
  validForSubscriptions: [6, 4, 3, 1],
  invalidForSubscriptions: [],
}
const promocode5$ = {
  code: "CRYPTON",
  discountKind: { id: "MONEY", label: "Money" },
  discountAmount: 5.0,
  discounts: [
    { subscriptionId: 6, discountAmount: 5.0 },
    { subscriptionId: 4, discountAmount: 5.0 },
    { subscriptionId: 3, discountAmount: 5.0 },
  ],
  isReferralCode: true,
  validForSubscriptions: [],
  invalidForSubscriptions: [],
}
const promocode20Percent = {
  code: "TEST_20_PECTENT",
  discountKind: { id: "PERCENT", label: "%" },
  discountAmount: 0.2,
  discounts: [],
  isReferralCode: false,
  validForSubscriptions: [],
  invalidForSubscriptions: [],
}
const promocode20USD = {
  code: "TEST_20_USD",
  discountKind: { id: "MONEY", label: "Money" },
  discountAmount: 20.0,
  discounts: [],
  isReferralCode: false,
  validForSubscriptions: [],
  invalidForSubscriptions: [],
}

const result = {
  1: {
    [promocodeNull?.code]: {
      finalPrice: 99,
      finalMonthlyPrice: 99,
      totalDiscount: null,
    },
    [promocode5$.code]: {
      finalPrice: 94,
      finalMonthlyPrice: 94,
      totalDiscount: { value: 5, type: "$" },
    },
    [promocodeNEW.code]: {
      finalPrice: 89,
      finalMonthlyPrice: 89,
      totalDiscount: { value: 10, type: "%" },
    },
    [promocode20USD.code]: {
      finalPrice: 79,
      finalMonthlyPrice: 79,
      totalDiscount: { value: 20, type: "%" },
    },
    [promocode20Percent.code]: {
      finalPrice: 79,
      finalMonthlyPrice: 79,
      totalDiscount: { value: 20, type: "%" },
    },
  },
  3: {
    [promocodeNull?.code]: {
      finalPrice: 282,
      finalMonthlyPrice: 94,
      totalDiscount: { value: 5, type: "%" },
    },
    [promocode5$.code]: {
      finalPrice: 277,
      finalMonthlyPrice: 92,
      totalDiscount: { value: 7, type: "%" },
    },
    [promocodeNEW.code]: {
      finalPrice: 237,
      finalMonthlyPrice: 79,
      totalDiscount: { value: 20, type: "%" },
    },
    [promocode20USD.code]: {
      finalPrice: 262,
      finalMonthlyPrice: 87,
      totalDiscount: { value: 12, type: "%" },
    },
    [promocode20Percent.code]: {
      finalPrice: 222,
      finalMonthlyPrice: 74,
      totalDiscount: { value: 25, type: "%" },
    },
  },
  4: {
    [promocodeNull?.code]: {
      finalPrice: 534,
      finalMonthlyPrice: 89,
      totalDiscount: { value: 10, type: "%" },
    },
    [promocode5$.code]: {
      finalPrice: 529,
      finalMonthlyPrice: 88,
      totalDiscount: { value: 11, type: "%" },
    },
    [promocodeNEW.code]: {
      finalPrice: 444,
      finalMonthlyPrice: 74,
      totalDiscount: { value: 25, type: "%" },
    },
    [promocode20USD.code]: {
      finalPrice: 514,
      finalMonthlyPrice: 85,
      totalDiscount: { value: 13, type: "%" },
    },
    [promocode20Percent.code]: {
      finalPrice: 415,
      finalMonthlyPrice: 69,
      totalDiscount: { value: 30, type: "%" },
    },
  },
  6: {
    [promocodeNull?.code]: {
      finalPrice: 999,
      finalMonthlyPrice: 83,
      totalDiscount: { value: 15, type: "%" },
    },
    [promocode5$.code]: {
      finalPrice: 994,
      finalMonthlyPrice: 82,
      totalDiscount: { value: 15, type: "%" },
    },
    [promocodeNEW.code]: {
      finalPrice: 771,
      finalMonthlyPrice: 64,
      totalDiscount: { value: 35, type: "%" },
    },
    [promocode20USD.code]: {
      finalPrice: 989,
      finalMonthlyPrice: 82,
      totalDiscount: { value: 17, type: "%" },
    },
    [promocode20Percent.code]: {
      finalPrice: 771,
      finalMonthlyPrice: 64,
      totalDiscount: { value: 35, type: "%" },
    },
  },
} satisfies Record<
  number,
  Record<
    string,
    {
      finalPrice: number
      finalMonthlyPrice: number
      totalDiscount: { value: number; type: "$" | "%" }
    }
  >
>

export function execTest() {
  console.log("\n\n\nTESTING calculateSubscriptionDetails\n\n\n")

  for (const subscription of fallbackSubscriptions) {
    for (const promocode of [
      promocodeNull,
      promocodeNEW,
      promocode5$,
      promocode20Percent,
      promocode20USD,
    ]) {
      let eq = false
      const { finalPrice, finalMonthlyPrice, totalDiscount } =
        calculateSubscriptionDetails({ promocode, subscription })
      const target = result[subscription.id][promocode?.code]
      eq = target.finalPrice === finalPrice
      if (!eq)
        console.log(
          "finalPrice",
          subscription.id,
          promocode?.code,
          target.finalPrice
        )
      eq = target.finalMonthlyPrice === finalMonthlyPrice
      if (!eq)
        console.log(
          "finalMonthlyPrice",
          subscription.id,
          promocode?.code,
          target.finalMonthlyPrice
        )
      eq =
        (!totalDiscount && !target.totalDiscount) ||
        (target.totalDiscount?.value === totalDiscount.value &&
          target.totalDiscount?.type === totalDiscount.type)
      if (!eq)
        console.log(
          "totalDiscount.value",
          subscription.id,
          promocode?.code,
          "current - ",
          totalDiscount.value,
          totalDiscount.type,
          "target - ",
          target.totalDiscount?.value,
          target.totalDiscount?.type
        )
    }
  }
}
