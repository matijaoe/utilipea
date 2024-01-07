import { clamp } from '..'

/**
 * Clamp a number to the index range of an array
 *
 * @category Array
 * 
 * @see [utilipea.vercel.app/array/clamp-array-range.html](https://utilipea.vercel.app/array/clamp-array-range.html)
 */
export const clampArrayRange = (n: number, arr: readonly unknown[]) => {
  return clamp(n, [0, arr.length - 1])
}
