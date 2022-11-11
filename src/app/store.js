import { configureStore } from '@reduxjs/toolkit';
import myStoreSlice from '../features/myStore/myStoreSlice';
import myStoreItemSlice from '../features/myStore/myStoreItemSlice';
import deviceInfoSlice from '../features/global/deviceInfoSlice';

export const store = configureStore({
  reducer: {
    myStore: myStoreSlice,
    myStoreItem: myStoreItemSlice,
    device: deviceInfoSlice,
  },
});
