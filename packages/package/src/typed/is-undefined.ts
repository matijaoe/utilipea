export const isUndefined = <T>(val: T): val is Extract<T, undefined> => {
  return val === undefined
}
