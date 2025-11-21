import { RefObject, useEffect, useRef, useState } from "react";
import { sections } from "../../../../../shared/constants";

interface useSectionNavigationProps {
  headerRef: RefObject<HTMLElement | null>;
}

export const useSectionNavigation = ({
  headerRef,
}: useSectionNavigationProps) => {
  const hasTriggeredHeaderCollapse = useRef(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const getCurrentSectionIndex = () => {
    const threshold = window.innerHeight * 0.4;

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= threshold && rect.bottom > threshold) {
        return i;
      }
    }

    return 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        hasTriggeredHeaderCollapse.current = false;
      }

      const index = getCurrentSectionIndex();
      setCurrentSectionIndex(index);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const id = sections[index]?.id;
    const el = document.getElementById(id);

    if (el) {
      const rectTop = el.getBoundingClientRect().top + window.scrollY;
      const top = rectTop - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollUp = () => {
    if (currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1);
    }
  };

  const scrollDown = () => {
    if (currentSectionIndex < sections.length - 1) {
      scrollToSection(currentSectionIndex + 1);
    }
  };

  const prev = sections[currentSectionIndex - 1]?.label || "⠀";
  const next = sections[currentSectionIndex + 1]?.label || "⠀";
  return { next, prev, scrollUp, scrollDown };
};
