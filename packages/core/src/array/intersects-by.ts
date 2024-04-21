import type { ByIdentity } from '../models'
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
export const intersectsBy = <T>(
  listA: readonly T[],
  listB: readonly T[],
  by?: ByIdentity<T>
): boolean => {
  if (!listA || !listB) { return false }

  if (!by) {
    const dictB = new Set<T>(listB)
    return listA.some((value) => dictB.has(value))
  }

  const byFn = isFunction(by) ? by : (item: T) => item[by] as PropertyKey

  const dictB = new Set<PropertyKey>(listB.map((item) => byFn(item)))
  return listA.some((value) => dictB.has(byFn(value)))
}
