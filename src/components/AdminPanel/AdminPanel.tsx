import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  IconButton,
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
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import { Logout } from "@mui/icons-material";
import { logout } from "../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const { isLoading } = useAppSelector((state) => state.loading);

  const swiperRef = useRef<SwiperType | null>(null);
  const { snackbar } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
      <Box>
        <AppBar
          position="static"
          sx={{
            bgcolor: "rgba(0,0,0,0)",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <IconButton
              sx={{
                width: 50,
                height: 50,
                p: 0,
              }}
              onClick={() => navigate("/")}
            >
              <Logo width={40} height={40} />
            </IconButton>
          </Box>
        </AppBar>
        <Box
          sx={{
            px: isMobile ? 2 : 8,
            py: 4,
            backgroundColor: theme.palette.background.default,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!isMobile && (
            <Typography variant="h5" mb={2} textAlign={"center"}>
              Вход
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              width: "fit-content",
            }}
          >
            {isMobile && (
              <Typography variant="h5" mb={2}>
                Вход
              </Typography>
            )}
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
            <Button
              variant="outlined"
              sx={{
                height: 40,
                color: "#ba68a9ff",
                "&:hover": {
                  bgcolor: isMobile ? "rgba(0,0,0,0)" : "#ba68a91d",
                },
                border: "1px solid #ba68a9ff",
              }}
              fullWidth={isMobile ? true : false}
              onClick={handleLogin}
            >
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
                    severity={snackbar.severity}
                  >
                    {snackbar.message}
                  </Alert>
                ) : undefined}
              </Snackbar>
            )}
          </Box>
          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#f8eff47a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              <CircularProgress sx={{ color: theme.palette.text.primary }} />
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <AnimatedUI isHeader={false}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "rgba(0,0,0,0)",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              width: 50,
              height: 50,
              p: 0,
            }}
          >
            <Logo width={40} height={40} />
          </IconButton>
          <IconButton onClick={() => dispatch(logout())}>
            <Logout color="error" />
          </IconButton>
        </Box>
      </AppBar>
      <Box sx={{ px: isMobile ? 2 : 8 }}>
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
