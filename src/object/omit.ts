import type { PlainObject } from '..'

/**
 * Remove specified keys from an object.
 *
 * Returns a new object.
 * The original object is shallowly cloned and remains unchanged.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(obj, 'a', 'c');
 * console.log(result); // { b: 2 }
 */
export const omit = <
  T extends PlainObject,
  K extends keyof T
>(obj: T, ...keys: K[]) => {
  if (!obj) {
    return {} as Omit<T, K>
  }

  if (!keys?.length) {
    return obj
  }

  const newObj = { ...obj }
  keys.forEach((key) => delete newObj[key])

  return newObj
}
