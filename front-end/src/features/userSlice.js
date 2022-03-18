import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    user:{
      email: '',
      roles: '',
    }
  },
  reducers: {
    addUser(state, action) {
      state.user.email = action.payload.email;
      state.user.roles = action.payload.roles;

    },
    addToken(state, action) {
      state.token = action.payload
    }
  }
})

export const { addUser, addToken } = userSlice.actions;

export default userSlice.reducer;
