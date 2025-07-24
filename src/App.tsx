import { useEffect, useMemo } from "react";
import Router from "./Router";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useAppSelector } from "./store/hooks";
import { getTheme } from "./theme";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            transition: "background-color 0.2s ease, color 0.2s ease",
            backgroundColor: theme.palette.custom.sectionLight,
          },
          "*": {
            transition:
              "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
          },
          ".MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#ccc !important",
          },
          ".Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "rgba(85, 85, 85, 0.8) !important",
          },
          ".MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline":
            {
              borderColor: "#999 !important",
            },
        }}
      />
      <Router />
    </ThemeProvider>
  );
}

export default App;
