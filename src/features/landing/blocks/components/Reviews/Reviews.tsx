import {
  Box,
  Typography,
  GridLegacy as Grid,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { reviews } from "../../../../../shared/constants";

export default function Reviews() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        px: isMobile ? 2 : 4,
        py: 8,
        backgroundColor: theme.palette.custom.sectionLight,
      }}
      id="reviews"
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Что о нас говорят?
      </Typography>
      <Box sx={{ borderBottom: "2px solid #ccc", mb: 4, width: "100px" }} />

      <Grid container spacing={isMobile ? 2 : 4}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex" }}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: "#597ad3", width: 32, height: 32 }}>
                  {review.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="subtitle2" fontWeight={700}>
                  {review.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={i} sx={{ color: "#fbc02d", fontSize: 20 }} />
                  ))}
              </Stack>

              <Box sx={{ flexGrow: 1, mt: 1 }}>
                <Typography variant="body2">{review.text}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
