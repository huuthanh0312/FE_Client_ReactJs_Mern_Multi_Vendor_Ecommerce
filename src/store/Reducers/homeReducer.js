import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
// import { jwtDecode } from 'jwt-decode'

// Get home Category
export const getCategories = createAsyncThunk(
  'product/getCategories',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/categories`, { withCredentials: true })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Get home Product
export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/products`, { withCredentials: true })
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Get home Product Price Range Product
export const priceRangeProduct = createAsyncThunk(
  'product/priceRangeProduct',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/products/price-range`, { withCredentials: true })
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// queryProducts filter
export const queryProducts = createAsyncThunk(
  'product/queryProducts',
  async (query, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(query)
      const { data } = await api.get(
        `/home/products/query?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&searchValue=${query.searchValue ? query.searchValue : ''}`,
        {
          withCredentials: true
        }
      )

      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
    categories: [],
    products: [],
    totalProduct: 0,
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
    priceRange: {
      low: 0,
      high: 500
    },
    parPage: 3
  },
  reducers: {
    // message clear function reudx
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.categories = payload.categories
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.products = payload.products
        state.latestProducts = payload.latestProducts
        state.topRatedProducts = payload.topRatedProducts
        state.discountProducts = payload.discountProducts
      })
      .addCase(priceRangeProduct.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.latestProducts = payload.latestProducts
        state.priceRange = payload.priceRange
      })

      .addCase(queryProducts.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.products = payload.products
        state.totalProduct = payload.totalProduct
        state.parPage = payload.parPage
      })
  }
})

export const { messageClear } = homeReducer.actions
export default homeReducer.reducer
