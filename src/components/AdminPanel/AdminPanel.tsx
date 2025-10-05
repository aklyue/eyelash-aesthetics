import {
  Alert,
  Box,
  Button,
  Snackbar,
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
import AnimatedUI from "../UI/AnimatedUI";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeSnackbar } from "../../store/slices/snackbarSlice";

function AdminPanel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { snackbar } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <Button sx={{ height: 40 }} onClick={handleLogin}>
            Войти
          </Button>
          {error && (
            <Snackbar
              open={snackbar?.open || false}
              autoHideDuration={4000}
              onClose={() => dispatch(closeSnackbar())}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {snackbar?.severity ? (
                <Alert
                  onClose={() => dispatch(closeSnackbar())}
                  variant="outlined"
                  severity={snackbar.severity}
                  sx={{ width: "100%" }}
                >
                  {snackbar.message}
                </Alert>
              ) : undefined}
            </Snackbar>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <AnimatedUI isHeader={false}>
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
      <Snackbar
        open={snackbar?.open || false}
        autoHideDuration={4000}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {snackbar?.severity ? (
          <Alert
            onClose={() => dispatch(closeSnackbar())}
            severity={snackbar.severity}
            variant="standard"
            sx={{
              width: "100%",
              border: "1px solid",
              borderColor:
                snackbar.severity === "error"
                  ? "red"
                  : snackbar.severity === "warning"
                  ? "orange"
                  : snackbar.severity === "info"
                  ? "blue"
                  : "green",
            }}
          >
            {snackbar.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </AnimatedUI>
  );
}

export default AdminPanel;
