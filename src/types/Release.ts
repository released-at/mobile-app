interface CommonReleaseField {
  cover: string
  description: string
  released: string
  trailer_url: string
  id: number
  title: string
}

export interface Store {
  link: string
  price?: string
  type: string
}

export interface RawgStore {
  id: number
  url: string
  store: {
    domain: string
    id: number
    games_count: number
    image_background: string
    name: string
    slug: string
  }
}

export type Platform = 'pc' | 'xbox_one' | 'ps_4' | 'nintendo_switch'

type SpecifyReleaseField =
  | {
      type: 'movie'
      director: string
      is_digital: boolean
      is_premier: boolean
      original_title: string
      imdb_url: string
      kinopoisk_url: string
    }
  | {
      type: 'game'
      platforms: Platform[]
      metacritic_url: string
      stores: Store[]
      rawg_io_fields: any
    }
  | {
      type: 'serial'
      director: string
      season: number
      imdb_url: string
      kinopoisk_url: string
    }

export type Release = SpecifyReleaseField & CommonReleaseField
