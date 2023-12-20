export type ThrottledFunction<TArgs extends any[], TRes> = {
  (...args: TArgs): void
  /**
   * Checks if there is any invocation throttled
   */
  pending(): boolean
  /**
   * Cancels the throttled function invocation
   */
  cancel(): void
  /**
   * Returns the last result of the throttled function
   */
  lastResult(): TRes | undefined
}

export const throttle = <TArgs extends any[], TRes>(
  func: (...args: TArgs) => TRes,
  interval: number,
): ThrottledFunction<TArgs, TRes> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  let ready = true
  let result: TRes | undefined

  const throttled: ThrottledFunction<TArgs, TRes> = (...args: TArgs) => {
    if (ready) {
      result = func(...args)
      ready = false
    }

    if (!timer) {
      timer = setTimeout(() => {
        timer = undefined
        ready = true
      }, interval)
    }

    return result
  }

  throttled.pending = () => {
    return timer !== undefined
  }

  throttled.lastResult = () => {
    return result
  }

  throttled.cancel = () => {
    if (!timer) { return }

    clearTimeout(timer)
    timer = undefined
    ready = false
  }

  return throttled
}
