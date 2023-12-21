export const isPromise = <T, S>(val: Promise<T> | S): val is Promise<T> => {
  return val instanceof Promise
}
