import type { By } from '..'
import { isFunction } from '..'

/**
 * Count the number of items in an array when grouped by a given key or condition. Returns a Map.
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
export const countAsMap = <TElem, TKey extends keyof TElem>(
  list: readonly TElem[],
  by: By<TElem, TKey>
) => {
  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  return list?.reduce((acc, item) => {
    const id = byFn(item)
    acc.set(id, (acc.get(id) || 0) + 1)
    return acc
  }, new Map<TElem[TKey], number>())
}
