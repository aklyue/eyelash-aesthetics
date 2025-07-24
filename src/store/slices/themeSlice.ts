// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ThemeState {
//   mode: "light" | "dark";
// }

// const getInitialMode = (): "light" | "dark" => {
//   const saved = localStorage.getItem("themeMode");
//   return saved === "dark" ? "dark" : "light";
// };

// const initialState: ThemeState = {
//   mode: getInitialMode(),
// };

// const themeSlice = createSlice({
//   name: "theme",
//   initialState,
//   reducers: {
//     toggle: (state) => {
//       const newMode = state.mode === "light" ? "dark" : "light";
//       state.mode = newMode;
//       localStorage.setItem("themeMode", newMode);
//     },
//     setTheme: (state, action: PayloadAction<"light" | "dark">) => {
//       state.mode = action.payload;
//       localStorage.setItem("themeMode", action.payload);
//     },
//   },
// });

// export const { toggle, setTheme } = themeSlice.actions;

// export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light";
}

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Пока не нужны, но оставлены для возможного будущего включения
    toggle: (state) => {
      state.mode = "light";
    },
    setTheme: (state) => {
      state.mode = "light";
    },
  },
});

export const { toggle, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
