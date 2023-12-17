import { isBoolean, isNumber, isString } from '../../dist'

const BOOL_TRUE = new Set(['true', 't', 'yes', 'y', 'on', '1'])
const BOOL_FALSE = new Set(['false', 'f', 'no', 'n', 'off', '0'])

type ToBooleanOptions = {
  strict?: boolean
  trueValues?: Set<string>
  falseValues?: Set<string>
}

export const toBoolean = (val: string | number | boolean, options?: ToBooleanOptions) => {
  const {
    trueValues = BOOL_TRUE,
    falseValues = BOOL_FALSE,
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
    if (trueValues.has(val)) { return true }
    if (falseValues.has(val)) { return false }
    if (strict) {
      throw new Error(`Cannot convert "${val}" to boolean`)
    }
  }

  return false
}

toBoolean('1', {
  falseValues: new Set(['false', 'f', 'no', 'n', 'off', '0']),
})
