import { Box, useMediaQuery, useTheme } from "@mui/material";
import Services from "../../components/Services";
import Stats from "../../components/Stats";
import Contacts from "../../components/Contacts";
import AnimatedSection from "../../components/UI/AnimatedSection";
import Header from "../../components/UI/Header";
import AnimatedUI from "../../components/UI/AnimatedUI";
import SectionNavigator from "../../components/UI/SectionNavigator";
import { useRef } from "react";
import Welcome from "../../components/Welcome";
import Faq from "../../components/Faq";

function MainPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const headerRef = useRef<HTMLDivElement>(null);

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
