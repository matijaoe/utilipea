/**
 * Format a number as a percentage.
 *
 * @category Format
 *
 * @example
 * formatPercentage(0.5)
 * // => '50%'
 *
 * formatPercentage(0.5, { minimumFractionDigits: 2 })
 * // => '50.00%'
 *
 * formatPercentage(0.12345, { maximumFractionDigits: 2 })
 * // => '12.35%'
 */
export const formatPercentage = (
  val: number,
  opts: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    ...opts,
  }).format(val)
}
