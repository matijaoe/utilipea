import { isArray } from '..'

export const insert = <T>(arr1: T[], arr2: T | T[], index?: number): T[] => {
  const items = isArray(arr2) ? arr2 : [arr2]

  if (!arr1.length) { return items }
  if (!items.length) { return arr1 }

  if (!index) {
    return items.concat(arr1)
  }

  const normalizedIndex = index < 0 ? arr1.length + index : index

  if (Math.abs(normalizedIndex) > arr1.length) {
    return arr1.concat(items)
  }

  const front = arr1.slice(0, normalizedIndex)
  const back = arr1.slice(normalizedIndex)

  return front.concat(items, back)
}
