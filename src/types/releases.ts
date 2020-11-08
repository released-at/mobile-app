import { PostItem } from './blog'

export enum ReleaseTypes {
  Films = 'films',
  Games = 'games',
  Series = 'series',
}

export enum ReleaseType {
  Films = 'films',
  Games = 'games',
  Series = 'series',
}

export type ReleaseTypesTuple = [
  ReleaseTypes.Films,
  ReleaseTypes.Games,
  ReleaseTypes.Series,
]

export enum PlatformSlug {
  PC = 'pc',
  XboxOne = 'xbox-one',
  XboxSeries = 'xbox-series-x',
  PS4 = 'playstation4',
  PS5 = 'playstation5',
  NintendoSwitch = 'switch',
}

export enum GameStoreType {
  Steam = 'steam',
  EGS = 'epic-games',
  GOG = 'gog',
  XboxStore = 'xbox-store',
  PlayStationStore = 'playstation-store',
  NintendoStore = 'nintendo',
}

export enum GamePlatform {
  PC = 'pc',
  PS4 = 'ps_4',
  PS5 = 'ps_5',
  XboxOne = 'xbox_one',
  XboxSeries = 'xbox_series',
  NintendoSwitch = 'nintendo_switch',
}

export type GameStore = {
  type: GameStoreType
  link: string
  price: string
}

type CommonReleaseProps = {
  cover: string
  id: number
  release_id: number
  released: Date
  title: string
  description: string
  trailer: string
  articles: PostItem[]
}

export type Film = CommonReleaseProps & {
  director: string
  original_title: string
  kinopoisk_url: string
  imdb_url: string
  type: ReleaseType.Films
  ratings: {
    imdb: string
    kinopoisk: string
  }
}

export type Game = CommonReleaseProps & {
  platforms: GamePlatform[]
  stores: GameStore[]
  metacritic_ratings: { url: string; platform: PlatformSlug; score: number }[]
  genres: string[]
  type: ReleaseType.Games
}

export type Series = CommonReleaseProps & {
  season: number
  kinopoisk_url: string
  imdb_url: string
  type: ReleaseType.Series
}

export type Release = Film | Game | Series

type CommonReleaseItemProps = {
  cover: string
  id: number
  release_id: number
  released: Date
  title: string
}

export type FilmItem = CommonReleaseItemProps & {
  director: string
  type: ReleaseType.Films
}

export type GameItem = CommonReleaseItemProps & {
  platforms: GamePlatform[]
  type: ReleaseType.Games
}

export type SeriesItem = CommonReleaseItemProps & {
  season: number
  type: ReleaseType.Series
}

export type ReleaseItem = FilmItem | GameItem | SeriesItem
