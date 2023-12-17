import { isArray } from '..'

/**
 * Convert a generator into an array.
 *
 */
export const toList = <T>(gen: Generator<T>): T[] => {
  const items: T[] = []
  for (const item of gen) {
    items.push(item)
  }
  return items
}

export const ensureArray = <T>(item: T | T[]): T[] => {
  return isArray(item) ? item : [item]
}
