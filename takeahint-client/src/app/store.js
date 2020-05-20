import applicationReducer from "./reduser";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    application: applicationReducer
  }
});
