/**
 * Round a number to the given precision.
 *
 * @example
 * round(1.23456); // => 1.23
 * round(1.23456, 2); // => 1.23
 * round(1.235, 1); // => 1.2
 * round(1234.56); // => 1234.56
 */

export const round = (number: number, precision = 2) => {
  const factor = 10 ** precision
  return Math.round((number + Number.EPSILON) * factor) / factor
}
