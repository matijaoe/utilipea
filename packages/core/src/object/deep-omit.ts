import type { NestedOmit } from '..'
import { isEmpty, isObject } from '..'
import { hasNestedKeys } from '.'

/**
 * Recursively delete keys from an object.
 *
 * Does not mutate the original object.
 *
 * If nested keys are identified, the object is deeply cloned, otherwise it is shallowly cloned.
 *
 * If a key's value is `true`, the key is omitted.
 *
 * @example
 * const obj = { a: 1, b: { c: 2, d: 3 } }
 * deepOmit(obj, { a: true, b: { c: true } })
 * // => { b: { d: 3 } }
 *
 * // preserve type
 * type OmittedType = Omit<typeof obj, 'a' | 'b'> & { b: Omit<typeof obj.b, 'c'> };
 * deepOmit<typeof obj, OmittedType>(obj, { a: true, b: { c: true } });
 */
export const deepOmit = <
T extends Record<PropertyKey, any>,
R extends Record<PropertyKey, any> = T
>(obj: T, 
    keys: NestedOmit<T>
  ): R => {
  if (!obj) {
    return {} as R
  }

  if (isEmpty(keys)) {
    return obj
  }

  const result = hasNestedKeys(keys) ? structuredClone(obj) : { ...obj }

  for (const key in keys) {
    const val = keys[key]
    if (val === true) {
      delete result[key]
    } else if (isObject(val) && result[key]) {
      result[key] = deepOmit(result[key], val)
    }
  }

  return result
}
