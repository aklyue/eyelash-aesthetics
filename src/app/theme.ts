import { createTheme, PaletteMode } from "@mui/material";
import { commonTypography } from "../shared/constants/typography";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#050d1e" : "#F8F6F7",
        paper: mode === "dark" ? "#1e1e1e" : "#F8EFF4",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "rgba(20, 20, 20, 0.8)",
        secondary: mode === "dark" ? "#ccc" : "#7c7c7c",
      },
      customText: {
        onDark: "#000",
        dimmed: mode === "dark" ? "#797979ff" : "#ccc",
      },
      custom: {
        sectionLight: mode === "dark" ? "#1e1e1e" : "#F8F6F7",
        sectionLightCard: mode === "dark" ? "#290d0dff" : "#F8EFF4",
        sectionDark: mode === "dark" ? "#121212ff" : "#FFF0F5",
        sectionButtonHover: mode === "dark" ? "#2a2a2a" : "#142a58ff",
        sectionHeader: "#F8F6F7",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#999",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(85, 85, 85, 0.8)",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: "rgba(85, 85, 85, 0.8)",
            },
            "&.Mui-disabled": {
              color: "rgba(185, 185, 185, 0.8)",
            },
          },
        },
      },
      MuiPickersOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiPickersOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "&:hover .MuiPickersOutlinedInput-notchedOutline": {
              borderColor: "#999",
            },
            "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
              borderColor: "rgba(85, 85, 85, 0.8)",
            },
          },
        },
      },
      MuiPickersInputBase: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: "rgba(85, 85, 85, 0.8)",
            },
          },
        },
      },
    },
    typography: commonTypography,
  });
