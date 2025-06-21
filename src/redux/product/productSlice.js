import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/middleware/axiosInstance'

const initialState = {
  currentProduct: null
}

export const getProductInfoAPI = createAsyncThunk('product/getProductInfoAPI', async (slug) => {
  const response = await authorizedAxiosInstance.get(`/products/${slug}`)
  return response.data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductInfoAPI.fulfilled, (state, action) => {
      const product = action.payload
      state.currentProduct = product
    })
  }
})

export const selectCurrentProduct = (state) => state.currentProduct

export default productSlice.reducer
