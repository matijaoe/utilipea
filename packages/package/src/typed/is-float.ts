import type { Float } from 'type-fest'
import { isNumber } from '.'

export const isFloat = <T extends number>(val: T): val is Float<T> => {
  return isNumber(val) && !Number.isInteger(val)
}
