import { StandardObject } from '..'
import { toTypeString } from '.'

export const isSet = (val: unknown): val is Set<any> => {
  return toTypeString(val) === StandardObject.Set
}
