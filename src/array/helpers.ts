export const toList = <T>(gen: Generator<T>): T[] => {
  const items: T[] = []
  for (const item of gen) {
    items.push(item)
  }
  return items
}
