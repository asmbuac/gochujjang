import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    indices: {},
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if (!(action.payload._id in state.indices)) {
        state.indices[action.payload._id] = state.products.length;
        state.products.push(action.payload);
      } else {
        const index = state.indices[action.payload._id];
        state.products[index].quantity += action.payload.quantity;
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
