import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    menu: null,
    static_data: null,
  },
};

export const footerDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateFooterData: (state, action) => {
      state.value.menu = typeof action.payload.menu != 'undefined' ? action.payload.menu : state.value.menu;
      state.value.static_data = typeof action.payload.static_data != 'undefined' ? action.payload.static_data : state.value.static_data;
    },
  },
});

export const { updateFooterData } = footerDataSlice.actions;

export default footerDataSlice.reducer;
