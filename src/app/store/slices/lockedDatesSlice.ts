import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_URL = process.env.REACT_APP_API_URL;

export interface LockedDate {
  id: string;
  date: string;
  reason?: string;
}

export const loadLockedDates = createAsyncThunk(
  "lockedDates/load",
  async () => {
    const res = await fetch(`${API_URL}/lockedDates`);
    const data = await res.json();
    return data.map(
      (item: { id: string; date: string; reason?: string }) => item,
    );
  },
);

export const addLockedDate = createAsyncThunk(
  "lockedDates/add",
  async ({
    data,
    password,
  }: {
    data: Omit<LockedDate, "id">;
    password: string;
  }) => {
    const res = await fetch(`${API_URL}/admin/lockedDates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, password }),
    });
    if (!res.ok) throw new Error("Unauthorized or server error");
    return (await res.json()) as LockedDate;
  },
);

export const deleteLockedDate = createAsyncThunk(
  "lockedDates/delete",
  async ({ id, password }: { id: string; password: string }) => {
    const res = await fetch(`${API_URL}/admin/lockedDates/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw new Error("Failed to delete");
    return id;
  },
);

const lockedDatesSlice = createSlice({
  name: "lockedDates",
  initialState: [] as LockedDate[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLockedDates.fulfilled, (_, action) => action.payload)
      .addCase(deleteLockedDate.fulfilled, (state, action) => {
        return state.filter((date) => date.id !== action.payload);
      })
      .addCase(addLockedDate.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default lockedDatesSlice.reducer;
