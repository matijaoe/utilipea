/**
 * Format a number as a percentage.
 *
 * @category Format
 *
 * @example
 * formatPercent(0.5)
 * // => '50%'
 *
 * formatPercent(0.5, { minimumFractionDigits: 2 })
 * // => '50.00%'
 *
 * formatPercent(0.12345, { maximumFractionDigits: 2 })
 * // => '12.35%'
 */
export const formatPercent = (
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
