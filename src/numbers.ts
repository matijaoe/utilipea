import { isString } from '.'

/**
 * "123-foo" will be parsed to 123
 * "foo" will be returned as-is, unless a default value is provided
 */
export const looseToNumber = <T = any>(
  val: any,
  defaultValue: T = val
): number | T => {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? defaultValue : n
}

/**
 * Only concerns number-like strings
 * "123-foo" will be returned as-is, unless a default value is provided
 */
export const toNumber = <T = any>(
  val: any,
  defaultValue: T = val
): number | T => {
  const n = isString(val) ? Number(val) : Number.NaN
  return Number.isNaN(n) ? defaultValue : n
}
