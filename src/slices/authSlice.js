import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setServerResponseMessage } from "./serverResponseMessageSlice";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const registerAsync = createAsyncThunk(
  "auth/register",
  // thunkAPI: an object containing all of the parameters that are normally passed to a Redux thunk function, as well as additional options.
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setServerResponseMessage(response.data.message));
      return response.data;
    } catch (err) {
      const responseMessage =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      thunkAPI.dispatch(setServerResponseMessage(responseMessage));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (err) {
      const responseMessage =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString();
      thunkAPI.dispatch(setServerResponseMessage(responseMessage));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerAsync.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerAsync.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [loginAsync.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logoutAsync.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const getAuth = (state) => state.auth;
const { reducer } = authSlice;
export default reducer;
