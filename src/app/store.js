import { configureStore } from '@reduxjs/toolkit';
import myStoreSlice from '../features/myStore/myStoreSlice';
import myStoreItemSlice from '../features/myStore/myStoreItemSlice';
import deviceInfoSlice from '../features/global/deviceInfoSlice';
import myStoreItemModalSlice from '../features/global/myStoreItemModalSlice';

export const store = configureStore({
  reducer: {
    myStore: myStoreSlice,
    myStoreItem: myStoreItemSlice,
    device: deviceInfoSlice,
    myStoreItemModal: myStoreItemModalSlice,
  },
});
