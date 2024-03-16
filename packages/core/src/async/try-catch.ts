/**
 * Attempts to execute a promise and returns an array with the result or error.
 *
 * This is useful for handling errors in async functions without try/catch blocks.
 *
 * @example
 * ```ts
 * const [data, error] = await tryCatch(fetch('https://example.com/api'));
 * if (error)
 *   console.error(`Error: ${error.message}`);
 * ```
 * @param promise A Promise to be executed.
 * @returns A Promise that resolves to an array containing the result or error.
 * If the Promise executes successfully, the array contains the result and a undefined error.
 * If the Promise throws an error, the array contains undefined for the result and the error object.
 *
 */

import { isPromise } from '../typed'

export const tryCatch = async <T>(promise: Promise<T>): Promise<[T, undefined] | [undefined, Error]> => {
  try {
    const data = await promise
    return [data, undefined]
  } catch (error: unknown) {
    return [undefined, error as Error]
  }
}

export const tryit = <Args extends any[], Return>(
  func: (...args: Args) => Return
) => {
  return (
    ...args: Args
  ): Return extends Promise<any>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return] => {
    try {
      const result = func(...args)
      if (isPromise(result)) {
        return result
          .then((value) => [undefined, value])
          .catch((error) => [error, undefined]) as Return extends Promise<any>
          ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
          : [Error, undefined] | [undefined, Return]
      }
      return [undefined, result] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    } catch (error) {
      return [error as any, undefined] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    }
  }
}
