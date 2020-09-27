import { MonthCalendarNumber, DateParams } from '../../types/common'

export function toNextMonth({ month, year }: DateParams): DateParams {
  const isDecember = month === 12

  const nextMonth = (isDecember ? 1 : month + 1) as MonthCalendarNumber
  const nextYear = isDecember ? year + 1 : year

  return {
    month: nextMonth,
    year: nextYear,
  }
}

export function toPrevMonth({ month, year }: DateParams): DateParams {
  const isJanuary = month === 1

  const prevMonth = (isJanuary ? 12 : month - 1) as MonthCalendarNumber
  const prevYear = isJanuary ? year - 1 : year

  return {
    month: prevMonth,
    year: prevYear,
  }
}
