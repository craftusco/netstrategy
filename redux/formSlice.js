import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    data:{}
,}
};

export const formSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.value.data = typeof action.payload.data != 'undefined' ? action.payload.data : state.value.data;
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;
