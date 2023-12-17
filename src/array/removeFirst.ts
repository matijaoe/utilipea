export const removeFirst = <T>(arr: T[], item: T): T[] => {
  const index = arr.indexOf(item)
  if (index === -1) { return [...arr] }
  return arr.toSpliced(index, 1)
}
