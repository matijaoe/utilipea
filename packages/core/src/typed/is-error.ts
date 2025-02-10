export const isError = (val: unknown): val is Error => {
  return val instanceof Error
}
