import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: []
  },
  reducers: {
    addHotels(state, action) {
      const newHotels = _.differenceBy(action.payload, state.hotels, 'id');
      state.hotels.push(...newHotels);
    },
    deleteHotels(state, action) {
      const oldHotels = _.differenceBy(state.hotels, action.payload, 'id');
      state.hotels = state.hotels.filter(
        hotel => !oldHotels.includes(hotel)
      );
    }
  }
})

export const { addHotels, deleteHotels } = hotelsSlice.actions;

export default hotelsSlice.reducer;
