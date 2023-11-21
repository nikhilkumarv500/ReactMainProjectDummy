import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { dataService } from "../appwrite/Config";

const initialState = {
  gmail: "",
  name: "",
  password: "",
};

export const authSlice = createSlice({
  name: "ath",
  initialState,
  reducers: {
    reduxAddAuth: (state, action) => {
      state.gmail = action.payload.gmail;
      state.name = action.payload.name;
      state.password = action.payload.password;
      console.log("sotre :" + JSON.stringify(action.payload));
    },
    reduxDeleteAuth: (state, action) => {
      state.gmail = "";
      state.name = "";
      state.password = "";
    },
    reduxShowAuth: (state, action) => {
      console.log("from store");
      console.log(state.gmail);
      console.log(state.name);
      console.log(state.password);
    },
    reduxUpdateDish: (state, action) => {
      const obj = action.payload;
      // console.log(obj)
      for (let i = 0; i < state.dishes.length; i++) {
        if (
          state.dishes[i][0].userId === obj.userId &&
          state.dishes[i][0].dishId === obj.dishId
        ) {
          state.dishes[i][0].dishQuantity = obj.dishQuantity;
        }
      }
      // console.log("updated in store");
    },
  },
});

export const { reduxAddAuth, reduxDeleteAuth, reduxShowAuth } =
  authSlice.actions;

export default authSlice.reducer;
