import { GamePlatform, PlatformSlug, GameStore } from './releases'
import { PostItem } from './blog'

interface CommonReleaseItemProps {
  cover: string
  covers: {
    default: string
    preview: string
  }
  description: string
  id: number
  release_id: number
  released: string
  site: string
  title: string
  is_expected: boolean
}

export enum ReleaseTypeInApi {
  Films = 'movies',
  Games = 'games',
  Series = 'serials',
}

type KPAndImdbRatings = {
  imdb_rating?: number
  imdb_num_vote?: number
  kinopoisk_rating?: number
  kinopoisk_num_vote?: number
}

export type FilmItemFromApi = CommonReleaseItemProps & {
  director: string
  foreign_ratings: KPAndImdbRatings
  imdb_url: string
  is_digital: boolean
  is_premier: boolean
  kinopoisk_url: string
  type: 'movie'
}

export type GameItemFromApi = CommonReleaseItemProps & {
  metacritic_url: string
  platforms: GamePlatform[]
  trailer: string
  type: 'game'
}

export type SeriesItemFromApi = CommonReleaseItemProps & {
  director: string
  season: number
  type: 'serial'
}

export type ReleaseItemFromApi =
  | FilmItemFromApi
  | GameItemFromApi
  | SeriesItemFromApi

interface CommonReleaseProps {
  cover: string
  covers: {
    default: string
    preview: string
  }
  description: string
  id: number
  release_id: number
  released: string
  site: string
  title: string
  is_expected: boolean
  trailer_url: string
  related_articles: PostItem[]
}

type FilmFromApi = CommonReleaseProps & {
  original_title?: string
  director: string
  foreign_ratings?: KPAndImdbRatings
  imdb_url: string
  is_digital: boolean
  is_premier: boolean
  kinopoisk_url: string
  type: 'movie'
}

type GameFromApi = CommonReleaseProps & {
  metacritic_url: string
  platforms: GamePlatform[]
  rawg_io_fields?: {
    genres?: {
      id: number
      name: string
      slug: string
      games_count: number
      image_background: string
    }[]
    metacritic_platforms?: {
      url: string
      platform: { name: string; slug: PlatformSlug; platform: number }
      metascore: number
    }[]
  }
  stores?: GameStore[]
  type: 'game'
}

type SeriesFromApi = CommonReleaseProps & {
  director: string
  season: number
  imdb_url: string
  kinopoisk_url: string
  type: 'serial'
}

export type ReleaseFromApi = FilmFromApi | GameFromApi | SeriesFromApi

export type PostFromApi = {
  post: {
    cover: string
    created_at: number
    id: number
    title: string
    body: string
  }
}

export type PostItemFromApi = {
  cover: string
  created_at: number
  id: number
  title: string
}

export type PostsFromApi = {
  posts: PostItemFromApi[]
}

export type UserFromApi = {
  current_user: {
    email: string
  }
  expected: {
    [ReleaseTypeInApi.Films]: FilmItemFromApi[]
    [ReleaseTypeInApi.Games]: GameItemFromApi[]
    [ReleaseTypeInApi.Series]: SeriesItemFromApi[]
  }
}
