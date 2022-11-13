import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const serverResponseMessageSlice = createSlice({
  name: "serverMessage",
  initialState,
  reducers: {
    setServerResponseMessage: (state, action) => {
      return { serverMessage: action.payload };
    }
  },
});

const { reducer, actions } = serverResponseMessageSlice;
export const getServerResponseMessage = (state) => state.serverMessage;
export const { setServerResponseMessage } = actions;
export default reducer;