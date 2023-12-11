/**
 * Split an array into chunks of a specified size.
 *
 * @category Array
 *
 * @example
 * chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
 * // => [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 */
export const chunk = <T>(list: readonly T[], size: number = 2): Array<T[]> => {
  if (!list || size < 1) { return [] }

  const chunkCount = Math.ceil(list.length / Math.trunc(size))
  return Array.from(
    { length: chunkCount },
    (_v, i) => list.slice(i * size, i * size + size)
  )
}
