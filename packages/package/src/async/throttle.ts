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
   * Runs the throttled function immediately
   */
  flush(): TRes | undefined
  /**
   * Returns the last result of the throttled function
   */
  lastResult(): TRes | undefined
}

type ThrottleOptions = {
  leading?: true
  trailing?: boolean
} | {
  leading?: boolean
  trailing: true
}

export const throttle = <TArgs extends any[], TRes>(
  func: (...args: TArgs) => TRes,
  interval: number,
  opts?: ThrottleOptions,
): ThrottledFunction<TArgs, TRes> => {
  const { leading, trailing } = { leading: true, trailing: false, ...opts }

  let timer: ReturnType<typeof setTimeout> | undefined
  let ready = leading
  let lastArgs: TArgs | undefined
  let result: TRes | undefined

  const throttled: ThrottledFunction<TArgs, TRes> = (...args: TArgs) => {
    if (ready) {
      result = func(...args)
      ready = false
    }

    if (trailing) {
      lastArgs = args
    }

    if (!timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        invokeFunc()
        ready = leading
        timer = undefined
      }, interval)
    }
  }

  const invokeFunc = () => {
    if (lastArgs) {
      result = func(...lastArgs)
      lastArgs = undefined
    }
    return result
  }

  const trailingEdge = () => {
    timer = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc()
    }
    lastArgs = undefined
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
    lastArgs = undefined
  }

  throttled.flush = () => {
    if (!timer) {
      return result
    }

    return trailingEdge()
  }

  return throttled
}
