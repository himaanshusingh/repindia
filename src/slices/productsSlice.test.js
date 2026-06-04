import { describe, it, expect } from 'vitest'
import productsReducer from './productsSlice'

describe('products slice', () => {
  it('should return the initial state', () => {
    const state = productsReducer(undefined, { type: '' })
    expect(state.items).toBeDefined()
  })
})
