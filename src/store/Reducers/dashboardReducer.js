import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getDashBoardIndexData = createAsyncThunk(
  'auth/getDashBoardIndexData',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`home/customer/get-dashboard-data/${userId}`, { withCredentials: true })
      //setup localStorage

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    recentOrders: [],
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,

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
      // // login
      // .addCase(customer_login.pending, (state, { payload }) => {
      //   // get status and data BE pending 404
      //   state.loader = true
      // })
      // .addCase(customer_login.rejected, (state, { payload }) => {
      //   // get status and data BE pending 404
      //   state.loader = false
      //   state.errorMessage = payload.error
      // })
      .addCase(getDashBoardIndexData.fulfilled, (state, { payload }) => {

        state.recentOrders = payload.recentOrders
        state.totalOrder = payload.totalOrder
        state.pendingOrder = payload.pendingOrder
        state.cancelledOrder = payload.cancelledOrder

      })


  }
})

export const { messageClear } = dashboardReducer.actions
export default dashboardReducer.reducer
