import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'


// Add Product to cart
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ products, price, shipping_fee, items, shippingInfo, userId, navigate }) => {
    //console.log(info)
    try {
      const { data } = await api.post('/home/order/place-order', { products, price, shipping_fee, items, shippingInfo, userId, navigate }, { withCredentials: true })
      navigate('/payment', {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        }
      })
      //console.log(data)
    } catch (error) {
      //return rejectWithValue(error.response.data)
    }
  }
)

// get List Orders By Status Customers Handle
export const getOrdersByStatus = createAsyncThunk(
  'auth/getOrdersByStatus',
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    // Input validation
    if (!customerId) {
      return rejectWithValue({ error: 'Customer ID is required.' })
    }
    if (!status) {
      return rejectWithValue({ error: 'Order status is required.' })
    }
    try {
      const { data } = await api.get(
        `/home/order/orders-by-status/${customerId}/${status}`,
        { withCredentials: true }
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// get Orders Details Customers Handle
export const getOrderDetails = createAsyncThunk(
  'auth/getOrderDetails',
  async (orderId, { rejectWithValue, fulfillWithValue }) => {

    // if (!orderId) {
    //   return rejectWithValue({ error: 'Order is required.' })
    // }
    try {
      const { data } = await api.get(`/home/order/details/${orderId}`, { withCredentials: true })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    myOrders: [],
    myOrder: {}


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
      .addCase(getOrdersByStatus.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders
      })
      .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
        state.myOrder = payload.orderDetails
      })


  }
})

export const { messageClear } = orderReducer.actions
export default orderReducer.reducer
