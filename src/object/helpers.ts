import type { NestedOmit } from '..'
import { isEmpty, isObject } from '..'

/**
 * Check if an object has nested keys with non-empty values.
 *
 * @example
 * hasNestedKeys({ a: true, b: { c: true, d: true } })
 * // => true
 *
 * hasNestedKeys({ a: true, b: { } })
 * // => false
 */
export const hasNestedKeys = (keys: NestedOmit<any>) => {
for (const key in keys) {
    const val = keys[key]
    if (isObject(val) && !isEmpty(val)) {
      return true
    }
  }
  return false
}
