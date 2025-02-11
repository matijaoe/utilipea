import { StandardObject } from '..'
import { toTypeString } from '.'

export const isMap = (val: any): val is Map<any, any> => {
  return toTypeString(val) === StandardObject.Map
}
