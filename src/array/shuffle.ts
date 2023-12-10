/**
 * Shuffle an array. Does not mutate the original array.
 *
 * @category Array
 *
 * @example
 * shuffle([1, 2, 3, 4, 5])
 * // => [3, 5, 1, 4, 2]
 * // => [2, 4, 1, 5, 3]
 * // => [5, 3, 2, 1, 4]
 */
export const shuffle = <T>(array: T[]) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return array
}
