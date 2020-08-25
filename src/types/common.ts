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

export type Id = number | string

export type DateParams = {
  month: MonthCalendarNumber
  year: number | string
}
