import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        incrementCartCount: (state, action) => {
            state.count += action.payload;
        },
        decrementCartCount: (state, action) => {
            state.count -= action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item !== action.payload);
        }
    },
});

// Add selector
export const selectCartCount = (state) => state.cart.count;
export const selectCartItems = (state) => state.cart.items;

export const { incrementCartCount, decrementCartCount, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
