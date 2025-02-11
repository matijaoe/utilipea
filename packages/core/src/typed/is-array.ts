import type { DefinitelyArray } from '..'

// figure out correct type guard
export const isArray = <T>(val: T | ReadonlyArray<unknown>): val is DefinitelyArray<T> => {
  return Array.isArray(val)
}
