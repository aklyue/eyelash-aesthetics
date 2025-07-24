import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import bookedDatesReducer from "./slices/bookedDatesSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    bookedDates: bookedDatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
