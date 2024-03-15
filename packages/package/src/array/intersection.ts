import { type ArrayMinLength, isArray, isFunction, unique } from '..'

// TODO: focus on types later on, organize and reuse them

// TODO: interesectionBy, intersectionWith? should be in line with interesects
// do i want them separate or as options?

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
 * @see [utilipea.vercel.app/array/intersection.html](https://utilipea.vercel.app/array/intersection.html)
 *
 */
type CompareFunction<TArrays extends ArrayMinLength<unknown[], 2>> = (a: TArrays[0][number], b: ArrayTail<TArrays>[number][number]) => boolean
type PropFunction<T, K extends keyof T> = (item: T) => T[K]
type By<T, K extends keyof T> = K | PropFunction<T, K>
type ArrayTail<TArray extends unknown[]> = TArray extends [unknown, ...infer U] ? U : never

export function intersection<TElem, TArrays extends ArrayMinLength<TElem[], 2>>(...arrays: ArrayMinLength<TElem[], 2>): TArrays[0] {
  const [firstArray, ...restArrays] = arrays
  const uniqueFirstArray = unique(firstArray)
  return uniqueFirstArray.filter((element) => restArrays.every((restArray) => restArray.includes(element))) 
}

export function intersectionBy<TElem>(...arraysOrByFn: ArrayMinLength<TElem[], 2>): TElem[]
export function intersectionBy<TElem, TArrays extends ArrayMinLength<TElem[], 2>, TKey extends keyof TElem>(...args: [...TArrays, By<TElem, TKey>]): TArrays[0]
export function intersectionBy<TElem, TArrays extends ArrayMinLength<TElem[], 2>, TKey extends keyof TElem>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, By<TElem, TKey>]): TArrays[0] {
  const lastArg = args.at(-1)
  const byArg = !isArray(lastArg) && args.pop() as By<TElem, TKey>

  const [firstArray, ...restArrays] = args as TArrays

  if (!byArg) {
    return intersection(firstArray, ...restArrays)
  }

  const byFn = isFunction(byArg)
    ? byArg
    : (item: TElem) => item[byArg]

  const uniqueFirstArray = unique(firstArray, { by: byFn })
  return uniqueFirstArray.filter((element) => {
    const elementKey = byFn(element)
    return restArrays.every((restArray) => restArray.some((restElement) => byFn(restElement) === elementKey))
  })
}

export function intersectionWith<TElem>(...arraysOrCmpFn: ArrayMinLength<TElem[], 2>): TElem[]
export function intersectionWith<TElem, TArrays extends ArrayMinLength<TElem[], 2>>(...args: [...TArrays, CompareFunction<TArrays>]): TArrays[0]
export function intersectionWith<TElem, TArrays extends ArrayMinLength<TElem[], 2>>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFunction<TArrays>]): TArrays[0] {
  const lastArg = args.at(-1)
  const cmpFn = isFunction(lastArg) && args.pop() as CompareFunction<TArrays>

  const [firstArray, ...restArrays] = args as TArrays

  if (!cmpFn) {
    return firstArray.filter((element) => restArrays.every((restArray) => restArray.includes(element)))
  }

  const uniqueFirstArray = unique(firstArray, { cmp: cmpFn })
  return uniqueFirstArray.filter((element) => {
    return restArrays.every((restArray) => restArray.some((restElement) => cmpFn(element, restElement)))
  })
}

// const a = [{ name: 'matija', age: 24 }]
// const b = [{ name: 'marin', age: 24 }]
// const c = [{ name: 'mislav', age: 21 }, { name: 'kepec', age: 24 }]

// const res1 = intersectionWith(a, b, c, (x) => x.age > 20)

// const x = [1, 2, 3, 4, 5]
// const y = [3, 4]
// const z = [4, 5]

// function intersect(a, b) {
//   const setB = new Set(b)
//   return [...new Set(a)].filter((x) => setB.has(x))
// }

// const res2 = intersect(x, y)
// console.log(res2)

// const a = [{ x: 1, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 1 }]
// const b = [{ x: 1, y: 1 }, { x: 1, y: 2 }]
// const c = [{ x: 1, y: 2 }, { x: 1, y: 2 }]

// console.log(intersectionWith(a, b, c))
// console.log(intersectionWith(a, b, c, isEqual))
// console.log(intersection([1, 1, 1], [2, 2, 1], [3, 1]))
