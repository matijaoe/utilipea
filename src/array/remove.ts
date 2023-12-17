import { ensureArray } from '..'

export const remove = <T>(arr: T[], item: T | T[]): T[] => {
  const items = ensureArray(item)
  return arr.filter((i) => !items.includes(i))
}
