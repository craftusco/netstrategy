import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const customCursorSlice = createSlice({
  name: "customCursor",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeColor } = customCursorSlice.actions;

export default customCursorSlice.reducer;
