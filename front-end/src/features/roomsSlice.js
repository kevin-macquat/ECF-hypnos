import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
  },
  reducers: {
    addRooms(state, action) {
      const newRooms = _.difference(action.payload, state.rooms, 'id');
      // console.log('Slice')
      // console.log(newRooms);
      state.rooms.push(...newRooms);
    }
  }
})

export const { addRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
