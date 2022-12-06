import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'
import appContainerReducer from "../features/appContainer/appContainerSlice";

export const store = configureStore({
  reducer: {
    appContainer: appContainerReducer,
  },
});
