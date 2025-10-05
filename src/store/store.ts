import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import bookedDatesReducer from "./slices/bookedDatesSlice";
import adminReducer from "./slices/adminSlice";
import scheduleReducer from "./slices/scheduleSlice";
import snackbarReducer from "./slices/snackbarSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    bookedDates: bookedDatesReducer,
    admin: adminReducer,
    schedule: scheduleReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
