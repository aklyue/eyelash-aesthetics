import {
  IconButton,
  Stack,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionNavigation } from "../../hooks";

interface SectionNavigatorProps {
  headerRef: React.RefObject<HTMLDivElement | null>;
}

function SectionNavigator({ headerRef }: SectionNavigatorProps) {
  const { next, prev, scrollUp, scrollDown } = useSectionNavigation({
    headerRef,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getTypography = (text: string) => (
    <Typography variant="caption" component="span" sx={{ m: 0, color: "#000" }}>
      {text}
    </Typography>
  );

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        bottom: 0,
        zIndex: 1101,
        p: 1,
        borderRadius: 2,
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Box
          sx={{
            height: 20,
            overflow: "hidden",
            width: 100,
            position: "relative",
          }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={prev}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
              }}
            >
              {getTypography(prev)}
            </motion.div>
          </AnimatePresence>
        </Box>

        <IconButton
          onClick={scrollUp}
          aria-label="scroll up"
          disabled={prev === "⠀"}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "#fff",
            "&:hover": {
              backgroundColor: isMobile
                ? "rgba(0, 0, 0, 0.4)"
                : "rgba(0, 0, 0, 0.6)",
            },
            "&.Mui-disabled": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
            width: 48,
            height: 48,
            borderRadius: "50%",
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>

        <IconButton
          onClick={scrollDown}
          aria-label="scroll down"
          disabled={next === "⠀"}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "#fff",
            "&:hover": {
              backgroundColor: isMobile
                ? "rgba(0, 0, 0, 0.4)"
                : "rgba(0, 0, 0, 0.6)",
            },
            "&.Mui-disabled": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
            width: 48,
            height: 48,
            borderRadius: "50%",
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>

        <Box
          sx={{
            height: 20,
            overflow: "hidden",
            width: 100,
            position: "relative",
          }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={next}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
              }}
            >
              {getTypography(next)}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Stack>
    </Box>
  );
}

export default SectionNavigator;
