import type { TypedArray } from '../models'

export const isTypedArray = (value: unknown): value is TypedArray => {
  return ArrayBuffer.isView(value) && !(value instanceof DataView)
}
