export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Cancels the debounced function
   */
  cancel(): void
  /**
   * Checks if there is any invocation debounced
   */
  pending(): boolean
  /**
   * Runs the debounced function immediately, and cancels the debounced invocation
   */
  flush(...args: TArgs): void
}

/**
 * Given a delay and a function returns a new function
 * that will only call the source function after delay
 * milliseconds have passed without any invocations.
 *
 * The debounce function comes with a `cancel` method
 * to cancel delayed `func` invocations and a `flush`
 * method to invoke them immediately
 */
export const debounce = <TArgs extends any[], TRes>(
  func: (...args: TArgs) => TRes,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: TArgs
  let result: TRes | undefined

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    lastArgs = args

    clearTimeout(timer)
    timer = setTimeout(() => {
      result = func(...lastArgs)
      timer = undefined
    }, delay)
  }

  const cancel = () => {
    clearTimeout(timer)
    timer = undefined
  }

  debounced.pending = () => {
    return timer !== undefined
  }

  debounced.cancel = cancel

  debounced.flush = () => {
    cancel()
    result = func(...lastArgs)
    return result
  }

  return debounced
}
