import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { rules } from "../../constants/schedule";

export interface Rule {
  startHour: number;
  allowed: string[] | "all";
}

export type WeekRules = Record<number, Rule>;
export type Schedule = Record<number, WeekRules>;

interface ScheduleState {
  data: Schedule;
  status: "idle" | "loading" | "failed";
}

export const fetchSchedule = createAsyncThunk(
  "schedule/fetchSchedule",
  async () => {
    try {
      const res = await fetch("https://eyelash-aesthetics-api.onrender.com/schedule");
      if (!res.ok) throw new Error("Failed to fetch schedule");
      return (await res.json()) as Schedule;
    } catch (e) {
      console.error("Failed to fetch schedule, using default rules:", e);
      return rules;
    }
  }
);

const initialState: ScheduleState = {
  data: rules,
  status: "idle",
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    updateSchedule: (state, action: PayloadAction<Schedule>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
