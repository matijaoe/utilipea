import { isBoolean, isNumber, isString } from '..'
import type { EnumType } from './enum'

export const TrueSet = {
  basic: ['true'],
  numeric: ['1'],
  full: ['true', 't', 'yes', 'y', 'on', '1'],
} as const

export const FalseSet = {
  basic: ['false'],
  numeric: ['0'],
  full: ['false', 'f', 'no', 'n', 'off', '0'],
} as const 

export type TrueValues = EnumType<typeof TrueSet>
export type FalseValues = EnumType<typeof FalseSet>

export type ToBooleanOptions<TDefaultValue = boolean> = {
  strict?: boolean
  defaultValue?: TDefaultValue
  trueValues?: ReadonlyArray<TrueValues | string>
  falseValues?: ReadonlyArray<FalseValues | string>
}

// TODO: simpler parseBoolean implementaiton used for queryParams
// think of better names
// toBooleanExact ?
export const parseBooleanQuery = (val: string) => !['false', '0', ''].includes(val)

export const toBoolean = <TDefaultValue>(val: any, options?: ToBooleanOptions<TDefaultValue>): TDefaultValue | boolean => {
  options ??= {}
  const {
    strict = false,
  } = options
  let {
    // will only be used when value is string
    trueValues = TrueSet.basic,
    falseValues = FalseSet.basic,
  } = options

  // TODO: could me improved
  const defaultValue = 'defaultValue' in options 
    ? options.defaultValue as TDefaultValue
    : false

  trueValues = trueValues.map((v) => String(v).trim().toLowerCase())
  falseValues = trueValues.map((v) => String(v).trim().toLowerCase())

  if (isBoolean(val)) { 
    return val 
  }

  if (isNumber(val)) {
    if (strict && val !== 1 && val !== 0) {
      throw new Error(`Cannot convert number ${val} to boolean`)
    }
    return val === 1
  }

  if (isString(val)) {
    const normalizedVal = val.trim().toLowerCase()
    if (trueValues.includes(normalizedVal)) { return true }
    if (falseValues.includes(normalizedVal)) { return false }
    if (strict) {
      throw new Error(`Cannot convert string "${normalizedVal}" to boolean`)
    }
  }

  return defaultValue
}
