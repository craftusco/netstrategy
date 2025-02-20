import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "genrico",
};

export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    updateGeneric: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateGeneric } = genericSlice.actions;

export default genericSlice.reducer;
