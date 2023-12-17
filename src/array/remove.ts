import { ensureArray } from '..'

export const remove = <T>(arr: T[], item: T | T[]): T[] => {
  const items = ensureArray(item)
  return arr.filter((i) => !items.includes(i))
}

console.log(remove([1, 2, 3, 4, 5, 6], [1, 3, 6]))
