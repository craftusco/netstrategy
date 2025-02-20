import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    menu: {
      fade: false,
      mount: false,
      closeMenu: null,
      white: false,
    },
    contact: {
      fade: false,
      closeContact: null,
    },
  },
};

export const menuAndContactSlice = createSlice({
  name: "menu&contact",
  initialState,
  reducers: {
    menuAndContact: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { menuAndContact } = menuAndContactSlice.actions;

export default menuAndContactSlice.reducer;
