import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BookedDate {
  date: string;
  time: string;
  service: string;
}

export const loadBookedDates = createAsyncThunk(
  "bookedDates/load",
  async () => {
    const res = await fetch(`https://eyelash-aesthetics-api.onrender.com/bookedDates`);
    const data = await res.json();
    return data.map(
      (item: { date: string; time: string; service: string }) => item
    );
  }
);

const bookedDatesSlice = createSlice({
  name: "bookedDates",
  initialState: [] as BookedDate[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBookedDates.fulfilled, (_, action) => action.payload);
  },
});

export default bookedDatesSlice.reducer;
