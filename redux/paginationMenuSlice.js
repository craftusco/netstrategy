import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    pagination: 5,
    entry_value: 5,
    total: false,
  },
};

export const paginationMenuSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.value.pagination = typeof action.payload.pagination != 'undefined' ? action.payload.pagination : state.value.pagination;
      state.value.total = typeof action.payload.total != 'undefined' ? action.payload.total : state.value.total;
    },
  },
});

export const { updatePagination } = paginationMenuSlice.actions;

export default paginationMenuSlice.reducer;
