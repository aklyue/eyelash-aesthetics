import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import Services from "../../components/Services";
import Stats from "../../components/Stats";
import Contacts from "../../components/Contacts";
import AnimatedSection from "../../components/UI/AnimatedSection";
import Header from "../../components/UI/Header";
import AnimatedUI from "../../components/UI/AnimatedUI";
import SectionNavigator from "../../components/UI/SectionNavigator";
import { useEffect, useRef, useState } from "react";
import Welcome from "../../components/Welcome";
import Faq from "../../components/Faq";

function MainPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const headerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    const total = images.length;
    let loaded = 0;

    if (total === 0) {
      setLoading(false);
      return;
    }

    const handleImageLoad = () => {
      loaded++;
      if (loaded === total) {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
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
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
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
