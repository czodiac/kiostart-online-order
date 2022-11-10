import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import myStoreReducer from '../features/myStore/myStoreSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    myStore: myStoreReducer
  },
});
