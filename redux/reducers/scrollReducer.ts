import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IScrollReducer {
  scrollY: number
}

const initialState: IScrollReducer = {
  scrollY: 0,
}

const sections = {
  Главная: {
    name: "Главная",
    getPosition: () => 0,
  },
  "Оформить подписку": {
    name: "Оформить подписку",
    getPosition: () => document.getElementById("subscribe").offsetTop,
  },
  Возможности: {
    name: "Возможности",
    getPosition: () => document.getElementById("features").offsetTop,
  },
  Окупаемость: {
    name: "Окупаемость",
    getPosition: () => document.getElementById("guarantee").offsetTop,
  },
  Кейсы: {
    name: "Кейсы",
    getPosition: () => document.getElementById("examples").offsetTop,
  },
  Профиты: {
    name: "Профиты",
    getPosition: () => document.getElementById("achievements").offsetTop,
  },
  Команда: {
    name: "Команда",
    getPosition: () => document.getElementById("founder").offsetTop,
  },
  Подписка: {
    name: "Подписка",
    getPosition: () => document.getElementById("subscribe").offsetTop,
  },
  Отзывы: {
    name: "Отзывы",
    getPosition: () => document.getElementById("testimonials").offsetTop,
  },
  "Истории успеха": {
    name: "Истории успеха",
    getPosition: () => document.getElementById("histories").offsetTop,
  },
  Партнеры: {
    name: "Партнеры",
    getPosition: () => document.getElementById("earn").offsetTop,
  },
  FAQ: {
    name: "FAQ",
    getPosition: () => document.getElementById("faq").offsetTop,
  },
  BlackFriday: {
    name: "blackFriday",
    getPosition: () => document.getElementById("black-friday").offsetTop,
  },
  Достижения: {
    name: "Достижения",
    getPosition: () => document.getElementById("achievements").offsetTop,
  },
} as const

export const getSection = <Key extends keyof typeof sections>(
  section: Key
): (typeof sections)[Key] => sections[section]

export const scrollToSection = (
  section:
    | keyof typeof sections
    | Pick<(typeof sections)[keyof typeof sections], "getPosition">
) => {
  if (typeof section === "string") section = getSection(section)
  const headerEl = document.getElementById("header")
  const headerStyle = getComputedStyle(headerEl)
  const isFixed = headerStyle.position === "fixed"
  const headerHeight = isFixed ? parseInt(headerStyle.height) : 0
  const top = (section?.getPosition() || 0) - headerHeight
  window.scrollTo({ top, behavior: "smooth" })
}

export const scrollReducer = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setScrollY(state, action: PayloadAction<number>) {
      state.scrollY = action.payload
    },
  },
  selectors: { getScrollY: (state: IScrollReducer) => state.scrollY },
})
