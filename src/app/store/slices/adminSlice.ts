import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isAdmin: boolean;
  password: string;
  error: string | null;
  isCheckingAuth: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
  password: localStorage.getItem("adminPassword") || "",
  error: null,
  isCheckingAuth: true,
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
      state.isCheckingAuth = false;
    },
    loginError(state, action: PayloadAction<string>) {
      state.isAdmin = false;
      state.error = action.payload;
      state.isCheckingAuth = false;
    },
    logout(state) {
      state.isAdmin = false;
      state.password = "";
      state.error = null;
      state.isCheckingAuth = false;
      localStorage.removeItem("adminPassword");
    },
    setCheckingAuth(state, action: PayloadAction<boolean>) {
      state.isCheckingAuth = action.payload;
    },
  },
});

export const {
  setPassword,
  loginSuccess,
  loginError,
  logout,
  setCheckingAuth,
} = adminSlice.actions;
export default adminSlice.reducer;
