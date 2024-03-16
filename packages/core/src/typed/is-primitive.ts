import type { Primitive } from '..'

export const isPrimitive = (value: unknown): value is Primitive => {
  return Object(value) !== value
}
