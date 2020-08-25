export enum ReleaseTypes {
  Films = 'movies',
  Games = 'games',
  Series = 'serials',
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
