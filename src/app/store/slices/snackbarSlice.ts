import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarStatus } from "../../../shared/types/snackbar/SnackbarStatus";

const initialState: SnackbarStatus = {
  message: "",
  severity: null,
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarStatus>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = action.payload.open;
    },
    closeSnackbar: (state) => {
      state.message = "";
      state.severity = null;
      state.open = false;
    },
  },
});

export const { setSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
