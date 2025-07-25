import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import Services from "../../components/Services";
import Stats from "../../components/Stats";
import Contacts from "../../components/Contacts";
import AnimatedSection from "../../components/UI/AnimatedSection";
import Header from "../../components/UI/Header";
import AnimatedUI from "../../components/UI/AnimatedUI";
import SectionNavigator from "../../components/UI/SectionNavigator";
import { useRef, useEffect, useState } from "react";
import Welcome from "../../components/Welcome";
import Faq from "../../components/Faq";

function MainPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const headerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

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
          backgroundColor: theme.palette.background.default || "#fff",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
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
        <Contacts />
      </AnimatedSection>
      <AnimatedSection index={5}>
        <Faq />
      </AnimatedSection>
    </Box>
  );
}

export default MainPage;
