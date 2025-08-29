import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface BookedDate {
  date: string;
  time: string;
  service: string;
}

export const loadBookedDates = createAsyncThunk(
  "bookedDates/load",
  async () => {
    const res = await fetch(
      `https://eyelash-aesthetics-api-080x.onrender.com/bookedDates`
    );
    const data = await res.json();
    return data.map(
      (item: { date: string; time: string; service: string }) => item
    );
  }
);

export const deleteOutdatedBookings = createAsyncThunk(
  "bookedDates/deleteOutdated",
  async (_, { dispatch }) => {
    const response = await fetch(
      "https://eyelash-aesthetics-api.onrender.com/bookedDates"
    );
    const bookedData = await response.json();

    const todayStr = format(new Date(), "yyyy-MM-dd");

    for (const booking of bookedData) {
      if (booking.date < todayStr) {
        await fetch(
          `https://eyelash-aesthetics-api-080x.onrender.com/bookedDates/${booking.id}`,
          {
            method: "DELETE",
          }
        );
      }
    }

    await dispatch(loadBookedDates());

    return true;
  }
);

const bookedDatesSlice = createSlice({
  name: "bookedDates",
  initialState: [] as BookedDate[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBookedDates.fulfilled, (_, action) => action.payload)
      .addCase(deleteOutdatedBookings.fulfilled, (state) => state);
  },
});

export default bookedDatesSlice.reducer;
