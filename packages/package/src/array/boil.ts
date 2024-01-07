/**
 * Reduce a list of items down to one item
 * 
 * Given an array of items return the final item that "wins" the comparison condition.
 *
 * @category Array
 * 
 * @example
 * const books = [
 *  { title: 'Frankenstein', pages: 199 },
 *  { title: 'Ulysses', pages: 732 },
 *  { title: 'Dune', pages: 412 }
 * ]
 * 
 * const longest = boil(books, (a, b) => a.pages > b.pages ? a : b)
 * // => { title: 'Ulysses', pages: 732 }
 * 
 * @see [utilipea.vercel.app/array/boil.html](https://utilipea.vercel.app/array/boil.html)
 */
export const boil = <T>(
  array: readonly T[],
  cmp: (a: T, b: T) => T
) => {
  if (!array.length) { return undefined }
  return array?.reduce(cmp)
}
