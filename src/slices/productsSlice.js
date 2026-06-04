import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getSavedWishlist = () => {
  if (typeof localStorage === 'undefined') return []
  try {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    return []
  }
}

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    wishlist: getSavedWishlist()
  },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload
      const index = state.wishlist.indexOf(id)
      if (index > -1) {
        state.wishlist.splice(index, 1)
      } else {
        state.wishlist.push(id)
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { toggleWishlist } = productsSlice.actions
export default productsSlice.reducer
