import type { RequireAtLeastOne } from '..'
import { isString } from '..'

type SortBy<T> = (item: T) => number | bigint | Date | string
type SortOrder = 'asc' | 'desc'

export type SortCriteria<T> = RequireAtLeastOne<{
  order?: SortOrder
  by?: SortBy<T>
}>

// eslint-disable-next-line no-extend-native, ts/unbound-method
Array.prototype.toSorted ??= function (cmp) {
  // eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-assignment
  return [...this].sort(cmp)
}

/**
 * Sort an array based on the specified criteria.
 * Does not mutate the original array.
 *
 * If comparator function is specified, `by` is ignored.
 *
 * @category Array
 *
 * @example
 * sort([3, 1, 2])
 * // => [1, 2, 3]
 *
 * sort([3, 1, 2], { order: 'desc' })
 * // => [3, 2, 1]
 *
 * // Sort by property
 * sort(
 *  ['apple', 'fig', 'banana', 'pineapple', 'pear']
 *  { by: (item) => item.length }
 * )
 * // => ['fig', 'pear', 'apple', 'banana', 'pineapple']
 *
 * // Multiple criteria
 * sort(
 *  [
 *    { name: 'tom', age: 20 },
 *    { name: 'leo', age: 30 },
 *    { name: 'bob', age: 10 },
 *    { name: 'jan', age: 20 },
 *  ],
 *  { order: 'desc', by: (item) => item.age },
 *  { by: (item) => item.name }
 * )
 *
 * // [
 * //  { name: 'leo', age: 30 },
 * //  { name: 'jan', age: 20 },
 * //  { name: 'tom', age: 20 },
 * //  { name: 'bob', age: 10 },
 * // ]
 *
 * @see [utilipea.vercel.app/array/sort.html](https://utilipea.vercel.app/array/sort.html)
 * 
 */
export const sort = <T>(
  arr: readonly T[],
  ...criteria: SortCriteria<T>[]
): T[] => {
  if (!criteria.length) {
    criteria = [{ order: 'asc' }]
  }

  return arr.toSorted((a, b) => {
    for (const { order = 'asc', by = (item: T) => item } of criteria) {
      const isAsc = order === 'asc'
      const handleOrder = (comparison: number) => (isAsc ? comparison : -comparison)

      const aValue = by(a)
      const bValue = by(b)

      if (isString(aValue) && isString(bValue)) {
        return handleOrder(aValue.localeCompare(bValue))
      }

      if (aValue !== bValue) {
        return handleOrder(aValue < bValue ? -1 : 1)
      }
    }
    return 0
  })
}
