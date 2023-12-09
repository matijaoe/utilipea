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
