export const isTruthy = <T>(val: T): val is NonNullable<T> => {
  return Boolean(val)
}
