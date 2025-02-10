import { describe, expect, it } from 'vitest'
import { intersects } from './intersects'

describe('intersects', () => {
  it('does intersect', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]

    const result = intersects(arr1, arr2)
    expect(result).toEqual(true)
  })

  it('does not intersect', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [6, 7, 8, 9, 10]

    const result = intersects(arr1, arr2)
    expect(result).toEqual(false)
  })

  it('does intersect with identity', () => {
    const arr1 = [{ id: 1, name: 'Pat' }]
    const arr2 = [{ id: 2, name: 'Mat' }, { id: 3, name: 'Pat' }]

    const result = intersects(arr1, arr2, (x) => x.name)
    expect(result).toEqual(true)
  })

  it('does not intersect with identity', () => {
    const arr1 = [{ id: 1, name: 'Pat' }]
    const arr2 = [{ id: 2, name: 'Mat' }, { id: 3, name: 'Kat' }]

    const result = intersects(arr1, arr2, (x) => x.name)
    expect(result).toEqual(false)
  })
})
