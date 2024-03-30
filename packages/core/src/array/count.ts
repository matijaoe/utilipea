import { isFunction } from '../typed'

export type ByPropertyKey<T, K extends keyof T & PropertyKey> = K | ((item: T) => T[K] & PropertyKey)

/**
 * Count the number of items in an array when grouped by a given key or condition.
 * 
 * @category Array
 *
 * @example
 * const fish = [
 *  { name: 'Marlin', source: 'ocean' },
 *  { name: 'Bass', source: 'lake' },
 *  { name: 'Trout', source: 'lake' }
 * ]
 * group(count, (f) => f.source)
 * group(count, 'source')
 * // => { ocean: 1, lake: 2 }
 * 
 * @see https://utilipea.vercel.app/array/group.html
 */
export const count = <TElem, TKey extends keyof TElem & PropertyKey>(
  list: readonly TElem[],
  by: ByPropertyKey<TElem, TKey>
) => {
  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  return list?.reduce((acc, item) => {
    const id = byFn(item)?.toString()
    if (id === undefined) { return acc }
    acc[id] ??= 0
    acc[id] += 1
    return acc
  }, {} as Record<PropertyKey, number>)
}
