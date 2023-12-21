import type { Arrayable, Nullable } from '..'
import { isArray } from '..'

export const toArray = <T>(val: Nullable<Arrayable<T>>): T[] => {
  val ??= []
  return isArray(val) ? val : [val]
}
