export const versions = [
  { id: "latest", label: "Последний актуальный вариант", description: "Последний сохранённый вид лендинга в репозитории." },
  { id: "legacy", label: "До сентября 2023", description: "Архив от 25.08.2023, до начала работы над Next.js и TypeScript." },
  { id: "redesign", label: "Редизайн · октябрь–ноябрь 2023", description: "Архив начала ноября 2023: новый дизайн и roadmap проектов сообщества." },
  { id: "birthday", label: "День рождения", description: "Праздничный лендинг с подписками и подарками." },
  { id: "new-year", label: "Новый год", description: "Зимнее оформление, снег и подарки." },
  { id: "black-friday", label: "Чёрная пятница", description: "Промооформление, скидки на подписки и рулетка подарков." },
] as const
export type SiteVersion = typeof versions[number]["id"]
export const isSiteVersion = (value: unknown): value is SiteVersion => versions.some(version => version.id === value)
export const hasGifts = (version: SiteVersion) => ["birthday", "new-year", "black-friday"].includes(version)
