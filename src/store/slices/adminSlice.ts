import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isAdmin: boolean;
  password: string;
  error: string | null;
}

const initialState: AdminState = {
  isAdmin: false,
  password: localStorage.getItem("adminPassword") || "",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    loginSuccess(state) {
      state.isAdmin = true;
      state.error = null;
    },
    loginError(state, action: PayloadAction<string>) {
      state.isAdmin = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAdmin = false;
      state.password = "";
      state.error = null;
    },
  },
});

export const { setPassword, loginSuccess, loginError, logout } =
  adminSlice.actions;
export default adminSlice.reducer;