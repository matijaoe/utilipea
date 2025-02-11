export const isNumber = (val: unknown): val is number => {
  try {
    return Number(val) === val
  } catch {
    return false
  }
}
