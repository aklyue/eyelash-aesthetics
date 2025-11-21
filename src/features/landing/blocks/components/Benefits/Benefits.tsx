import {
  Box,
  Typography,
  GridLegacy as Grid,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { benefits } from "../../../../../shared/constants";

export default function Benefits() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        px: isMobile ? 2 : 4,
        py: 8,
        backgroundColor: theme.palette.custom.sectionDark,
        color: "#fff",
      }}
      id="benefits"
    >
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Lorem, ipsum dolor.
      </Typography>
      <Typography variant="h6" color="#ccc" gutterBottom textAlign="center">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={4}>
        {benefits.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Stack alignItems="center" spacing={1}>
              {item.icon}
              <Typography
                variant="subtitle1"
                color="#ccc"
                textAlign="center"
                fontWeight={500}
              >
                {item.text}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
