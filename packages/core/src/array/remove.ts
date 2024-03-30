import { isFunction, toArray } from '..'

export type ByPropertyKey<T, K extends keyof T & PropertyKey> = K | ((item: T) => T[K] & PropertyKey)

export const remove = <TElem>(arr: TElem[], item: TElem | TElem[]): TElem[] => {
  const items = toArray(item)
  return arr.filter((i) => !items.includes(i))
}

// TODO
export const _removeBy = <TElem, TKey extends keyof TElem & PropertyKey>(
  arr: readonly TElem[], 
  by: ByPropertyKey<TElem, TKey>,
  item: TElem[TKey] | (TElem[TKey])[],
) => {
  const items = toArray(item)

  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  // return arr.filter((i) => !items.some((i2) => byFn(i2) === byFn(i)))
  return arr.filter((i) => {
    const value = byFn(i)
    return !items.includes(value)
  })
}
