import { isString } from '..'

// TODO
// add compare fn
// do not accept empty sort criteria object
// add dirty: options to mutate the original array
type SortCriteria<T> = {
  order?: 'asc' | 'desc'
  by?: (item: T) => number | bigint | Date | string
}

/**
 * Sort an array based on the specified criteria.
 * Does not mutate the original array.
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
 * sort(
 *  [{ id: 1 }, { id: 2 }, { id: 3 }],
 *  { by: (item) => item.id }
 * )
 * // => [{ id: 1 }, { id: 2 }, { id: 3 }]
 *
 * sort(
 *  ['apple', 'fig', 'banana', 'pineapple', 'pear']
 *  { by: (item) => item.length }
 * )
 * // => ['fig', 'pear', 'apple', 'banana', 'pineapple']
 *
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
 */
export const sort = <T>(
  arr: readonly T[],
  ...criteria: SortCriteria<T>[]
): T[] => {
  if (!criteria.length) {
    criteria = [{ order: 'asc' }]
  }

  return [...arr].sort((a, b) => {
    for (const { order = 'asc', by = (item: T) => item } of criteria) {
      const aValue = by(a)
      const bValue = by(b)

      if (isString(aValue) && isString(bValue)) {
        const comparison = aValue.localeCompare(bValue)
        return order === 'asc' ? comparison : -comparison
      }

      if (aValue !== bValue) {
        const compare = aValue < bValue ? -1 : 1
        return order === 'asc' ? compare : -compare
      }
    }
    return 0
  })
}
