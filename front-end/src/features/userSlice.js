import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:{
      email: '',
      roles: '',
      token: '',
      hotel: '',
      firstName: '',
      lastName: '',
      id: '',
    }
  },
  reducers: {
    addUser(state, action) {
      state.user.email = action.payload.email;
      state.user.roles = action.payload.roles;
      state.user.token = action.payload.token;
      state.user.hotel = action.payload.hotel;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.id = action.payload.id;
    },
    deleteUser(state) {
      state.user.email = '';
      state.user.roles = '';
      state.user.token = '';
      state.user.hotel = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.id = '';
    }
  }
})

export const { addUser, addToken, deleteUser } = userSlice.actions;

export default userSlice.reducer;
