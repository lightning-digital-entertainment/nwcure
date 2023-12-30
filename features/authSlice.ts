import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  sk: string;
}

const initialState: AuthState = {
  sk: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.sk = action.payload;
    },
  },
});

export const { logIn } = authSlice.actions;

export default authSlice.reducer;
