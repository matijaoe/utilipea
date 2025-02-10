import { type ArrayMinLength, flatten, isFunction, unique } from '..'

export type CompareFunction<TArrays extends ArrayMinLength<unknown[], 2>> = (a: TArrays[0][number], b: ArrayTail<TArrays>[number][number]) => boolean
export type ArrayTail<TArray extends unknown[]> = TArray extends [unknown, ...infer U] ? U : never

/**
 * Create an intersection of arrays using a custom comparison function.
 *
 * @example
 * // ---- Compare by id ----
 * const arr1 = [{ id: 1, name: 'Yeet' }, { id: 3, name: 'John' }];
 * const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Max' }];
 * 
 * intersectionWith(arr1, arr2, (a, b) => a.id === b.id)
 * // => [{ id: 3, name: 'John' }]
 *
 * // ---- Custom number comparison ----
 * const cmp = (a, b) => Math.floor(a) === Math.floor(b);
 * intersectionWith([2.1, 1.2], [2.3, 3.4], cmp)
 * // => [2.1]
 */
export function intersectionWith<TElem>(...arraysOrCompareFn: ArrayMinLength<TElem[], 2>): TElem[]
export function intersectionWith<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFunction<TArrays>]): TArrays[0]
export function intersectionWith<TArrays extends ArrayMinLength<unknown[], 2>, TElem>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFunction<TArrays>]): TArrays[0] {
  const hasCmp = isFunction(args.at(-1))
  const cmp = hasCmp && args.pop() as CompareFunction<TArrays>

  const arrays = args as TArrays
  const firstArray = unique(arrays.shift()!)!
  const restArrays = flatten(arrays)

  if (!cmp) {
    throw new Error('intersectionWith requires a comparison function')
  }

  return firstArray.filter((element) => {
    return restArrays.some((restElement) => cmp(element, restElement))
  })
}
