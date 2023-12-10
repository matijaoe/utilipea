import type { PlainObject } from '..'

/**
 * Remove specified keys from an object.
 *
 * Does not mutate the original object.
 * Objects are shallowly cloned.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, 'a', 'c');
 * // => { b: 2 }
 */
export const omit = <
  T extends PlainObject,
  K extends keyof T
>(obj: T, ...keys: K[]) => {
  if (!obj) { return {} as Omit<T, K> }
  if (!keys?.length) { return obj }

  const newObj = { ...obj }
  keys.forEach((key) => delete newObj[key])

  return newObj
}