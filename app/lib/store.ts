import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./authSlice";
import  binhLuanReducer  from "./binhluanslice";
import cartReducer from "./cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    binhluan: binhLuanReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;