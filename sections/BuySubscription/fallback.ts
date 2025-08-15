import { Subscription } from "@/types/api-types"

export const fallbackSubscriptions: Subscription[] = [
  {
    id: 1,
    benefits: [
      {
        id: 20,
        translations: {
          ru: {
            name: "Розыгрыш WL и подарков",
            description:
              "Розыгрыш эксклюзивных WL-ов на аллокации и подарков от наших партнеров",
          },
        },
        file: null,
        remainingCount: null,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 22,
        translations: {
          ru: {
            name: "+5% кэшбэк в Crypton Points",
            description:
              "Валюта нашего будущего магазина, в котором вы сможете найти уникальные вещи для криптанов",
          },
        },
        file: null,
        remainingCount: null,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 19,
        translations: {
          ru: {
            name: "Бесплатные OTC-сделки",
            description:
              "Доступ к неограниченным бесплатным P2P-сделкам на  Crypton OTC",
          },
        },
        file: null,
        remainingCount: null,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 21,
        translations: {
          ru: {
            name: "Доступ к полезным инструментам",
            description:
              "Например, вы получите доступ к подборке с актуальными нодами и инструкциями по их установке, актуальному списку NFT активностей и таблице с событиями, на которых вы гарантировано заработаете",
          },
        },
        file: null,
        remainingCount: null,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 35,
        translations: {
          ru: {
            name: "Свитер “Web3 X-mas”",
            description:
              "Это не типичный предмет гардероба, а настоящее произведение искусства, пропитанное новогодним настроением и духом Web3",
          },
        },
        file: "https://s3.crypton.xyz/union-dev/media/sweater_HWhtiYQ.png",
        remainingCount: 94,
        quantity: null,
        type: "COMMON",
      },
    ],
    baseDiscountAmount: null,
    duration: {
      id: 1,
      label: "One",
    },
    name: "Prime 1 month",
    price: 129.0,
    isActive: true,
    kindId: 1,
    kind: {
      id: 1,
      name: "Prime",
      rang: 0,
    },
    baseDiscount: null,
    referralDiscountAmount: 0.0,
    referralDiscountKind: null,
    isPromotionalModeActive: false,
  },
  {
    id: 6,
    benefits: [
      {
        id: 28,
        translations: {
          ru: {
            name: "Safepal Х1",
            description:
              "Безопасный и качественный кошелек, который позволит ТОЛЬКО ВАМ владеть вашей криптовалютой",
          },
        },
        file: "https://s3.crypton.xyz/union-dev/media/spx1.png",
        remainingCount: 121,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 34,
        translations: {
          ru: {
            name: "Свитер “Web3 X-mas”",
            description:
              "Это не типичный предмет гардероба, а настоящее произведение искусства, пропитанное новогодним настроением и духом Web3",
          },
        },
        file: "https://s3.crypton.xyz/union-dev/media/sweater.png",
        remainingCount: 1000,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 37,
        translations: {
          ru: {
            name: 'Hoodie "NOW OR NEVER”',
            description:
              "В быстро меняющемся мире криптовалют главное - не упустить момент! Носите этот худи как ежедневное напоминание о том, что лучше сделать все сейчас, чем никогда.",
          },
        },
        file: "https://s3.crypton.xyz/union-dev/media/IMG_2339.png",
        remainingCount: 94,
        quantity: null,
        type: "COMMON",
      },
      {
        id: 39,
        translations: {
          ru: {
            name: "Личная консультация с Пашей (CEO Crypton)",
            description:
              "Личная консультация с основателем Crypton — Павлом Сычевым. За 30 минут он передаст вам концентрат опыта, который поможет избежать 99% ошибок в билдинге Web3 проектов.",
          },
        },
        file: "https://s3.crypton.xyz/union-dev/media/pasha-square.png",
        remainingCount: null,
        quantity: null,
        type: "COMMON",
      },
    ],
    baseDiscountAmount: 618,
    duration: {
      id: 12,
      label: "Twelve",
    },
    name: "Prime 12 months",
    price: 1548.0,
    isActive: true,
    kindId: 1,
    kind: {
      id: 1,
      name: "Prime",
      rang: 0,
    },
    baseDiscount: 39,
    referralDiscountAmount: 0.0,
    referralDiscountKind: null,
    isPromotionalModeActive: false,
  },
  {
    id: 10,
    benefits: [],
    baseDiscountAmount: null,
    duration: {
      id: 1,
      label: "One",
    },
    name: "Pro 1 month",
    price: 74.0,
    isActive: true,
    kindId: 2,
    kind: {
      id: 2,
      name: "Pro",
      rang: 1,
    },
    baseDiscount: null,
    referralDiscountAmount: 0.0,
    referralDiscountKind: null,
    isPromotionalModeActive: false,
  },
  {
    id: 13,
    benefits: [],
    baseDiscountAmount: 142,
    duration: {
      id: 12,
      label: "Twelve",
    },
    name: "Pro 12 months",
    price: 711.0,
    isActive: true,
    kindId: 2,
    kind: {
      id: 2,
      name: "Pro",
      rang: 1,
    },
    baseDiscount: 19,
    referralDiscountAmount: 0.0,
    referralDiscountKind: null,
    isPromotionalModeActive: false,
  },
  {
    id: 14,
    benefits: [],
    baseDiscountAmount: null,
    duration: {
      id: 1,
      label: "One",
    },
    name: "Start 1",
    price: 39.0,
    isActive: true,
    kindId: 3,
    kind: {
      id: 3,
      name: "Start",
      rang: 2,
    },
    baseDiscount: null,
    referralDiscountAmount: 0.0,
    referralDiscountKind: null,
    isPromotionalModeActive: false,
  },
  {
    id: 15,
    benefits: [],
    baseDiscountAmount: 38,
    duration: {
      id: 12,
      label: "Twelve",
    },
    name: "Start 12",
    price: 468.0,
    isActive: true,
    kindId: 3,
    kind: {
      id: 3,
      name: "Start",
      rang: 2,
    },
    baseDiscount: 8,
    referralDiscountAmount: 0.0,
    referralDiscountKind: null,
    isPromotionalModeActive: false,
  },
]
