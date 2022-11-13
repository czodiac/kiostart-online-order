import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const serverResponseMessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setServerResponseMessage: (state, action) => {
      return { message: action.payload };
    }
  },
});

const { reducer, actions } = serverResponseMessageSlice;

export const { setServerResponseMessage } = actions
export default reducer;