/**
 * Flatten a 2-dimensional array into a 1-dimensional array.
 *
 * @category Array
 *
 * @example
 * flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * 
 * @see [utilipea.vercel.app/array/flatten.html](https://utilipea.vercel.app/array/flatten.html)
 * 
 */
export const flatten = <T>(lists: readonly T[][]): T[] => {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
}
