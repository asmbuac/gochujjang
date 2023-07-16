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
      const { _id, quantity, price } = action.payload;

      if (!(_id in state.indices)) {
        state.indices[_id] = state.products.length;
        state.products.push(action.payload);
      } else {
        const index = state.indices[_id];
        state.products[index].quantity += quantity;
      }

      state.quantity += quantity;
      state.total += price * quantity;
    },
    removeProduct: (state, action) => {
      const { _id, quantity, price } = action.payload;
      const index = state.indices[_id];
      const product = state.products[index];

      if (product.quantity === 1 || quantity === product.quantity) {
        if (state.products.length > 1) {
          const lastProduct = state.products.at(-1);
          state.indices[lastProduct._id] = index;
          state.products[index] = lastProduct;
        }
        delete state.indices[_id];
        state.products.pop();
        state.quantity -= quantity > 1 ? quantity : 1;
        state.total -= price * quantity;
      } else {
        product.quantity -= quantity;
        state.quantity -= quantity;
        state.total -= price * quantity;
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
