export const isNil = <T>(val: T): val is Extract<T, null | undefined> => {
  // eslint-disable-next-line eqeqeq
  return val == undefined
}
