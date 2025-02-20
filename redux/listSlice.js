import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "grid",
};

export const listSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateData } = listSlice.actions;

export default listSlice.reducer;
