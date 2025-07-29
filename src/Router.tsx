import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import MainPage from "./pages/MainPage";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AnimatedUI from "./components/UI/AnimatedUI";

function Router() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  return (
    <Box
      sx={{
        maxWidth: 2000,
        width: "100%",
        mx: "auto",
      }}
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <AnimatedUI isHeader={false}>
        <Footer isMobile={isMobile} />
      </AnimatedUI>
    </Box>
  );
}

export default Router;
