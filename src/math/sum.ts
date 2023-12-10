/**
 * Calculate the sum of an array of numbers or objects.
 *
 * @category Math
 *
 * @example
 * sum([1, 2, 3, 4, 5])
 * // => 15
 *
 * sum([{ val: 1 }, { val: 2 }, { val: 3 }], (item) => item.val)
 * // => 6
 *
 * with fn
 * sum([1, 2, 3], (x) => x * x)
 * // => 14
 *
 * sum([])
 * // => 0
 */
export const sum = <T extends number | object>(
  array: readonly T[],
  fn?: (item: T) => number
) => {
  return array?.reduce(
    (acc, item) => acc + (fn?.(item) ?? (item as number)),
    0
  ) ?? 0
}
