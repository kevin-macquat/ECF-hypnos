import { configureStore } from '@reduxjs/toolkit';
import roomsSlice from '../features/roomsSlice';
import userSlice from '../features/userSlice';

export default configureStore({
  reducer: {
    user : userSlice,
    rooms: roomsSlice,
  },
})
