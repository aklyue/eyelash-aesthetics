import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import WelcomeImage from "../../assets/images/WelcomeImages/welcome.jpg";
import useGetYears from "../../hooks/useGetYears";

export default function Welcome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { age, experience } = useGetYears();

  return (
    <Box
      sx={{
        px: isMobile ? 2 : 8,
        py: 8,
        color: "#fff",
        position: "static",
        zIndex: 1102,
      }}
      id="aboutme"
    >
      <Grid container spacing={4} alignItems="center" justifyContent={"space-around"}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            color="rgba(38, 38, 38, 0.8)"
            gutterBottom
          >
            Привет! Я Лиза
          </Typography>

          <Typography variant="h6" color="rgba(38, 38, 38, 0.8)" gutterBottom>
            Мастер по наращиванию ресниц
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, mb: 4, color: "#848484", textAlign: "justify" }}>
            Мне {age}, и я уже более {experience} профессионально
            занимаюсь ресницами. Всё началось с простого интереса к бьюти-сфере,
            который со временем перерос в дело всей жизни. Я постоянно
            развиваюсь — посещаю обучающие курсы, изучаю новые техники и тренды.
            В работе для меня важны не только эстетика, но и безопасность,
            комфорт и индивидуальный подход. Если ты хочешь выразительный, но
            при этом естественный взгляд — буду рада помочь. Записывайся, и я
            сделаю всё, чтобы ты осталась довольна!
          </Typography>
        </Grid>
        <Grid component="div" item xs={12} md={4.5}>
          <Box
            component="img"
            src={WelcomeImage}
            alt="Lorem ipsum"
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
