import type { ArrayMinLength, CompareFn } from '..'
import { isFunction, uniq } from '..'

/**
 * Create an intersection of all given arrays.
 *
 * The order is based on the first array.
 *
 * Optionally, use a compare function for element comparison (default is `===`).
 *
 * @example
 * intersection([2, 1], [2, 3], [6, 2])
 * // => [2]
 *
 * // ---- Custom compare function ----
 * const cmp = (a, b) => Math.floor(a) === Math.floor(b);
 * intersection([2.1, 1.2], [2.3, 3.4], cmp)
 * // => [1.2, 1.1]
 *
 * // ---- Only compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 *
 * intersection(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 3, name: 'John' }]
 * 
 * @see https://utilipea.vercel.app/array/intersection.html
 */
export const intersection = <
  TElem, 
  TArrays extends ArrayMinLength<TElem[], 2>
>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFn<TArrays>]): TArrays[0] => {
  const hasCompareFn = isFunction(args.at(-1))
  const compareFn = hasCompareFn && args.pop() as CompareFn<TArrays>

  const [firstArray, ...restArrays] = args as TArrays

  if (!compareFn) {
    return uniq(firstArray).filter((item) => restArrays.every((arr) => arr.includes(item)))
  }

  const uniqFirstArr = uniq(firstArray, compareFn)
  return uniqFirstArr.filter((itemA) => {
    return restArrays.every((arr) => arr.some((itemB) => compareFn(itemA, itemB)))
  })
}
