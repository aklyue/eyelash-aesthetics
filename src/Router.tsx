import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import MainPage from "./pages/MainPage";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AnimatedUI from "./components/UI/AnimatedUI";
import AdminPage from "./pages/AdminPage";

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
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <AnimatedUI isHeader={false}>
        <Footer isMobile={isMobile} />
      </AnimatedUI>
    </Box>
  );
}

export default Router;
