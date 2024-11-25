const getWordForm = (
  count: number,
  forms: [string, string, string]
): string => {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod100 >= 11 && mod100 <= 19) {
    return forms[2]
  }
  if (mod10 === 1) {
    return forms[0]
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return forms[1]
  }
  return forms[2]
}

export const calculateTimeDifference = (openedDatetime: string): string => {
  const openedDate = new Date(openedDatetime)
  const now = new Date()

  const nowUtc = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours() + 3, // Добавляем 3 часа к UTC
    now.getUTCMinutes(),
    now.getUTCSeconds()
  )

  // Разница в миллисекундах
  const diffMs = nowUtc.getTime() - openedDate.getTime()

  // Конвертация в дни, часы и минуты
  const minutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0)
    return `${days} ${getWordForm(days, ["день", "дня", "дней"])} назад`
  if (hours > 0)
    return `${hours} ${getWordForm(hours, ["час", "часа", "часов"])} назад`
  return `${minutes} ${getWordForm(minutes, [
    "минута",
    "минуты",
    "минут",
  ])} назад`
}
