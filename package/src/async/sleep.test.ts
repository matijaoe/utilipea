import { assertType, describe, expect, it } from 'vitest'
import { sleep } from './sleep'

describe('sleep', () => {
  it('suspends a thread for a specified number of milliseconds', async () => {
    const HALF_A_SECOND = 500
    const before = Date.now()
    await sleep(HALF_A_SECOND)
    const after = Date.now()
    expect(after).toBeGreaterThanOrEqual(before + HALF_A_SECOND)
  })

  it('should return a promise', () => {
    const promise = sleep(100)
    assertType<Promise<void>>(promise)
  })
})
