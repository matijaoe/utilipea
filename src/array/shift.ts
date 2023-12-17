/**
 * Shift array items by n steps
 * If n > 0 items will shift n steps to the right
 * If n < 0 items will shift n steps to the left
 */
export const shift = <T>(arr: Array<T>, n: number) => {
  if (!arr?.length) { return arr }

  const shiftNumber = n % arr.length

  if (shiftNumber === 0) { return arr }

  return [...arr.slice(-shiftNumber), ...arr.slice(0, -shiftNumber)]
}
