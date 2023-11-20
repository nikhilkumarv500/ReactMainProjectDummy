import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { dataService } from "../appwrite/Config";

const initialState = {
  dishes: [],
};

// const addDish = () => {
//   const promise = dataService.getRecord(userId, dishId);

//   promise.then(
//     function (response) {
//       if (response.documents.length > 0) {
//         const promise = dataService.updateRecord(
//           response.documents[0].$id,
//           dishId,
//           dishName,
//           userId,
//           quantity,
//           dishPrice,
//           url
//         );
//         // console.log("update");
//       } else {
//         dataService.addRecord(
//           ID.unique(),
//           dishId,
//           dishName,
//           userId,
//           quantity,
//           dishPrice,
//           url
//         );
//         // console.log("Create new");
//       }
//       // console.log(response.documents);
//     },
//     function (error) {
//       console.log(error);
//     }
//   );
// };

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    reduxAddDish: (state, action) => {
      const obj = action.payload;

      // try {
      //   const response = await dataService.getRecord(obj.userId, obj.dishId);

      //   if (response.documents.length > 0) {
      //     await dataService.updateRecord(
      //       response.documents[0].$id,
      //       obj.dishId,
      //       obj.dishName,
      //       obj.userId,
      //       obj.dishQuantity,
      //       obj.dishPrice,
      //       obj.dishUrl
      //     );

      //     produce(state, (draftState) => {
      //       for (let i = 0; i < draftState.dishes.length; i++) {
      //         if (
      //           draftState.dishes[i][0].userId === obj.userId &&
      //           draftState.dishes[i][0].dishId === obj.dishId
      //         ) {
      //           draftState.dishes[i][0].dishQuantity = obj.dishQuantity;
      //         }
      //       }
      //     });

      //     console.log("update");
      //   } else {
      //     await dataService.addRecord(
      //       obj.dishUniqueSlugId,
      //       obj.dishId,
      //       obj.dishName,
      //       obj.userId,
      //       obj.dishQuantity,
      //       obj.dishPrice,
      //       obj.dishUrl
      //     );

      //     produce(state, (draftState) => {
      state.dishes.push([
        {
          dishId: obj.dishId,
          dishName: obj.dishName,
          dishPrice: obj.dishPrice,
          dishQuantity: obj.dishQuantity,
          dishUniqueSlugId: obj.dishUniqueSlugId,
          dishUrl: obj.dishUrl,
          userId: obj.userId,
        },
      ]);
      console.log("added in store");
      //     });

      //     console.log("Create new");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    reduxUpdateDish: (state, action) => {
      const obj = action.payload;
      for (let i = 0; i < state.dishes.length; i++) {
        if (
          state.dishes[i][0].userId === obj.userId &&
          state.dishes[i][0].dishId === obj.dishId
        ) {
          state.dishes[i][0].dishQuantity = obj.dishQuantity;
        }
      }
      console.log("updated in store");
    },
    reduxShowDish: (state, action) => {
      console.log(state.dishes.dishes);
    },

    reduxRestoreOldDish: (state, action) => {
      state.dishes = action.payload;
      // state.dishes = state.dishes || [];
      // state.dishes = [...state.dishes, action.payload];

      // console.log("top of redicer");
      // console.log(state.dishes);

      // console.log("bottom of redicer");
    },
    reduxDeleteDish: (state, action) => {
      // console.log("payload  :" + action.payload);
      const uid = action.payload.userId;
      const uniqueSlugId = action.payload.dishUniqueSlugId;
      const newArray = [];
      // console.log("original : " + uid + " " + uniqueSlugId);
      for (let i = 0; i < state.dishes.length; i++) {
        const obj = state.dishes[i][0];
        if (!(obj.userId == uid && obj.dishUniqueSlugId == uniqueSlugId)) {
          newArray.push(state.dishes[i]);
          // console.log("galigu");
        }
        // console.log("statearray :" + obj.userId + " " + obj.dishUniqueSlugId);
      }
      state.dishes = newArray;
      // console.log("deleted in store");
    },
  },
});

export const {
  reduxAddDish,
  reduxUpdateDish,
  reduxRestoreOldDish,
  reduxShowDish,
  reduxDeleteDish,
} = dishSlice.actions;

export default dishSlice.reducer;
