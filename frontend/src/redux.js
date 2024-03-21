import { createSlice } from "@reduxjs/toolkit";

export const redux = createSlice({
   name: "redux",
   initialState: {
      module: {},
      socketServer: "ws://localhost:8888/",
   },
   reducers: {
      setModule: (state, { payload } = action) => {
         state.module = payload;
      },
   },
});
export const { setModule } = redux.actions;
export default redux.reducer;
