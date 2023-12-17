export const removeAll = <T>(arr: T[], item: T): T[] => {
  return arr.filter((i) => i !== item)
}
