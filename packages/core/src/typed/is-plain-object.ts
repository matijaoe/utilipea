import type { PlainObject } from '..'
import { StandardObject, toTypeString } from '..'

export const isPlainObject = (val: unknown): val is PlainObject => {
  return !!val && toTypeString(val) === StandardObject.Object && val?.constructor === Object
}
