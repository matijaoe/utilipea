export const titlecase = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.at(0)!.toUpperCase() + word.slice(1))
    .join(' ')
}
