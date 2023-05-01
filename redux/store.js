import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import dashboardSlice from "./dashboard/dashboardSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
