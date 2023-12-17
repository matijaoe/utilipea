import { clamp, ensureArray } from '..'

export const insert = <T>(arr1: T[], arr2: T | T[], index?: number): T[] => {
  const items = ensureArray(arr2)

  if (!arr1.length) { return items }
  if (!items.length) { return arr1 }

  if (!index) {
    return items.concat(arr1)
  }

  const normalizedIndex = clamp(index, [-arr1.length, arr1.length])

  const front = arr1.slice(0, normalizedIndex)
  const back = arr1.slice(normalizedIndex)

  return front.concat(items, back)
}
