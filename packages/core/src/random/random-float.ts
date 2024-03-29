/**
 * Generates a random float between two given numbers, including those numbers.
 *
 * It uses `crypto.getRandomValues` to generate the random number.
 *
 * @example
 * randomFloat(1, 10)
 * // => 1.123456789
 */
export const randomFloat = (min: number, max: number) => {
  if (min >= max) {
    throw new Error('max must be greater than min')
  }

  const randomBuffer = new Uint32Array(2)
  // TODO: uncrypto
  crypto.getRandomValues(randomBuffer)

  const [first, second] = randomBuffer

  // keep all 32 bits of the the first, top 21 of the second for 53 random bits
  const randomBigInt = (BigInt(first) << 21n) | (BigInt(second) >> 11n)

  // fraction between 0 and 1 with full 53bit precision
  const fraction = Number(randomBigInt) / Number.MAX_SAFE_INTEGER // (2 ** 53)
  return min + (fraction * (max - min))
}
