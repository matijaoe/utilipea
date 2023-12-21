export const removeLast = <T>(arr: T[], item: T): T[] => {
  const index = arr.lastIndexOf(item)
  if (index === -1) { return [...arr] }
  return arr.toSpliced(index, 1)
}
