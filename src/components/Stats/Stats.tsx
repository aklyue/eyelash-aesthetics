import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import SwiperSlider from "../UI/SwiperSlider";

function Stats() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      id="works"
      sx={{
        py: 6,
        bgcolor: theme.palette.custom.sectionLight,
        px: isMobile ? 2 : 8,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "inherit",
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        Мои работы
      </Typography>

      <SwiperSlider isMobile={isMobile} />
    </Box>
  );
}

export default Stats;
