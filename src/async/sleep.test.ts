import { assertType, describe, expect, it } from 'vitest'
import { sleep } from './sleep'

describe('sleep', () => {
  it('suspends a thread for a specified number of milliseconds', async () => {
    const ONE_SECOND = 1000
    const before = Date.now()
    await sleep(ONE_SECOND)
    const after = Date.now()
    expect(after).toBeGreaterThanOrEqual(before + ONE_SECOND)
  })

  it('should return a promise', () => {
    const promise = sleep(100)
    assertType<Promise<void>>(promise)
  })
})
