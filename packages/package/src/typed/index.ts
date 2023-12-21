export * from './array-includes'
export * from './has-own'
export * from './is-array'
export * from './is-boolean'
export * from './is-browser'
export * from './is-date'
export * from './is-def'
export * from './is-error'
export * from './is-finite'
export * from './is-float'
export * from './is-function'
export * from './is-infinite'
export * from './is-int'
export * from './is-map'
export * from './is-nil'
export * from './is-null'
export * from './is-number'
export * from './is-object'
export * from './is-object-type'
export * from './is-plain-object'
export * from './is-primitive'
export * from './is-promise'
export * from './is-regex'
export * from './is-safe-integer'
export * from './is-set'
export * from './is-string'
export * from './is-symbol'
export * from './is-truthy'
export * from './is-typed-array'
export * from './is-undefined'
export * from './is-url'
export * from './is-window'
export * from './noop'
export * from './not-undefined'
export * from './typeof'

export const toTypeString = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

/**
 * extract "RawType" from strings like "[object RawType]"
 */
export const toRawType = (val: unknown): string => {
  return toTypeString(val).slice(8, -1)
}
