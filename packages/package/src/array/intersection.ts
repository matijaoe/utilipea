import { type ArrayMinLength, flatten, isFunction, unique } from '..'

// TODO: focus on types later on, organize and reuse them
export type CompareFunction<TArrays extends ArrayMinLength<unknown[], 2>> = (a: TArrays[0][number], b: ArrayTail<TArrays>[number][number]) => boolean
export type ArrayTail<TArray extends unknown[]> = TArray extends [unknown, ...infer U] ? U : never

/**
 * Create an intersection of all given arrays.
 *
 * The order of the values is based on the first array.
 *
 * Optionally, use a compare function for element comparison (default is `===`).
 *
 * @example
 * intersection([2, 1], [2, 3], [6, 2])
 * // => [2]
 *
 * // ---- Custom compare function ----
 * const cmp = (a, b) => Math.floor(a) === Math.floor(b);
 *
 * intersection([1.2, 1.1], [1.3, 2.4], cmp)
 * // => [1.2]
 *
 * // ---- Only compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 *
 * intersection(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 3, name: 'John' }]
 *
 */
export function intersection<TElem>(...arraysOrCompareFn: ArrayMinLength<TElem[], 2>): TElem[]
export function intersection<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFunction<TArrays>]): TArrays[0]
export function intersection<TArrays extends ArrayMinLength<unknown[], 2>, TElem>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFunction<TArrays>]): TArrays[0] {
  const hasCmp = isFunction(args.at(-1))
  const cmp = hasCmp && args.pop() as CompareFunction<TArrays>

  const arrays = args as TArrays
  const firstArray = unique(arrays.shift()!)!
  const restArrays = flatten(arrays)

  if (!cmp) {
    const restSet = new Set(restArrays)
    return firstArray.filter((element) => restSet.has(element))
  }

  return firstArray.filter((element) => {
    return restArrays.some((restElement) => cmp(element, restElement))
  })
}
