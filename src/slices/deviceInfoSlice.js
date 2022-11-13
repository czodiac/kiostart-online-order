import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'Desktop',
    status: 'idle',
};

export const deviceInfoSlice = createSlice({
    name: 'device',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDevice: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { setDevice } = deviceInfoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getDevice = (state) => state.device.value;

export default deviceInfoSlice.reducer;
