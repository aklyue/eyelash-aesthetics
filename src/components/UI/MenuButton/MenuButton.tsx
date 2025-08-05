import React, { RefObject } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface MenuButtonProps {
  open: boolean;
  toggle: () => void;
  ref: RefObject<HTMLButtonElement | null>;
}

function MenuButton({ open, toggle, ref }: MenuButtonProps) {
  const theme = useTheme();

  const lineProps = {
    transition: { duration: 0.2 },
    stroke: theme.palette.text.primary,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
  };

  return (
    <IconButton
      ref={ref}
      onClick={toggle}
      sx={{
        width: 40,
        height: 40,
      }}
    >
      <Box component="svg" width="24" height="24" viewBox="0 0 24 24">
        <motion.line
          initial={{ x1: 3, x2: 21, y1: 6, y2: 6 }}
          animate={
            open
              ? { x1: 6, x2: 18, y1: 6, y2: 18 }
              : { x1: 3, x2: 21, y1: 6, y2: 6 }
          }
          {...lineProps}
        />
        <motion.line
          initial={{ x1: 3, x2: 21, y1: 12, y2: 12 }}
          animate={
            open
              ? { x1: 6, x2: 6, y1: 12, y2: 12, strokeWidth: 0 }
              : { x1: 3, x2: 21, y1: 12, y2: 12, strokeWidth: 2 }
          }
          {...lineProps}
        />
        <motion.line
          initial={{ x1: 3, x2: 21, y1: 18, y2: 18 }}
          animate={
            open
              ? { x1: 6, x2: 18, y1: 18, y2: 6 }
              : { x1: 3, x2: 21, y1: 18, y2: 18 }
          }
          {...lineProps}
        />
      </Box>
    </IconButton>
  );
}

export default MenuButton;
