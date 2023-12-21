import type { PlainObject } from '..'

/**
 * Create an obj composed of the picked properties.
 *
 * @example
 * const obj = { a: 1, b: '2', c: 3 }
 * pick(obj, 'a', 'c')
 * // => { a: 1, c: 3 }
 */
export const pick = <T extends PlainObject, K extends keyof T> (
  obj: T,
  ...keys: K[]
): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as Pick<T, K>)
}
