import { type Func, type ThrottledFunction, isDef } from '..'

// TODO: wip
export const throttle = <T extends (...args: any[]) => any>(func: T, interval: number) => {
  let ready = true
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastResult: ReturnType<T> | undefined
  const wasCalled = false

  const throttled = (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (!ready) {
      return lastResult
    }
    lastResult = func(...args)
    ready = false
    timer = setTimeout(() => {
      ready = true
      timer = undefined
    }, interval)
    return lastResult
  }

  throttled.isThrottled = () => {
    return timer !== undefined
  }

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
      ready = true
    }
  }

  throttled.flush = () => {
    if (!ready) {
      ready = true
      lastResult = func()
    }
  }

  throttled.wasCalledDuringThrottle = () => {
    return wasCalled
  }

  return throttled
}

// Define a function that you want to throttle
const logDate = () => {
  console.log(new Date())
  return new Date().toISOString()
}

// Create a throttled version of the function
const throttledLogDate = throttle(logDate, 1000)

// Call the throttled function multiple times
console.log(throttledLogDate()) // Logs the current date and time
console.log(throttledLogDate()) // Returns the same date and time as the previous call
setTimeout(() => console.log(throttledLogDate()), 2000) // Logs a new date and time after 2 seconds

// Define a function that you want to throttle
const logMessage = (message: string) => {
  console.log(message)
}

// Create a throttled version of the function
const throttledLogMessage = throttle(logMessage, 1000)

// Call the throttled function multiple times
throttledLogMessage('Hello, world!') // Logs "Hello, world!"
throttledLogMessage('Hello again!') // Does nothing because the function is throttled
setTimeout(() => throttledLogMessage('Hello after 2 seconds!'), 2000) // Logs "Hello after 2 seconds!" after 2 seconds
