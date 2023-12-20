// import type { ThrottledFunction } from '..'

export type ThrottledFunction<TArgs extends any[], TRes> = {
  (...args: TArgs): TRes | undefined
  /**
   * Checks if there is any invocation throttled
   */
  pending(): boolean
  /**
   * Cancels the throttled function invocation
   */
  cancel(): void
  /**
   * Flushes the throttled function invocation
   */
  flush(): TRes | undefined
  /**
   * Returns the last result of the throttled function
   */
  lastResult: () => TRes | undefined
}

type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export const throttle = <TArgs extends any[], TRes>(
  func: (...args: TArgs) => TRes,
  interval: number,
  opts: ThrottleOptions = {},
): ThrottledFunction<TArgs, TRes> => {
  opts = {
    leading: true,
    trailing: false,
    ...opts
  }

  let maxWaitTimer: ReturnType<typeof setTimeout> | undefined
  let timer: ReturnType<typeof setTimeout> | undefined
  let ready = opts.leading

  let lastResult: TRes | undefined
  let lastArgs: TArgs | undefined

  const throttled: ThrottledFunction<TArgs, TRes> = (...args: TArgs) => {
    if (ready) {
      lastResult = func(...args)
      ready = false

      if (maxWaitTimer) {
        clearTimeout(maxWaitTimer)
        maxWaitTimer = undefined
      }
    }

    if (opts.trailing) {
      lastArgs = args
    }

    if (!timer) {
      timer = setTimeout(() => {
        if (lastArgs) {
          lastResult = func(...lastArgs)
          lastArgs = undefined
        }
        ready = opts.leading
        timer = undefined
      }, interval)
    }

    if (opts.maxWait && !maxWaitTimer) {
      maxWaitTimer = setTimeout(() => {
        if (lastArgs) {
          lastResult = func(...lastArgs)
          lastArgs = undefined
        }
        ready = opts.leading
        maxWaitTimer = undefined
      }, opts.maxWait)
    }

    return lastResult
  }

  throttled.lastResult = () => {
    return lastResult
  }

  throttled.pending = () => {
    return timer !== undefined
  }

  throttled.cancel = () => {
    if (!timer && !maxWaitTimer) { return }
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    if (maxWaitTimer) {
      clearTimeout(maxWaitTimer)
      maxWaitTimer = undefined
    }
    ready = opts.leading
    lastArgs = undefined
  }

  throttled.flush = () => {
    if (!timer && !maxWaitTimer) { return }

    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    if (maxWaitTimer) {
      clearTimeout(maxWaitTimer)
      maxWaitTimer = undefined
    }

    if (lastArgs) {
      lastResult = func(...lastArgs)
      lastArgs = undefined
    }

    ready = opts.leading
    return lastResult
  }

  return throttled
}
