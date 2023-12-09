import { isString } from '..'

type SortCriteria<T> = {
  order?: 'asc' | 'desc'
  by?: (item: T) => number | bigint | Date | string
}

export const sort = <T>(
  arr: readonly T[],
  ...criteria: SortCriteria<T>[]
): T[] => {
  if (!criteria.length) {
    criteria = [{ order: 'asc' }]
  }

  return [...arr].sort((a, b) => {
    for (const { order = 'asc', by = (item: T) => item } of criteria) {
      const aValue = by(a)
      const bValue = by(b)

      if (isString(aValue) && isString(bValue)) {
        const comparison = aValue.localeCompare(bValue)
        return order === 'asc' ? comparison : -comparison
      }

      if (aValue !== bValue) {
        const compare = aValue < bValue ? -1 : 1
        return order === 'asc' ? compare : -compare
      }
    }
    return 0
  })
}
