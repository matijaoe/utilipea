import type { ArrayMaxLength } from '../models'

/**
 * Split an array into chunks of a specified size.
 *
 * @category Array
 *
 * @example
 * chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
 * // => [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * 
 * @see https://utilipea.vercel.app/array/chunk.html
 */

export const chunk = <TElem, TChunkSize extends number>(list: readonly TElem[], size: TChunkSize) => {
  if (!list || size < 1) { return [] as ArrayMaxLength<TElem, TChunkSize>[] }

  const chunkCount = Math.ceil(list.length / Math.trunc(size))
  return Array.from(
    { length: chunkCount },
    (_v, i) => list.slice(i * size, i * size + size) as ArrayMaxLength<TElem, TChunkSize>
  )
}
