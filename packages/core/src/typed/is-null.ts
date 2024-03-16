export const isNull = <T>(val: T): val is Extract<T, null> => {
  return val === null
}
