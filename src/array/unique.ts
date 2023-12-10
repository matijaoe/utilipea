type ByOptions<T, K extends string | number | symbol> = {
  by: (item: T) => K
  cmp?: never
}

type CmpOptions<T> = {
  by?: never
  cmp: (a: T, b: T) => boolean
}

type UniqueOptions<T, K extends string | number | symbol> = ByOptions<T, K> | CmpOptions<T>

/**
 * Return an array with unique elements from the input array.
 *
 * If options are provided, uniqueness can be determined by a key function or a custom comparison function.
 *
 * @category Array
 *
 * @example
 * unique([1, 2, 3, 2, 1])
 * // => [1, 2, 3]
 *
 * unique([1, 2, 3, 2, 1], { by: (n) => n % 2 })
 * // => [1, 2]
 *
 * unique(
 *   [{ id: 1 }, { id: 2 }, { id: 1 }],
 *   { by: (item) => item.id }
 * )
 * // => [{ id: 1 }, { id: 2 }]
 *
 * unique(
 *   ['apple', 'APPLE', 'banana'],
 *   { cmp: (a, b) => a.toLowerCase() === b.toLowerCase() }
 * )
 * // => ['apple', 'banana']
 */
export const unique = <T, K extends string | number | symbol>(
  arr: Array<T>,
  options?: UniqueOptions<T, K>
) => {
  const { by, cmp } = options || {}

  if (!by && !cmp) {
    return [...new Set(arr)]
  }

  if (by) {
    const seen = new Set<K>()
    return arr.filter((item) => {
      const key = by(item)
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  if (cmp) {
    const uniqueArray: T[] = []
    arr.forEach((value) => {
      if (!uniqueArray.some((uniqueValue) => cmp(value, uniqueValue))) {
        uniqueArray.push(value)
      }
    })
    return uniqueArray
  }
}
