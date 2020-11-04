import { getToken, removeToken } from '../features/user/utils'

import { ReleaseItemFromApi, ReleaseFromApi } from '../types/api'
import { ReleaseType, ReleaseItem, Release } from '../types/releases'

async function parse(response: Response, withToken: boolean = false) {
  if (response.status === 204 || response.statusText === 'No Content') {
    return
  }

  if (withToken && response.status === 401) {
    await removeToken()
  }

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    console.error(e)

    throw { response, error: e } // eslint-disable-line
  }
  if (response.ok) {
    return data
  }
  throw { response, error: data } // eslint-disable-line
}

export async function fetchJSON(input: RequestInfo, init: RequestInit = {}) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
    },
  })
  return parse(response)
}

export async function fetchWithToken(
  input: RequestInfo,
  init: RequestInit = {},
) {
  const token = await getToken()

  if (!token) return

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  return parse(response, true)
}

export function ifElse(cond: boolean, ifComp: any, elseComp: any = null) {
  return cond ? ifComp : elseComp
}

export function getFont(
  family: 'primary' | 'secondary',
  weight: 400 | 600 | 700 | 800,
  italic = false,
) {
  function getWeight() {
    if (weight === 400) return `_400Regular`

    if (weight === 600) return `_600SemiBold`

    if (weight === 700) return `_700Bold`

    if (weight === 800) return `_800ExtraBold`
  }

  function getFamily() {
    if (family === 'primary') return 'Inter'

    if (family === 'secondary') return 'PTSerif'
  }

  function getItalic() {
    if (italic) {
      return `_Italic`
    }

    return ''
  }

  return `${getFamily()}${getWeight()}${getItalic()}`
}

export function releaseItemAdapter(release: ReleaseItemFromApi): ReleaseItem {
  const commonProps = {
    cover: release.covers.preview,
    id: release.id,
    release_id: release.release_id,
    released: new Date(release.released),
    title: release.title,
  }

  switch (release.type) {
    case 'movie':
      return {
        ...commonProps,
        director: release.director,
        type: ReleaseType.Films,
      }
    case 'game':
      return {
        ...commonProps,
        platforms: release.platforms,
        type: ReleaseType.Games,
      }
    case 'serial':
      return {
        ...commonProps,
        season: release.season,
        type: ReleaseType.Series,
      }
  }
}

export function releaseAdapter(release: ReleaseFromApi): Release {
  const commonProps = {
    cover: release.covers.preview,
    id: release.id,
    release_id: release.release_id,
    released: new Date(release.released),
    title: release.title,
    description: release.description.trim(),
    trailer: release.trailer_url || '',
    articles: release.related_articles || [],
  }

  switch (release.type) {
    case 'movie':
      return {
        ...commonProps,
        original_title: release.original_title || '',
        director: release.director,
        kinopoisk_url: release.kinopoisk_url,
        imdb_url: release.imdb_url,
        ratings: {
          imdb: release.foreign_ratings?.imdb_rating
            ? +release.foreign_ratings.imdb_rating.toFixed(1)
            : 0,
          kinopoisk: release.foreign_ratings?.kinopoisk_rating
            ? +release.foreign_ratings.kinopoisk_rating.toFixed(1)
            : 0,
        },
        type: ReleaseType.Films,
      }
    case 'game':
      return {
        ...commonProps,
        platforms: release.platforms,
        stores: release.stores || [],
        metacritic_ratings: release.rawg_io_fields?.metacritic_platforms
          ? release.rawg_io_fields.metacritic_platforms.map(ratingItem => ({
              url: ratingItem.url,
              platform: ratingItem.platform.slug,
              score: ratingItem.metascore,
            }))
          : [],
        genres: release.rawg_io_fields?.genres
          ? release.rawg_io_fields.genres.map(genre => genre.name)
          : [],
        type: ReleaseType.Games,
      }
    case 'serial':
      return {
        ...commonProps,
        kinopoisk_url: release.kinopoisk_url,
        imdb_url: release.imdb_url,
        season: release.season,
        type: ReleaseType.Series,
      }
  }
}
