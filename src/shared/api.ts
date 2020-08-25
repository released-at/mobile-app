import { ReleaseType } from 'types/releases'
import { Id, DateParams } from 'types/common'
import { fetchJSON, fetchWithToken } from './utils'
import { endpoints } from './constants'

// Releases
// Possibly type: movies, games, serials
// Date format example: 01-2020
export const releases = (type: ReleaseType, date: DateParams) =>
  fetchJSON(endpoints.RELEASES(type, date))
export const release = (id: Id) => fetchJSON(endpoints.RELEASE(id))
export const expect = (id: Id) =>
  fetchWithToken(endpoints.EXPECT(id), {
    method: 'post',
  })

// Auth
export const sendConfirmCode = (email: string) =>
  fetchJSON(endpoints.USERS, {
    method: 'post',
    body: JSON.stringify({ email }),
  })
export const confirm = (email: string, code: string) =>
  fetchJSON(endpoints.TOKENS, {
    method: 'post',
    body: JSON.stringify({ email, otp: code }),
  })
export const logout = () =>
  fetchJSON(endpoints.TOKENS, {
    method: 'delete',
  })

// User
export const me = (token: string) =>
  fetchWithToken(endpoints.PROFILE, {}, token)
