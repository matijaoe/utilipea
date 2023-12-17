import { describe, expect, it } from 'vitest'
import { insert } from './insert'

describe('insert', () => {
  // insert single item
  it('should insert a single item at the beginning', () => {
    expect(insert([1, 2, 3], 0, 0)).toEqual([0, 1, 2, 3])
  })

  it('should insert items at the beginning when index is 0', () => {
    expect(insert([1, 2, 3], [0], 0)).toEqual([0, 1, 2, 3])
  })

  it('should insert items at the end when index is equal to array length', () => {
    expect(insert([1, 2, 3], [4], 3)).toEqual([1, 2, 3, 4])
  })

  it('should insert items at the correct position when index is positive', () => {
    expect(insert([1, 2, 3], [1.5], 1)).toEqual([1, 1.5, 2, 3])
  })

  it('should insert items at the correct position when index is negative', () => {
    expect(insert([1, 2, 3], [2.5], -1)).toEqual([1, 2, 2.5, 3])
  })

  it('should return the items when the original array is empty', () => {
    expect(insert([], [1, 2, 3], 0)).toEqual([1, 2, 3])
  })

  it('should return the original array when the items are empty', () => {
    expect(insert([1, 2, 3], [], 0)).toEqual([1, 2, 3])
  })

  it('should insert items at the beginning when index is undefined', () => {
    expect(insert([1, 2, 3], [0])).toEqual([0, 1, 2, 3])
  })

  it('should insert items at the beginning when index is positive and equal to array length', () => {
    expect(insert([1, 2, 3], [0], 3)).toEqual([1, 2, 3, 0])
  })

  it('should insert items at the beginning when index is positive greater than array length', () => {
    expect(insert([1, 2, 3], [0], 4)).toEqual([1, 2, 3, 0])
  })

  it('should insert items at the beginning when index is negative and abs(index) equal to array length', () => {
    expect(insert([1, 2, 3], [0], -3)).toEqual([0, 1, 2, 3])
  })

  it('should insert items at the beginning when index is negative and abs(index) greater than array length', () => {
    expect(insert([1, 2, 3], [0], -4)).toEqual([0, 1, 2, 3])
  })
})
