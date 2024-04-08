import { isFunction } from '..'
import type { ByIdentity } from '../models'

/**
 * Return an array with uniq( elements from the input array. 
 * First occurrence of each element is kept.
 * Accepts an optional identity function to convert each item in the list to a comparable identity value
 *
 * @category Array
 *
 * @example
 * uniq([1, 2, 3, 2, 1])
 * // => [1, 2, 3]
 *
 * uniq([1, 2, 3, 2, 1], (n) => n % 2)
 * // => [1, 2]
 *
 * uniq([{ id: 1 }, { id: 2 }, { id: 1 }], item => item.id)
 * // => [{ id: 1 }, { id: 2 }]
 * 
 * 
 * const people = [
 *   { name: 'joe', age: 87 }, 
 *   { name: 'joe', age: 24 },
 *   { name: 'dan', age: 24 }
 * ]
 * 
 * uniq(people, 'age')
 * // => [{ name: 'joe', age: 87 }, { name: 'joe', age: 24 }]
 * 
 * uniq(people, 'name)
 * // => [{ name: 'joe', age: 87 }, { name: 'dan', age: 24 }]
 */
export const uniqBy = <TElem>(
  arr: TElem[],
  by?: ByIdentity<TElem>,
) => {
  if (!by) {
    return [...new Set(arr)]
  }

  const byFn = isFunction(by) ? by : (item: TElem) => item[by] as PropertyKey

  const seen = new Set<PropertyKey>()
  return arr.filter((item) => {
    const key = byFn(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}
