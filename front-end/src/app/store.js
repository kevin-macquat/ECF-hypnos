import { configureStore } from '@reduxjs/toolkit';
import hotelsSlice from '../features/hotelsSlice';
import roomsSlice from '../features/roomsSlice';
import userSlice from '../features/userSlice';

export default configureStore({
  reducer: {
    hotels: hotelsSlice,
    rooms: roomsSlice,
    user : userSlice,
  },
})
