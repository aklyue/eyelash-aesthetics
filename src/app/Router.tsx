import { Routes, Route } from "react-router-dom";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import MainPage from "../pages/MainPage";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AnimatedUI from "../shared/components/AnimatedUI";
import AdminPage from "../pages/AdminPage";
import { useAppSelector } from "./store/hooks";

function Router() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const { isCheckingAuth } = useAppSelector((state) => state.admin);

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
