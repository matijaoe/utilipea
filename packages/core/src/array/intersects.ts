import type { By } from '../models'
import { isFunction } from '../typed'

/**
 * Given two arrays, returns true if any elements intersect
 *
 * @category Array
 * 
 * @example
 * const arr1 = [1, 2, 3]
 * const arr2 = [3, 4, 5]
 * const arr3 = [4, 5, 6]
 * intersects(arr1, arr2) // => true
 * intersects(arr1, arr3) // => false
 *
 * const arr1 = [{ id: 1, name: 'Pat'}]
 * const arr2 = [{ id: 2, name: 'Mat'}, { id: 3, name: 'Pat'}]}]
 * intersects(arr1, arr2, (x) => x.name) // => true
 * intersects(arr1, arr2, 'id') // => false
 * 
 * @see https://utilipea.vercel.app/array/intersects.html
 */
export const intersects = <TElem, TKey extends keyof TElem>(
  listA: readonly TElem[],
  listB: readonly TElem[],
  by?: By<TElem, TKey>
): boolean => {
  if (!listA || !listB) { return false }

  if (!by) {
    const dictB = new Set<TElem>(listB)
    return listA.some((value) => dictB.has(value))
  }

  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  const dictB = new Set<TElem[TKey]>(listB.map((item) => byFn(item)))
  return listA.some((value) => dictB.has(byFn(value)))
}
