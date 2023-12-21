/**
 * Invokes a function `n` times, returning an array of the results of
 * each invocation.
 *
 * @example
 * times(index => console.log("Run", index), 3)
 * // => "Run 0" | "Run 1" | "Run 2"
 *
 * times(Math.random, 3)
 * // => [0.123, 0.456, 0.789]
 *
 * times(() => 0, 4)
 * // => [0, 0, 0, 0]
 *
 * @param func The function invoked per iteration.
 * @param n The number of times to invoke `func`.
 * @returns Returns an array of results.
 */
export const times = <T>(func: (index: number) => T, n: number): T[] => {
  return Array.from({ length: n }, (_, i) => func(i))
}
