import { configureStore } from "@reduxjs/toolkit";
import sourceReducer from "../features/sources/sourceSlice";
import proxyReducer from "../features/connections/proxy/proxySlice";

export const store = configureStore({
  reducer: {
    source: sourceReducer,
    proxy: proxyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
