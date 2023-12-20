// import type { ThrottledFunction } from '..'

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

  const throttled: ThrottledFunction<TArgs, TRes> = (...args: TArgs) => {
    if (ready) {
      func(...args)
      ready = false
    }

    if (trailing) {
      lastArgs = args
    }

    if (!timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (lastArgs) {
          func(...lastArgs)
          lastArgs = undefined
        }
        ready = leading
        timer = undefined
      }, interval)
    }
  }

  throttled.pending = () => {
    return timer !== undefined
  }

  throttled.cancel = () => {
    if (!timer) { return }

    clearTimeout(timer)
    timer = undefined
    ready = leading
    lastArgs = undefined
  }

  return throttled
}
