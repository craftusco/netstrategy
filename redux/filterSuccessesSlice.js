import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    query: null,
    pagination: 6,
    entry_value: 6,
    total: false,
    total_values: 0,
    total_categories: [],
    // type: '',
  },
};

export const filterSuccessesSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateSuccessSelected: (state, action) => {
      state.value.pagination = typeof action.payload.pagination != 'undefined' ? action.payload.pagination : state.value.pagination;
      state.value.total = typeof action.payload.total != 'undefined' ? action.payload.total : state.value.total;
      state.value.query = typeof action.payload.query != 'undefined' ? action.payload.query : state.value.query;
      state.value.total_values = typeof action.payload.total_values != 'undefined' ? action.payload.total_values : state.value.total_values;
      state.value.total_categories = typeof action.payload.total_categories != 'undefined' ? action.payload.total_categories : state.value.total_categories;
      // state.value.type = typeof action.payload.type != 'undefined' ? action.payload.type : state.value.type;
    },
  },
});

export const { updateSuccessSelected } = filterSuccessesSlice.actions;

export default filterSuccessesSlice.reducer;
