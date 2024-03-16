import { type PlainObject, diff } from '..'
import { pick } from './pick'

/**
 * Remove specified keys from an obj.
 *
 * Does not mutate the original obj.
 * Objects are shallowly cloned.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, 'a', 'c');
 * // => { b: 2 }
 */
export const omit = <T extends PlainObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  if (!keys?.length) { return obj }

  const allKeys = Object.keys(obj)
  const filteredKeys = diff(allKeys, keys as string[]) as Exclude<keyof T, K>[]
  return pick(obj, ...filteredKeys)
}
