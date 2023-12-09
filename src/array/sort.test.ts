import { describe, expect, it } from 'vitest'
import { sort } from './sort'

describe('[array] sort', () => {
  it('sorts array of numbers in ascending order', () => {
    const result = sort([1, 1, 2, 3, 4, 5, 9])
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 9])
  })

  it('sorts array of numbers in descending order', () => {
    const result = sort([3, 1, 4, 1, 5, 9, 2], { order: 'desc' })
    expect(result).toEqual([9, 5, 4, 3, 2, 1, 1])
  })

  it('sorts array of strings in ascending order', () => {
    const result = sort(['banana', 'apple', 'cherry'])
    expect(result).toEqual(['apple', 'banana', 'cherry'])
  })

  it('sorts array of strings in descending order', () => {
    const result = sort(['banana', 'apple', 'cherry'], { order: 'desc' })
    expect(result).toEqual(['cherry', 'banana', 'apple'])
  })

  // create example mixing lowercase and uppercase
  it('sorts array of strings in ascending order with mixed case', () => {
    const result = sort(['banana', 'Apple', 'cherry'])
    expect(result).toEqual(['Apple', 'banana', 'cherry'])
  })

  it('sorts array of objects by a specific property', () => {
    const array = [{ id: 3 }, { id: 1 }, { id: 2 }]
    const result = sort(array, { by: (item) => item.id })
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('sorts array of objects by a specific property in desc order', () => {
    const array = [{ id: 3 }, { id: 1 }, { id: 2 }]
    const result = sort(array, { order: 'desc', by: (item) => item.id })
    expect(result).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }])
  })

  it('sorts array of dates', () => {
    const dates = [new Date(2020, 1, 1), new Date(2019, 1, 1), new Date(2021, 1, 1)]
    const result = sort(dates)
    expect(result).toEqual([dates[1], dates[0], dates[2]])
  })
})
