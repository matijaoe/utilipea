import type { ByIdentity } from '..'
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
export const countAsMap = <T>(
  list: readonly T[],
  by: ByIdentity<T>
) => {
  const byFn = isFunction(by) ? by : (item: T) => item[by] as PropertyKey
  return list?.reduce((acc, item) => {
    const id = byFn(item)
    acc.set(id, (acc.get(id) || 0) + 1)
    return acc
  }, new Map<PropertyKey, number>())
}
