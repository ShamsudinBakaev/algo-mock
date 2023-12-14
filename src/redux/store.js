import { configureStore } from '@reduxjs/toolkit';
import session from './sessionSlice';

const store = configureStore({
  reducer: session,
});

export default store;
