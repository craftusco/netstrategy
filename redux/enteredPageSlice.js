import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const enteredPageSlice = createSlice({
  name: "animations",
  initialState,
  reducers: {
    enteredPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { enteredPage } = enteredPageSlice.actions;

export default enteredPageSlice.reducer;
