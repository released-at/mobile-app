import { ReleaseTypes } from '../types/ReleaseTypes'

interface RequestReleasesParams {
  type: keyof typeof ReleaseTypes
  date: string
}

interface RequestReleaseParams {
  id: string
}

class Api {
  static base = 'https://api.released.at/api'

  async releases({ type, date }: RequestReleasesParams) {
    try {
      const response = await fetch(Api.base + `/${type}?date=${date}`)
      const json = await response.json()

      if (response.ok) {
        return json
      } else {
        return {
          error: json,
        }
      }
    } catch (e) {
      return {
        error: e,
      }
    }
  }

  async release({ id }: RequestReleaseParams) {
    try {
      const response = await fetch(Api.base + `/releases/${id}`)
      const json = await response.json()

      if (response.ok) {
        return json
      } else {
        return {
          error: json,
        }
      }
    } catch (e) {
      return {
        error: e,
      }
    }
  }
}

const api = new Api()

export { api }
