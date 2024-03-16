import type { ArrayMinLength, CompareFn } from '..'
import { flatten, isFunction } from '..'

/**
 * Create a new array with values from the first array that are not present in the other arrays.
 *
 * Optionally, use a compare function to determine the comparison of elements (default is `===`).
 * 
 * @category Array
 *
 * @example
 * diff([2, 1], [2, 3], [6])
 * // => [1]
 *
 * // ---- Custom compare function ----
 * const compareByFloor = (a, b) => Math.floor(a) === Math.floor(b);
 * diff([1.2, 3.1], [1.3, 2.4], compareByFloor)
 * // => [3.1]
 *
 * // ---- Only compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 *
 * diff(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 1, name: 'Yeet' }]
 * 
 * @see https://utilipea.vercel.app/array/diff.html
 */
export function diff<
  TElem, 
  TArrays extends ArrayMinLength<TElem[], 2>
>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFn<TArrays>]): TArrays[0] {
  const hasCompareFn = isFunction(args.at(-1))
  const cmp = hasCompareFn && args.pop() as CompareFn<TArrays>

  const [firstArray, ..._restArrays] = args as TArrays
  const restArrays = flatten(_restArrays)

  if (!cmp) {
    const restSet = new Set(restArrays)
    return firstArray.filter((item) => !restSet.has(item))
  }

  return firstArray.reduce((acc: TArrays[0], item) => {
    if (restArrays.every((restItem) => !cmp(item, restItem))) {
      acc.push(item)
    }
    return acc
  }, [] as TArrays[0])
}
