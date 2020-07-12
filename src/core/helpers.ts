import { ReleaseTypes } from '../types/ReleaseTypes'

export function range(start: number, end: number): number[] {
  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

export const groupBy = (key: string) => (array: any[]) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

export function mapTypesToRu(type: keyof typeof ReleaseTypes): string {
  if (type === 'games') return 'Игры'
  if (type === 'movies') return 'Кино'
  if (type === 'serials') return 'Сериалы'
  return ''
}

const months = [
  { eng: 'january', rus: 'январь', jsNumber: 0, calendarNumber: 1 },
  { eng: 'february', rus: 'февраль', jsNumber: 1, calendarNumber: 2 },
  { eng: 'march', rus: 'март', jsNumber: 2, calendarNumber: 3 },
  { eng: 'april', rus: 'апрель', jsNumber: 3, calendarNumber: 4 },
  { eng: 'may', rus: 'май', jsNumber: 4, calendarNumber: 5 },
  { eng: 'june', rus: 'июнь', jsNumber: 5, calendarNumber: 6 },
  { eng: 'july', rus: 'июль', jsNumber: 6, calendarNumber: 7 },
  { eng: 'august', rus: 'август', jsNumber: 7, calendarNumber: 8 },
  { eng: 'september', rus: 'сентябрь', jsNumber: 8, calendarNumber: 9 },
  { eng: 'october', rus: 'октябрь', jsNumber: 9, calendarNumber: 10 },
  { eng: 'november', rus: 'ноябрь', jsNumber: 10, calendarNumber: 11 },
  { eng: 'december', rus: 'декабрь', jsNumber: 11, calendarNumber: 12 },
]

export function getNextAndPrevDate(
  currentMonthJSNumber: number,
  currentYear: number,
) {
  const nextMonthIndex =
    currentMonthJSNumber === 11 ? 0 : currentMonthJSNumber + 1
  const nextYear = nextMonthIndex === 0 ? currentYear + 1 : currentYear

  const prevMonthIndex =
    currentMonthJSNumber === 0 ? 11 : currentMonthJSNumber - 1
  const prevYear = prevMonthIndex === 11 ? currentYear - 1 : currentYear

  return {
    nextMonth: months[nextMonthIndex],
    nextYear,
    prevMonth: months[prevMonthIndex],
    prevYear,
  }
}
