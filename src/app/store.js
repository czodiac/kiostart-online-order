import { configureStore } from '@reduxjs/toolkit';
import myStoreSlice from '../slices/myStoreSlice';
import myStoreItemSlice from '../slices/myStoreItemSlice';
import deviceInfoSlice from '../slices/deviceInfoSlice';
import modalSlice from '../slices/modalSlice';

import authReducer from "../slices/authSlice";
import messageReducer from "../slices/serverResponseMessageSlice";

export const store = configureStore({
  reducer: {
    myStore: myStoreSlice,
    myStoreItem: myStoreItemSlice,
    device: deviceInfoSlice,
    modal: modalSlice,
    auth: authReducer,
    serverMessage: messageReducer
  },
});
