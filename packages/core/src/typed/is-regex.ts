import { StandardObject, toTypeString } from '..'

export const isRegex = (val: unknown): val is RegExp => {
  return toTypeString(val) === StandardObject.RegExp
}
