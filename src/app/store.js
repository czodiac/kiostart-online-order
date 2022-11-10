import { configureStore } from '@reduxjs/toolkit';
import myStoreReducer from '../features/myStore/myStoreSlice';
import myStoreItemSlice from '../features/myStore/myStoreItemSlice';

export const store = configureStore({
  reducer: {
    myStore: myStoreReducer,
    myStoreItem: myStoreItemSlice
  },
});
