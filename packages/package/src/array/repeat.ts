export function repeat<T>(array: T[], times: number): T[] {
  return Array.from({ length: times }, () => array).flat()
}
