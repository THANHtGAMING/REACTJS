import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../components/cautrucdata";

const loadCart = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: loadCart()
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        item.so_luong += 1;
      } else {
        state.items.push({ ...action.payload, so_luong: 1 });
      }

      saveCart(state.items);
    },

    increase: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.so_luong += 1;

      saveCart(state.items);
    },

    decrease: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.so_luong > 1) item.so_luong -= 1;

      saveCart(state.items);
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    }

  }
});

export const { addToCart, increase, decrease, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;