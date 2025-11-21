import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef } from "react";
import SectionNavigator from "./components/SectionNavigator";
import AnimatedUI from "../../../shared/components/AnimatedUI";
import Header from "../../../widgets/Header";
import AnimatedSection from "../../../shared/components/AnimatedSection";
import Welcome from "../blocks/components/Welcome";
import Services from "../blocks/components/Services";
import Stats from "../blocks/components/Stats";
import ScheduleMobile from "../../admin/blocks/components/ScheduleMobile";
import Faq from "../blocks/components/Faq";
import { useLoader } from "../../../shared/hooks";
import Schedule from "../blocks/components/Schedule";
import Contacts from "../blocks/components/Contacts";

function Landing() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const headerRef = useRef<HTMLDivElement>(null);

  const loading = useLoader();

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          zIndex: 9999,
        }}
      >
        <CircularProgress sx={{ color: theme.palette.text.primary }} />
      </Box>
    );
  }

  return (
    <Box>
      <SectionNavigator headerRef={headerRef} />
      <AnimatedUI isHeader={true}>
        <Header isMobile={isMobile} isTablet={isTablet} headerRef={headerRef} />
      </AnimatedUI>
      <AnimatedSection index={1}>
        <Welcome />
      </AnimatedSection>
      <AnimatedSection index={2}>
        <Services />
      </AnimatedSection>
      <AnimatedSection index={3}>
        <Stats />
      </AnimatedSection>
      <AnimatedSection index={4}>
        {isMobile ? <ScheduleMobile /> : <Schedule />}
      </AnimatedSection>
      <AnimatedSection index={5}>
        <Contacts />
      </AnimatedSection>
      <AnimatedSection index={6}>
        <Faq />
      </AnimatedSection>
    </Box>
  );
}

export default Landing;
