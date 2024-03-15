import { isFunction } from '../typed'

type PropFunction<T, K extends keyof T> = (item: T) => T[K]
type By<T, K extends keyof T> = K | PropFunction<T, K>

type ByOptions<T, K extends keyof T> = {
  by: By<T, K>
  cmp?: never
}

type CmpOptions<T> = {
  by?: never
  cmp: (a: T, b: T) => boolean
}

type UniqueOptions<T, K extends keyof T> = ByOptions<T, K> | CmpOptions<T>

export const unique = <TElem, TKey extends keyof TElem>(
  arr: Array<TElem>,
  by?: By<TElem, TKey>
) => {
  if (!by) {
    return [...new Set(arr)]
  }

  const byFn = isFunction(by)
    ? by
    : (item: TElem) => item[by]
    
  const seen = new Set<TElem[TKey]>()
  return arr.filter((item) => {
    const key = byFn(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

export const uniqueWith = <TElem>(
  arr: Array<TElem>,
  compareFn?: (a: TElem, b: TElem) => boolean
) => {
  if (!compareFn) {
    return [...new Set(arr)]
  }
  
  const uniqueArray: TElem[] = []
  arr.forEach((value) => {
    if (!uniqueArray.some((uniqueValue) => compareFn(value, uniqueValue))) {
      uniqueArray.push(value)
    }
  })
  return uniqueArray
}

console.log(unique([{ name: 'matija', age: 24 }, { name: 'lovro', age: 22 }]))

/**
 * Return an array with unique elements from the input array.
 *
 * If options are provided, uniqueness can be determined by a key function or a custom comparison function.
 *
 * @category Array
 *
 * @example
 * unique([1, 2, 3, 2, 1])
 * // => [1, 2, 3]
 *
 * unique([1, 2, 3, 2, 1], { by: (n) => n % 2 })
 * // => [1, 2]
 *
 * unique(
 *   [{ id: 1 }, { id: 2 }, { id: 1 }],
 *   { by: (item) => item.id }
 * )
 * // => [{ id: 1 }, { id: 2 }]
 *
 * unique(
 *   ['apple', 'APPLE', 'banana'],
 *   { cmp: (a, b) => a.toLowerCase() === b.toLowerCase() }
 * )
 * // => ['apple', 'banana']
 */

// TODO: probably remove
export const unique_advanced = <TElem, TKey extends keyof TElem>(
  arr: Array<TElem>,
  options?: UniqueOptions<TElem, TKey>
) => {
  const { by: byArg, cmp } = options || {}

  if (byArg) {
    return unique(arr, byArg)
  }

  // TODO: not working as expected
  if (cmp) {
    return uniqueWith(arr, cmp)
  }

  return unique(arr)
}
