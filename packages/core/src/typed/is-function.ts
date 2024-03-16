import type { DefinitelyFunction } from '..'

export const isFunction = <T> (val: T | Function): val is DefinitelyFunction<T> => {
  return typeof val === 'function'
}
