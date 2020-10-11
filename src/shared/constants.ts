import { ReleaseType } from '../types/releases'
import { Id, DateParams } from '../types/common'

export const months = [
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

const BASE = 'https://api.released.at'
const API_URL = BASE + '/api'

const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()

export const endpoints = {
  HOMEPAGE_RELEASED: `${API_URL}/movies?date=${currentMonth}-${currentYear}`,
  RELEASES: (type: ReleaseType, { month, year }: DateParams): string =>
    `${API_URL}/${type}?date=${month}-${year}`,
  RELEASE: (id: Id) => `${API_URL}/releases/${id}`,
  USERS: `${API_URL}/users`,
  TOKENS: `${API_URL}/tokens`,
  PROFILE: `${API_URL}/profile`,
  EXPECT: (id: Id) => `${API_URL}/releases/${id}/expect`,
  POSTS: `${API_URL}/blog_posts`,
  POST: (id: Id) => `${API_URL}/blog_posts/${id}`,
  TODAY: `${API_URL}/releases/today`,
  FILMS: `${API_URL}/films`,
}
