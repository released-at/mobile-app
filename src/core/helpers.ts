import { ReleaseTypes } from '../types/ReleaseTypes'

export function range(start: number, end: number): number[] {
  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

export const groupBy = (key: string) => (array: any[]) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

export function mapTypesToRu(type: keyof typeof ReleaseTypes): string {
  if (type === 'games') return 'Игры'
  if (type === 'movies') return 'Кино'
  if (type === 'serials') return 'Сериалы'
  return ''
}
