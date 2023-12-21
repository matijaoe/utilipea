export const notUndefined = <T>(val: T): val is Exclude<T, undefined> => {
  return val !== undefined
}
