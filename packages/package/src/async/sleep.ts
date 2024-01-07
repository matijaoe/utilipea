/**
 * Pause execution for a specified amount of time.
 *
 * @category Async
 *
 * @example
 * await sleep(1000) // sleep for 1 second
 * 
 * @see [utilipea.vercel.app/async/sleep.html](https://utilipea.vercel.app/async/sleep.html)
 * 
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
