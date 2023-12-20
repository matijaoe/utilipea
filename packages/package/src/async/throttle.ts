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

// i dont even figure out if this works correctly, for flush and trailing 🤷🏻
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

  const invokeFunc = () => {
    if (lastArgs) {
      result = func(...lastArgs)
      if (trailing) {
        lastArgs = undefined
      }
    }
    return result
  }

  const leadingEdge = () => {
    if (ready && lastArgs) {
      invokeFunc()
      ready = false
    }
    return result
  }

  const trailingEdge = () => {
    timer = undefined

    if (trailing && lastArgs) {
      return invokeFunc()
    }
    lastArgs = undefined
    return result
  }

  const throttled: ThrottledFunction<TArgs, TRes> = (...args: TArgs) => {
    lastArgs = args

    leadingEdge()

    if (!timer) {
      timer = setTimeout(() => {
        trailingEdge()
        ready = leading
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
    lastArgs = undefined
  }

  throttled.flush = () => {
    return !timer ? result : trailingEdge()
  }

  return throttled
}
