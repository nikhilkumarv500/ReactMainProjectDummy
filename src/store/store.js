import { configureStore } from "@reduxjs/toolkit";
import dishSlice from "./dishSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    dish: dishSlice,
    ath: authSlice,
  },
});

export default store;
