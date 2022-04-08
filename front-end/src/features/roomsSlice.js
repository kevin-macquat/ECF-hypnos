import _ from 'lodash';
import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: []
  },
  reducers: {
    addRooms(state, action) {
      const newRooms = _.differenceBy(action.payload, state.rooms, 'id');
      state.rooms.push(...newRooms);
    },
    deleteRooms(state, action) {
      const oldRooms = _.differenceBy(state.rooms, action.payload, 'id');
      state.rooms = state.rooms.filter(
        room => !oldRooms.includes(room)
      );
    }
  }
})

export const { addRooms, deleteRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
