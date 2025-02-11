export const isUrl = (val: unknown): val is URL => {
  return val instanceof URL
}
