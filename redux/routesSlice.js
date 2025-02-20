import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  value: {
    data: {
      paths: [],
      time: null,
    },
  },
};

export const routesSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateRoutes: (state, action) => {
      
      const prev_index = state.value.data.paths.length - 1;
      
      if(prev_index > -1){
        state.value.data.paths[prev_index].time_end = moment().format('YYYY-MM-DD H:mm:ss');
      }

      if( typeof action.payload.path != 'undefined'){
        state.value.data.paths.push(action.payload.path)
      }
      
      if( typeof action.payload.time != 'undefined' && state.value.data.time == null)
        state.value.data.time = action.payload.time
      
    },
  },
});

export const { updateRoutes } = routesSlice.actions;

export default routesSlice.reducer;
