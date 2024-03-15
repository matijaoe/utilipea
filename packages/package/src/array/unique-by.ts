import { isFunction } from '..'
import type { By } from '../models'

/**
 * Return an array with unique elements from the input array. 
 * First occurrence of each element is kept.
 * Accepts an optional identity function to convert each item in the list to a comparable identity value
 *
 * @category Array
 *
 * @example
 * uniqueBy([1, 2, 3, 2, 1])
 * // => [1, 2, 3]
 *
 * uniqueBy([1, 2, 3, 2, 1], (n) => n % 2)
 * // => [1, 2]
 *
 * uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], item => item.id)
 * // => [{ id: 1 }, { id: 2 }]
 * 
 * 
 * const people = [
 *   { name: 'joe', age: 87 }, 
 *   { name: 'joe', age: 24 },
 *   { name: 'dan', age: 24 }
 * ]
 * 
 * uniqueBy(people, 'age')
 * // => [{ name: 'joe', age: 87 }, { name: 'joe', age: 24 }]
 * 
 * uniqueBy(people, 'name)
 * // => [{ name: 'joe', age: 87 }, { name: 'dan', age: 24 }]
 */
export const uniqueBy = <TElem, TKey extends keyof TElem>(
  arr: TElem[],
  by?: By<TElem, TKey>,
) => {
  if (!by) {
    return [...new Set(arr)]
  }

  const byFn = isFunction(by)
    ? by
    : (item: TElem) => item[by]

  const seen = new Set<TElem[TKey]>()
  return arr.filter((item) => {
    const key = byFn(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}
