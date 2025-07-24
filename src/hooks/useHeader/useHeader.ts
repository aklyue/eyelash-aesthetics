import { RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHeader = (headerRef: RefObject<HTMLDivElement | null>) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;

        const shouldFix = window.scrollY > headerHeight - 64;

        setIsFixed(shouldFix);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef]);

  const handleSectionClick = (id: string) => {
    if (!headerRef) return;
    const el = document.getElementById(id);

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 20;

      window.scrollTo({ top, behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return {
    navigate,
    menuOpen,
    setMenuOpen,
    handleSectionClick,
    isFixed,
    menuRef,
  };
};
