import { StandardObject } from '..'
import { toTypeString } from '.'

export const isDate = (val: unknown): val is Date => {
  return toTypeString(val) === StandardObject.Date
}
