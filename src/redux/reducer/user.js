import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  loading: true,
  error: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.user = action.payload;
    state.isLogin = true;
    state.loading = false;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isLogin = false;
  },
});
