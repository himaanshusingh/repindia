import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../slices/productsSlice'
import ProductCard from './ProductCard'

const mockStore = configureStore({
  reducer: {
    products: productsReducer
  },
  preloadedState: {
    products: {
      items: [],
      status: 'idle',
      wishlist: []
    }
  }
})

const product = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  description: 'desc',
  category: 'cat',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.5, count: 10 }
}

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    )
    expect(getByText('Test Product')).toBeTruthy()
    expect(getByText('$9.99')).toBeTruthy()
  })
})
