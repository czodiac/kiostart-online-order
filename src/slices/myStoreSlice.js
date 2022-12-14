import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMyStore } from '../services/myStore.service';

const initialState = {
    value: '',
    status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getMyStoreAsync = createAsyncThunk(
    'myStore/fetchStore',
    async () => {
        const response = await fetchMyStore();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const myStoreSlice = createSlice({
    name: 'myStore',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getMyStoreAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyStoreAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            });
    },
});

// Add selector
export const selectMyStore = (state) => state.myStore.value;

export default myStoreSlice.reducer;
