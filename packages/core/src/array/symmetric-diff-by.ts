import type { ArrayMinLength, ByIdentity } from '../models'
import { isArray, isFunction } from '../typed'

/**
 * Create a new array with values that are present in either of the arrays but not in their intersection.
 *
 * XOR operation for arrays.
 * 
 * Optionally, use a compare function to determine the comparison of elements (default is `===`).
 * 
 * @category Array
 *
 * @example
 * symmetricDiff([2, 1], [2, 3])
 * // => [1, 3]
 *
 * // ---- Custom compare function ----
 * const compareByFloor = (a, b) => Math.floor(a) === Math.floor(b);
 * symmetricDiff([1.2, 3.1], [1.3, 2.4], compareByFloor)
 * // => [3.1, 2.4]
 *
 * // ---- Only compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 *
 * symmetricDiff(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 1, name: 'Yeet' }, { id: 4, name: 'Max' }]
 * 
 * @see https://utilipea.vercel.app/array/symmetricDiff.html
 */
export const symmetricDiff = <
  TElem,
  TArrays extends ArrayMinLength<TElem[], 2>, 
>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, ByIdentity<TElem>]): TElem[] => {
  const hasByDefined = !isArray(args.at(-1))
  const by = hasByDefined && args.pop() as ByIdentity<TElem>

  const arrays = args as TArrays

  if (!by) {
    return arrays.reduce((acc, arr) => {
      const accSet = new Set(acc)
      const arrSet = new Set(arr)
      return [...acc.filter((item) => !arrSet.has(item)), ...arr.filter((item) => !accSet.has(item))]
    })
  }

  const byFn = isFunction(by) ? by : (item: TElem) => item[by]
  
  return arrays.reduce((acc: TElem[], arr) => {
    return [...acc.filter((item) => arr.every((arrItem) => byFn(item) !== byFn(arrItem))), ...arr.filter((item) => acc.every((accItem) => byFn(item) !== byFn(accItem)))]
  }, [] as TElem[])
}

export const xorBy = symmetricDiff

// TODO: not correct, should be empty
// console.log(xorBy([{ x: 2 }], [{ x: 2 }, { x: 1 }], [{ x: 2 }, { x: 1 }], 'x'))
