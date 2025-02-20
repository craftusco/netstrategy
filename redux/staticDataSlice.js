import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const staticDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateStaticData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateStaticData } = staticDataSlice.actions;

export default staticDataSlice.reducer;
