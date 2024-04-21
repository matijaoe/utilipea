import * as crypto from 'uncrypto'
import { isInt } from '../typed'

/**
 * Generates a random float between two given numbers (inclusive).
 *
 * ses `crypto.getRandomValues` to generate the random number.
 *
 * @example
 * randomInt(1, 10)
 * // => 8
 */
export const randomInt = (min: number, max: number): number => {
  // Taken from https://stackoverflow.com/a/41452318
  if (!isInt(min) || !isInt(max)) {
    throw new TypeError('min and max must be integers')
  }

  if (min >= max) {
    throw new Error('max must be greater than min')
  }

  const range = max - min + 1
  const randomBytes = Math.ceil(Math.log2(range) / 8)
  const maxRandNumber = 256 ** randomBytes
  const randomBuffer = new Uint8Array(randomBytes)

  let randomValue: number
  do {
    crypto.getRandomValues(randomBuffer)
    randomValue = 0
    for (let index = 0; index < randomBytes; index++) {
      randomValue = (randomValue << 8) + randomBuffer[index]
    }
    // rerun if randomValue is bigger than range
  } while (randomValue >= maxRandNumber - (maxRandNumber % range))

  return min + (randomValue % range)
}
