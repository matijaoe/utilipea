import { clamp } from '..'

/**
 * Clamp a number to the index range of an array
 *
 * @category Array
 */
export const clampArrayRange = (n: number, arr: readonly unknown[]) => {
  return clamp(n, [0, arr.length - 1])
}
