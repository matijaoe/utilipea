import { StandardObject } from '..'
import { toTypeString } from '.'

export const isWindow = (val: unknown): boolean => {
  // @ts-ignore
  return typeof window !== 'undefined' && toTypeString(val) === StandardObject.Window
}
