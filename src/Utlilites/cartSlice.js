import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // FIFO: New items appear at the top
    addItems: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        // If it exists and is less than 10, increment
        if (existingItem.quantity < 10) {
          existingItem.quantity += 1;
        }
      } else {
        // If new, add to the start of the array (unshift for FIFO feel)
        // We spread the payload to add a default quantity of 1
        state.items.unshift({ ...action.payload, quantity: 1 });
      }
    },

    // Remove a specific product entirely by ID
    removeItems: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Clear the whole cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItems, removeItems, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;