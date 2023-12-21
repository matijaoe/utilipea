import type { DefinitelyFunction } from '..'
import {} from 'type-fest'

export const isFunction = <T> (val: T | Function): val is DefinitelyFunction<T> => {
  return typeof val === 'function'
}
