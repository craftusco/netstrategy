import { configureStore } from "@reduxjs/toolkit";
import {persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// persistReducer, 
import dataSlice from "./dataSlice";
import animationsSlice from "./animationsSlice";
import contactSlice from "./contactSlice";
import menuContactSlice from "./Menu&ContactSlice";
import customCursorSlice from "./customCursorSlice";
import listSlice from "./listSlice";
import paginationMenuSlice from "./paginationMenuSlice";
import staticDataSlice from "./staticDataSlice";
import routesSlice from "./routesSlice";
import footerDataSlice from "./footerDataSlice";
import filterSuccessesSlice from "./filterSuccessesSlice";
import formSlice from "./formSlice";
import enteredPageSlice from "./enteredPageSlice";
import thunk from 'redux-thunk';

// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, formSlice)
// const persistedRoutes = persistReducer(persistConfig, routesSlice)

export const store = configureStore({
  reducer: {
    data: dataSlice,
    animations: animationsSlice,
    contact: contactSlice,
    menuAndContact: menuContactSlice,
    customCursor: customCursorSlice,
    listSlice: listSlice, 
    paginationMenuSlice: paginationMenuSlice, 
    staticDataSlice: staticDataSlice, 
    footerDataSlice: footerDataSlice, 
    filterSuccessesSlice: filterSuccessesSlice,
    formSlice: formSlice, 
    routesSlice: routesSlice, 
    enteredPage: enteredPageSlice, 
  },
  middleware: [thunk]
});

export const persistor = persistStore(store)