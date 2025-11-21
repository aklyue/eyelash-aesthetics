import {
  Box,
  GridLegacy as Grid,
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { features } from "../../../../../shared/constants";
import AboutCompanyImage from "../../../../../shared/assets/images/AboutCompanyImages/about.jpg";

export default function AboutCompany() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        px: isMobile ? 2 : 4,
        py: 8,
        backgroundColor: theme.palette.custom.sectionLight,
      }}
      id="about"
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        О компании
      </Typography>
      <Box sx={{ borderBottom: "2px solid #ccc", mb: 4, width: "100px" }} />

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={AboutCompanyImage}
            alt="О компании"
            sx={{
              width: "100%",
              borderRadius: 4,
              boxShadow: 3,
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero ex
            asperiores iusto facilis aliquid perferendis, est amet, harum
            corrupti modi nihil beatae vero necessitatibus eaque id deleniti
            commodi magni! Molestias cum alias voluptate error rerum deleniti
            sed magnam quibusdam reprehenderit illo assumenda ea, aliquid vero
            nostrum voluptas quos iusto doloribus.
          </Typography>

          <Stack spacing={2} mt={3}>
            {features.map((text, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
                divider={<Divider orientation="horizontal" flexItem />}
              >
                <CheckCircleIcon sx={{ color: "#4caf50" }} />
                <Typography variant="body1">{text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
