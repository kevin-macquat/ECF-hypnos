import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: []
  },
  reducers: {
    addRooms(state, action) {
      const newRooms = _.differenceBy(action.payload, state.rooms, 'id');
      state.rooms.push(...newRooms);
    }
  }
})

export const { addRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
