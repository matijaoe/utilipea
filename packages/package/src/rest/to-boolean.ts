import { isBoolean, isNumber, isString } from '..'
import type { EnumType } from './enum'

export const TrueSet = {
  basic: ['true'],
  full: ['true', 't', 'yes', 'y', 'on', '1'],
  number: [1]
} as const

export const FalseSet = {
  basic: ['false'],
  full: ['false', 'f', 'no', 'n', 'off', '0'],
  number: [0]
} as const

export type TrueValues = EnumType<typeof TrueSet>
export type FalseValues = EnumType<typeof FalseSet>

export type ToBooleanOptions = {
  strict?: boolean
  trueValues?: ReadonlyArray<TrueValues | string>
  falseValues?: ReadonlyArray<FalseValues | string>
}

// TODO: simpler parseBoolean implementaiton used for queryParams
// think of better names
// toBooleanExact ?
export const parseBooleanQuery = (val: string) => !['false', '0', ''].includes(val)

export const toBoolean = (val: any, options?: ToBooleanOptions): val is boolean => {
  const {
    trueValues = TrueSet.basic,
    falseValues = FalseSet.basic,
    strict = false,
  } = options ?? {}

  if (isBoolean(val)) { return val }

  if (isNumber(val)) {
    if (strict && val !== 1 && val !== 0) {
      throw new Error(`Cannot convert ${val} to boolean`)
    }
    return val === 1
  }

  if (isString(val)) {
    val = val.trim().toLowerCase()
    if (trueValues.includes(val as string)) { return true }
    if (falseValues.includes(val as string)) { return false }
    if (strict) {
      throw new Error(`Cannot convert "${val}" to boolean`)
    }
  }

  return false
}
