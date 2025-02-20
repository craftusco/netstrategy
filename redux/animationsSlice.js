import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    link: '',
    img: '',
    url: '',
  },
};

export const animationsSlice = createSlice({
  name: "animations",
  initialState,
  reducers: {
    redScreenLoader: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { redScreenLoader } = animationsSlice.actions;

export default animationsSlice.reducer;
