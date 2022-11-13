import { createSlice } from '@reduxjs/toolkit';

// Handle login/register, etc modal status.
const initialState = {
    value: {
        login: {
            isOpen: false
        },
        register: {
            isOpen: false
        },
        myStore: {
            isOpen: false,
            item: null,
            status: 'idle'
        }
    }
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setMyStoreItemModalStatus: (state, action) => {
            state.value.myStore.isOpen = action.payload;
        },
        openMyStoreItemModal: (state, action) => {
            state.value.myStore.isOpen = true;
            state.value.myStore.item = action.payload;
        },
    }
});

export const { setMyStoreItemModalStatus, openMyStoreItemModal } = modalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getMyStoreItemModalStatus = (state) => state.modal.value.myStore.isOpen;
export const getMyStoreItemModalItem = (state) => state.modal.value.myStore.item;

export default modalSlice.reducer;
