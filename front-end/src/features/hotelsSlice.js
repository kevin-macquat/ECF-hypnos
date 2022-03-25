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
    }
  }
})

export const { addHotels } = hotelsSlice.actions;

export default hotelsSlice.reducer;
