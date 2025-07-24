import {
  AppBar,
  Box,
  Toolbar,
  Stack,
  Button,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { sections } from "../../../constants/sections";
import useHeader from "../../../hooks/useHeader";
import { ReactComponent as Logo } from "../../../assets/logo/logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import HeaderImage from "../../../assets/background/header2.jpg";
import { RefObject } from "react";

type HeaderProps = {
  isMobile: boolean;
  isTablet: boolean;
  headerRef: RefObject<HTMLDivElement | null>;
};
export default function Header({ isMobile, isTablet, headerRef }: HeaderProps) {
  const { menuOpen, setMenuOpen, handleSectionClick, isFixed, menuRef } =
    useHeader(headerRef);
  const theme = useTheme();

  return (
    <>
      <motion.div
        ref={headerRef}
        id="intro"
        style={{
          height: 500,
          backgroundImage: `url(${HeaderImage})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          width: "100%",
          display: "block",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          minHeight: 0,
          zIndex: 1100,
          boxShadow: "inset 0 -4px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AppBar
          sx={{
            top: 0,
            width: "100%",
            backgroundColor: "transparent",
            boxShadow: "none",
            zIndex: 3,
          }}
        >
          <Box
            component={motion.div}
            animate={{
              boxShadow: isFixed
                ? "0px 4px 16px rgba(0,0,0,0.1)"
                : "0px 0px 0px rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.2 }}
            sx={{
              height: 64,
              width: "100%",
              overflow: "hidden",
              zIndex: 1099,
            }}
          >
            <motion.div
              animate={{ opacity: isFixed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
              }}
            />

            <motion.div
              animate={{
                opacity: isFixed ? 1 : 0,
              }}
              transition={{ duration: 0.1 }}
              style={{
                backgroundColor: theme.palette.custom.sectionHeader,
                position: "absolute",
                inset: 0,
                zIndex: 0,
              }}
            />

            <Toolbar
              sx={{
                position: "relative",
                zIndex: 2,
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                px: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: isTablet ? 0 : 1,
                }}
              >
                <Button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  color="inherit"
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    borderRadius: "50%",
                    minWidth: 50,
                    width: 50,
                    height: 50,
                    p: 0,
                  }}
                >
                  <Logo width={40} height={40} />
                </Button>

                <Link
                  href="/"
                  underline="none"
                  sx={{
                    color: theme.palette.text.primary,
                    cursor: "pointer",
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    fontSize: isTablet ? "1rem !important" : "1.2rem",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: '"Aclonica", sans-serif', lineHeight: 1 }}
                  >
                    eyelash
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Aclonica", sans-serif',
                      fontSize: "0.75rem",
                      mt: -0.5,
                    }}
                  >
                    aesthetics
                  </Typography>
                </Link>
              </Box>

              <IconButton
                edge="end"
                onClick={() => setMenuOpen(!menuOpen)}
                sx={{ color: theme.palette.text.primary, mt: 0.5 }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Box>
        </AppBar>
        <AnimatePresence mode="wait">
          {!isFixed && (
            <motion.div
              key="slogan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "rgba(20, 20, 20, 0.8)",
                padding: "0 8px",
                pointerEvents: "none",
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 500, fontSize: 40 }}>
                Современный уход
              </Typography>
              <Typography variant="subtitle1" sx={{ my: 1, fontSize: 20 }}>
                Аккуратное наращивание и ламинирование ресниц
              </Typography>
              <Button
                onClick={() => {
                  const el = document.getElementById("contacts");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                variant="contained"
                sx={{
                  pointerEvents: "auto",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  color: "#000",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  textTransform: "none",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    boxShadow: "0 4px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Записаться
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 64,
              right: 0,
              width: "fit-content",
              backgroundColor: "none",
              zIndex: 1100,
            }}
          >
            <Stack direction="column" py={2} px={3} alignItems="flex-end">
              {sections.map(({ id, label }, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Button
                    onClick={() => {
                      handleSectionClick(id);
                      setMenuOpen(false);
                    }}
                    sx={{
                      backgroundColor: "rgba(254, 211, 230, 0.6)",
                      color: "#000",
                      textTransform: "none",
                      fontSize: "1rem",
                      justifyContent: "flex-end",
                      borderRadius: 2,
                      px: 2,
                      mb: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(254, 211, 230, 0.8)",
                        transform: "translateX(-6px)",
                      },
                    }}
                  >
                    {label}
                  </Button>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
