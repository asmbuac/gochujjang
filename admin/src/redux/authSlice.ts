import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

type UserType = User & { token: string };

interface AuthState {
  currentUser: null | UserType;
  isFetching: boolean;
  error: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<UserType>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: () => initialState,
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
