import { randomInt } from '..'

/**
 * Get random item(s) from an array
 *
 * @see https://utilipea.vercel.app/array/sample.html
 * 
 */
export const sample = <T>(arr: T[], quantity = 1) => {
  return Array.from({ length: quantity }, (_) => arr.at(randomInt(0, arr.length - 1)))
}
