// end is exclusive
// third parameter is step, when descending
export function range(len: number): number[]
export function range(start: number, end: number, step?: number): number[]
export function range(startOrLen: number, end?: number, step = 1): number[] {
  if (end === undefined) {
    end = startOrLen - 1
    startOrLen = 0
  }

  const isAsc = startOrLen < end

  if (isAsc && step < 0) {
    throw new Error('The step must be greater than 0.')
  }

  step = startOrLen > end ? -Math.abs(step) : step
  const length = Math.ceil(Math.abs((end - startOrLen) / step))

  const result = Array.from<number>({ length })

  for (let i = 0; i < length; i++) {
    result[i] = startOrLen + (i * step)
  }

  return result
}
