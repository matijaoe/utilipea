import { StandardObject } from '..'
import { toTypeString } from '.'

// TODO: this vs isObjectType
export const isObject = (val: unknown): val is object => {
  return toTypeString(val) === StandardObject.Object
}
