/**
 * Return an array with unique elements from the input array.
 * First occurrence of each element is kept.
 * Accepts an optional comparison function to determine uniqueness.
 *
 * @category Array
 *
 * @example
 * unique([1, 2, 3, 2, 1])
 * // => [1, 2, 3]
 *
 * unique(
 *   ['apple', 'APPLE', 'banana'],
 *   (a, b) => a.toLowerCase() === b.toLowerCase()
 * )
 * // => ['apple', 'banana']
 * 
 * const coords = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }];
 * unique(coords, isEqual)
 * // => [{ x: 1, y: 2 }, { x: 2, y: 1 }]
 */

export const unique = <TElem>(
  arr: TElem[],
  compareFn?: (a: TElem, b: TElem) => boolean
) => {
  if (!compareFn) {
    return [...new Set(arr)]
  }
  
  const uniqueArray: TElem[] = []
  arr.forEach((value) => {
    if (!uniqueArray.some((uniqueValue) => compareFn(value, uniqueValue))) {
      uniqueArray.push(value)
    }
  })
  return uniqueArray
}
