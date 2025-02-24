import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "before store update",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateData } = dataSlice.actions;

export default dataSlice.reducer;
