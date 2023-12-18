import { randomInt, randomIntInsecure } from '..'

/**
 * Get random item(s) from an array
 *
 */
export const sample = <T>(arr: T[], quantity = 1, opts?: { secure?: boolean }) => {
  const random = opts?.secure ? randomInt : randomIntInsecure
  return Array.from({ length: quantity }, (_) => arr.at(random(0, arr.length - 1)))
}
