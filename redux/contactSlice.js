import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    parent: `New Project`,
    title: `Let's work!`,
    paragraph: `Want to work with our team? 
    Who wouldn’t? What kind of dream project 
    can we make a reality?`,
    subpills: [
      "Web Marketing",
      "Comunicazione",
      "Website",
      "Social",
      "CRM",
      "Inbound Marketing",
    ],
  },
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContactData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateContactData } = contactSlice.actions;

export default contactSlice.reducer;
