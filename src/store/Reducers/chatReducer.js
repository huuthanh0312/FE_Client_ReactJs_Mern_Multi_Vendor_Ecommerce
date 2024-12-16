import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import api from '../../api/api'

// customers add chat seller
export const addCustomerFriend = createAsyncThunk(
  'chat/addCustomerFriend',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('home/chat/customers/add-friend', info, {
        withCredentials: true
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Customer to send message seller

export const customerSendMessage = createAsyncThunk(
  'chat/customerSendMessage',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    //console.log(info);
    try {
      const { data } = await api.post('home/chat/customers/send-message-to-seller', info, {
        withCredentials: true
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    myFriends: [],
    frMessages: [],
    currentFriend: ''
  },
  reducers: {
    // Hàm xóa message trong redux
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
    // Hàm cập nhật message
    updateMessage: (state, { payload }) => {
      state.frMessages = [...state.frMessages, payload]
    }
  },
  // loader check state
  extraReducers: (builder) => {
    builder

      .addCase(addCustomerFriend.fulfilled, (state, { payload }) => {
        state.frMessages = payload.messages
        state.myFriends = payload.myFriends
        state.currentFriend = payload.currentFriend
      })
      // customer to send message seller
      .addCase(customerSendMessage.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(customerSendMessage.rejected, (state, { payload }) => {
        // get status and data BE pending 404
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(customerSendMessage.fulfilled, (state, { payload }) => {
        state.loader = false
        let tempFriends = [...state.myFriends] // Tạo bản sao của myFriends
        let i = tempFriends.findIndex((f) => f.friendId === payload.messages.receiverId)

        if (i >= 0) {
          // Kiểm tra nếu seller tồn tại trong danh sách bạn bè
          const seller = tempFriends.splice(i, 1)[0] // Lấy seller ra khỏi mảng
          tempFriends.unshift(seller) // Thêm seller vào đầu mảng
        }

        state.frMessages = [...state.frMessages, payload.messages] // Cập nhật danh sách tin nhắn
        state.myFriends = tempFriends // Cập nhật lại danh sách bạn bè
        state.successMessage = 'Message Send Successfully'
      })
  }
})

export const { messageClear, updateMessage } = chatReducer.actions
export default chatReducer.reducer
