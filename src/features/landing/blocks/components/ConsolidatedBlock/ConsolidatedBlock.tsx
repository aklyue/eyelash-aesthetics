import Welcome from "../Welcome";
import { Box, useTheme } from "@mui/material";
import Faq from "../Faq";

function ConsolidatedBlock() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Welcome />
        <Faq />
      </Box>
    </Box>
  );
}

export default ConsolidatedBlock;
