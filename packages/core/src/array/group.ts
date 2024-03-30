import { isFunction } from '../typed'

export type ByPropertyKey<T, K extends keyof T & PropertyKey> = K | ((item: T) => T[K] & PropertyKey)

/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 *
 * @example
 * const fish = [
 *  { name: 'Marlin', source: 'ocean' },
 *  { name: 'Bass', source: 'lake' },
 *  { name: 'Trout', source: 'lake' }
 * ]
 * group(fish, (f) => f.source)
 * group(fish, 'source')
 * // => { ocean: [{ name: 'Marlin', source: 'ocean' }], lake: [{ name: 'Bass', source: 'lake' }, { name: 'Trout', source: 'lake' }] }
 * 
 * @see https://utilipea.vercel.app/array/group.html
 */
export const group = <TElem, TKey extends keyof TElem & PropertyKey>(
  list: readonly TElem[],
  by: ByPropertyKey<TElem, TKey>
): Partial<Record<TKey, TElem[]>> => {
  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  return list.reduce((acc, item) => {
    const groupId = byFn(item)?.toString()
    if (groupId === undefined) { return acc }
    acc[groupId] ??= []
    acc[groupId].push(item)
    return acc
  }, {} as Record<PropertyKey, TElem[]>)
}
