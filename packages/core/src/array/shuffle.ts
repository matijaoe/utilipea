import { randomInt } from '../random'

/**
 * Shuffle an array. Does not mutate the original array, unless mutate option is set to true.
 *
 * @category Array
 *
 * @example
 * shuffle([1, 2, 3, 4, 5])
 * // => [2, 4, 1, 5, 3]
 *
 * // uses `crypto.getRandomValues` to generate the random number
 * shuffle([1, 2, 3, 4, 5], { secure: true })
 * // => [4, 2, 5, 3, 1]
 *
 * // mutates the original array
 * const arr = [1, 2, 3, 4, 5]
 * shuffle(arr, { mutate: true })
 * // => [3, 5, 1, 4, 2]
 * console.log(arr)
 * // => [3, 5, 1, 4, 2]
 * 
 * @see https://utilipea.vercel.app/array/shuffle.html
 * 
 */
export const shuffle = <T>(array: T[], opts?: { mutate?: boolean }) => {
  const arr = opts?.mutate ? array : [...array]

  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
