import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

// Add Product to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info)
    try {
      const { data } = await api.post('/home/cart/add', info, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// get info product to seller to Cart
export const getCartProducts = createAsyncThunk(
  'cart/getCartProducts',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info)
    try {
      const { data } = await api.get(`/home/cart/get-products/${userId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// delete cart product
export const deleteCartProduct = createAsyncThunk(
  'cart/deleteCartProduct',
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info)
    try {
      const { data } = await api.delete(`/home/cart/delete-product/${cartId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// cart product quantity Increase
export const quantityIncrease = createAsyncThunk(
  'cart/quantityIncrease',
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(cartId)
    try {
      const { data } = await api.put(`/home/cart/quantity-increase/${cartId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// cart product quantity Decrease
export const quantityDecrease = createAsyncThunk(
  'cart/quantityDecrease',
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    //console.log(cartId)
    try {
      const { data } = await api.put(`/home/cart/quantity-decrease/${cartId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


export const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    cartProducts: [],
    cart_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    shipping_fee: 0,
    outOfStockProducts: [],
    buy_product_item: 0,

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
      // login
      .addCase(addToCart.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        state.cart_product_count = state.cart_product_count + 1
      })
      //get Cart products
      .addCase(getCartProducts.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.cartProducts = payload.cartProducts
        state.price = payload.price
        state.cart_product_count = payload.cart_product_count
        state.shipping_fee = payload.shipping_fee
        state.outOfStockProducts = payload.outOfStockProducts
        state.buy_product_item = payload.buy_product_item
      })
      //delete prodcut cart
      .addCase(deleteCartProduct.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
      })
      //cart product quantity Increase
      .addCase(quantityIncrease.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
      })
      //cart product quantity Decrease
      .addCase(quantityDecrease.fulfilled, (state, { payload }) => {
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
      })
  }
})

export const { messageClear } = cartReducer.actions
export default cartReducer.reducer
