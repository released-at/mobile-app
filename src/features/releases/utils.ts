import { addMonths, isEqual } from 'date-fns/esm'
import { months } from '../../shared/constants'

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

interface Month {
  eng: string
  rus: string
  jsNumber: number
  calendarNumber: number
}

export function getDateInfo(params: { month: Month; year: number }) {
  function getNextAndPrevDate(
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

  const { month, year } = params

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    month.jsNumber,
    year,
  )

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  return {
    selectedMonth: month,
    year,
    nextYear,
    prevYear,
    nextMonth,
    prevMonth,
    isCurrentMonth: isEqual(
      new Date(currentYear, currentMonth, 1),
      new Date(year, month.jsNumber, 1),
    ),
    isNextMonth: isEqual(
      addMonths(new Date(currentYear, currentMonth, 1), 1),
      new Date(year, month.jsNumber, 1),
    ),
  }
}
