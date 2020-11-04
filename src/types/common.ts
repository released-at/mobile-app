export type MonthCalendarNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12

export type Id = number

export type DateParams = {
  month: MonthCalendarNumber
  year: number
}

export type Month = {
  rus: string
  eng: string
  jsNumber: number
  calendarNumber: number
}
