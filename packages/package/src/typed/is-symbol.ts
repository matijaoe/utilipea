export const isSymbol = (val: unknown): val is symbol => {
  return typeof val === 'symbol'
}
