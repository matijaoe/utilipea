import { toArray } from '..'

export const remove = <T>(arr: T[], item: T | T[]): T[] => {
  const items = toArray(item)
  return arr.filter((i) => !items.includes(i))
}
