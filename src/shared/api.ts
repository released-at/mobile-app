import { ReleaseType } from '../types/releases'
import { Id, DateParams } from '../types/common'
import { fetchJSON, fetchWithToken } from './utils'
import { endpoints } from './constants'

// Releases
// Possibly type: movies, games, serials
// Date format example: 01-2020
export const releases = (type: ReleaseType, date: DateParams) =>
  fetch(endpoints.RELEASES(type, date)).then(res => res.json())
export const release = (id: Id) =>
  fetch(endpoints.RELEASE(id)).then(res => res.json())
export const expect = ({ id }: { id: Id }) =>
  fetchWithToken(endpoints.EXPECT(id), {
    method: 'post',
  })
export const today = () => fetchJSON(endpoints.TODAY)
export const films = () => fetchJSON(endpoints.FILMS)

// Auth
export const sendConfirmCode = (email: string) =>
  fetchJSON(endpoints.USERS, {
    method: 'post',
    body: JSON.stringify({ email }),
  })
export const confirm = ({ email, code }: { email: string; code: string }) =>
  fetchJSON(endpoints.TOKENS, {
    method: 'post',
    body: JSON.stringify({ email, otp: code }),
  })
export const logout = () =>
  fetchJSON(endpoints.TOKENS, {
    method: 'delete',
  })

// User
export const me = () => fetchWithToken(endpoints.PROFILE)

/* Blog */
export const posts = () => fetchJSON(endpoints.POSTS)
export const post = (id: Id) => fetchJSON(endpoints.POST(id))
