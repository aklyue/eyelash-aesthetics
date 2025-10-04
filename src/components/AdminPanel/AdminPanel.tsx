import {
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BookingEditor from "../BookingEditor";
import { useRef, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import ScheduleEditor from "../ScheduleEditor";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";

function AdminPanel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAdmin, password, setPassword, handleLogin, error } = useAdmin();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    swiperRef.current?.slideTo(newValue);
  };

  if (!isAdmin) {
    return (
      <Box
        sx={{
          px: isMobile ? 2 : 8,
          py: 8,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <TextField
            size="small"
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button sx={{ height: 40 }} onClick={handleLogin}>
            Войти
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ px: isMobile ? 2 : 8, py: 8 }}>
      <Typography variant="h5" mb={3}>
        Админ-панель
      </Typography>

      <Tabs
        sx={{ "& .MuiTabs-indicator": { backgroundColor: "#ba68a9ff" } }}
        value={tab}
        onChange={handleTabChange}
      >
        <Tab
          sx={{
            "&.Mui-selected": { color: "#ba68a9ff !important" },
          }}
          label="Записи"
        />
        <Tab
          sx={{
            "&.Mui-selected": { color: "#ba68a9ff !important" },
          }}
          label="Расписание"
        />
      </Tabs>
      <Swiper
        onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
        initialSlide={0}
        onSlideChange={(swiper: SwiperType) => setTab(swiper.activeIndex)}
        spaceBetween={16}
        slidesPerView={1.005}
        centeredSlides={true}
        noSwipingClass="no-swipe"
      >
        <SwiperSlide style={{ overflow: "visible", position: "relative" }}>
          <BookingEditor />
        </SwiperSlide>
        <SwiperSlide style={{ overflow: "visible", position: "relative" }}>
          <ScheduleEditor />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default AdminPanel;
