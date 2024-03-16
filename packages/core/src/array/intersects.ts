/**
 * Given two arrays, returns true if any elements intersect
 *
 * @example
 * const arr1 = [1, 2, 3]
 * const arr2 = [3, 4, 5]
 * const arr3 = [4, 5, 6]
 * intersects(arr1, arr2) // => true
 * intersects(arr1, arr3) // => false
 *
 * const arr1 = [{ id: 1, name: 'Pat'}]
 * const arr2 = [{ id: 2, name: 'Mat'}, { id: 3, name: 'Pat'}]}]
 * intersects(arr1, arr2, (x) => x.name) // => true
 * 
 * @see [utilipea.vercel.app/array/intersects.html](https://utilipea.vercel.app/array/intersects.html)
 * 
 */
export const intersects = <TElem, TKey extends keyof TElem>(
  listA: readonly TElem[],
  listB: readonly TElem[],
  // TODO: implement By
  identity = (x: TElem) => x as unknown as TKey
): boolean => {
  if (!listA || !listB) { return false }

  const dictB = new Set<TKey>(listB.map(identity))
  return listA.some((value) => dictB.has(identity(value)))
}
