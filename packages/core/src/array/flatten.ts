/**
 * Flatten a 2-dimensional array into a 1-dimensional array. Faster than using `Array.prototype.flat()`.
 *
 * @category Array
 *
 * @example
 * flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * 
 * @see https://utilipea.vercel.app/array/flatten.html
 */
export const flatten = <T>(lists: readonly T[][]): T[] => {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
}
