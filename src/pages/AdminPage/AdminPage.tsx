import React from "react";
import { Box } from "@mui/material";
import AdminPanel from "../../components/AdminPanel";
import AnimatedSection from "../../components/UI/AnimatedSection";

function AdminPage() {
  return (
    <Box sx={{ height: "100%" }}>
      <AnimatedSection index={1}>
        <AdminPanel />
      </AnimatedSection>
    </Box>
  );
}

export default AdminPage;
