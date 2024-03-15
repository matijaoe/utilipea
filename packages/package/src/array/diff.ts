import { type ArrayMinLength, type CompareFn, flatten, isFunction, unique } from '..'

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
 * @see [utilipea.vercel.app/array/diff.html](https://utilipea.vercel.app/array/diff.html)
 * 
 */
export function diff<TElem>(...args: ArrayMinLength<TElem[], 2>): TElem[]
export function diff<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFn<TArrays>]): TArrays[0]
export function diff<TArrays extends ArrayMinLength<unknown[], 2>, TElem>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFn<TArrays>]): TArrays[0] {
  const hasCmp = isFunction(args.at(-1))
  const cmp = hasCmp && args.pop() as CompareFn<TArrays>

  const arrays = args as TArrays
  const firstArray = unique(arrays.shift()!)!
  const restArrays = flatten(arrays)

  if (!cmp) {
    const restSet = new Set(restArrays)
    return firstArray.filter((element) => !restSet.has(element))
  }

  return firstArray.reduce((acc: TArrays[0], element) => {
    if (restArrays.every((item) => !cmp(element, item))) {
      acc.push(element)
    }
    return acc
  }, [] as TArrays[0])
}
