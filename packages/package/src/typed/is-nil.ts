export const isNil = <T>(val: T): val is Extract<T, null | undefined> => {
  return val == null
}
