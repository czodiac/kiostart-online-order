import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        status: false,
        item: null
    },
    status: 'idle',
};

export const myStoreItemModalSlice = createSlice({
    name: 'myStoreItemModal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setMyStoreItemModalStatus: (state, action) => {
            state.value.status = action.payload;
        },
        openMyStoreItemModal: (state, action) => {
            state.value.status = true;
            state.value.item = action.payload;
        },
    }
});

export const { setMyStoreItemModalStatus, openMyStoreItemModal } = myStoreItemModalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getMyStoreItemModalStatus = (state) => state.myStoreItemModal.value.status;
export const getMyStoreItemModalItem = (state) => state.myStoreItemModal.value.item;

export default myStoreItemModalSlice.reducer;
