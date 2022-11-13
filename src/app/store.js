import { configureStore } from '@reduxjs/toolkit';
import myStoreSlice from '../slices/myStoreSlice';
import myStoreItemSlice from '../slices/myStoreItemSlice';
import deviceInfoSlice from '../slices/deviceInfoSlice';
import myStoreItemModalSlice from '../slices/myStoreItemModalSlice';

import authReducer from "../slices/authSlice";
import messageReducer from "../slices/serverResponseMessageSlice";

export const store = configureStore({
  reducer: {
    myStore: myStoreSlice,
    myStoreItem: myStoreItemSlice,
    device: deviceInfoSlice,
    myStoreItemModal: myStoreItemModalSlice,
    auth: authReducer,
    message: messageReducer
  },
});
