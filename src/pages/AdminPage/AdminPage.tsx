import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import AdminPanel from "../../components/AdminPanel";
import AnimatedSection from "../../components/UI/AnimatedSection";
import { useAppSelector } from "../../store/hooks";

function AdminPage() {
  const { isCheckingAuth } = useAppSelector((state) => state.admin);
  const theme = useTheme();
  
  return (
    <Box sx={{ height: "100%" }}>
      {isCheckingAuth && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100dvh",
            backgroundColor: theme.palette.background.default,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress sx={{ color: theme.palette.text.primary }} />
        </Box>
      )}
      <AnimatedSection index={1}>
        <AdminPanel />
      </AnimatedSection>
    </Box>
  );
}

export default AdminPage;
