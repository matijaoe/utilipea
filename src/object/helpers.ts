import type { NestedOmit } from '..'
import { isEmpty, isObject } from '..'

export const hasNestedKeys = (keys: NestedOmit<any>) => {
  for (const key in keys) {
    const val = keys[key]
    if (isObject(val) && !isEmpty(val)) {
      return true
    }
  }
  return false
}
