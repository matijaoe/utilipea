export const isRelative = (input: string) => {
  return ['./', '../'].some((str) => input.startsWith(str))
}
