import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:{
      email: '',
      roles: '',
      token: '',
    }
  },
  reducers: {
    addUser(state, action) {
      state.user.email = action.payload.email;
      state.user.roles = action.payload.roles;
      state.user.token = action.payload.token;
    },
    deleteUser(state) {
      state.user.email = '';
      state.user.roles = '';
      state.token = '';
    }
  }
})

export const { addUser, addToken, deleteUser } = userSlice.actions;

export default userSlice.reducer;
