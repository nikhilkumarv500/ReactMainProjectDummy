import { configureStore } from "@reduxjs/toolkit";
import dishSlice from "./dishSlice";

const store = configureStore({
  reducer: {
    dish: dishSlice,
  },
});

export default store;
