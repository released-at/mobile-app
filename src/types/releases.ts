export enum ReleaseTypes {
  Films = 'films',
  Games = 'games',
  Series = 'series',
}

export type ReleaseType =
  | ReleaseTypes.Films
  | ReleaseTypes.Games
  | ReleaseTypes.Series

export type ReleaseTypesTuple = [
  ReleaseTypes.Films,
  ReleaseTypes.Games,
  ReleaseTypes.Series,
]

export enum Platforms {
  PS4 = 'ps_4',
  NintendoSwitch = 'nintendo_switch',
  XboxOne = 'xbox_one',
  PC = 'pc',
}

export type ReleaseInList = {
  title: string
  released: string
  release_id: number
  cover: string
  director?: string
  platforms?: Platforms[]
  season?: number
}

export type Releases = ReleaseInList[]
