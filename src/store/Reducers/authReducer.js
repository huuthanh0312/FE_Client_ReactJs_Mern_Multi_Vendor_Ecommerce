import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
import { jwtDecode } from 'jwt-decode'

export const customer_login = createAsyncThunk(
  'auth/customer_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/customer/login', info, { withCredentials: true })
      //setup localStorage
      localStorage.setItem('customerToken', data.token)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const customer_register = createAsyncThunk(
  'auth/customer_register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('/customer/register', info, { withCredentials: true })
      //setup localStorage
      localStorage.setItem('customerToken', data.token)
      //console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)



//decoding token check duration token
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token)
    const expireTime = new Date(userInfo.exp * 1000)
    if (new Date() > expireTime) {
      localStorage.removeItem('customerToken')
      return ''
    } else {
      return userInfo
    }
  } else {
    return ''
  }
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: decodeToken(localStorage.getItem('customerToken')),
    // token: localStorage.getItem('customerToken')
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
      .addCase(customer_login.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token)
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        // state.token = payload.token
        state.userInfo = userInfo
      })
      //register
      .addCase(customer_register.pending, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = true
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token)
        // get status and data BE success 200
        state.loader = false
        state.successMessage = payload.message
        // state.token = payload.token
        state.userInfo = userInfo
      })

  }
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
