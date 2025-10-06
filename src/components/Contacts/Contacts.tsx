import {
  Box,
  GridLegacy as Grid,
  TextField,
  Button,
  Stack,
  Paper,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ReservationBlock from "../UI/ReservationBlock";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useBookingActions from "../../hooks/useBookingActions";
import { loadBookedDates } from "../../store/slices/bookedDatesSlice";
import { useEffect } from "react";
import LinkSection from "../UI/LinkSection";
import TinkoffRmPay from "../UI/TinkoffRmPay";
import ContactsBackground from "../../assets/background/contacts-background.png";
import { closeSnackbar } from "../../store/slices/snackbarSlice";
import { servicelist } from "../../constants/servicelist";

export interface FormData {
  name: string;
  telegram: string;
  service: string;
  details: string;
  date: Date | null;
  time: string | null;
}

export default function Contacts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const { snackbar } = useAppSelector((state) => state);
  const { handleBooking, setPaymentFile, paymentFile } = useBookingActions();

  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      telegram: "",
      service: "",
      details: "",
      date: null,
      time: null,
    },
  });

  useEffect(() => {
    dispatch(loadBookedDates());
  }, []);

  useEffect(() => {
    dispatch(loadBookedDates());
  }, [dispatch]);

  const onSubmit = async (data: FormData) => {
    await handleBooking(data);
    reset();
  };

  const buttonStyle = {
    alignSelf: "flex-start",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: "1px solid rgba(161, 161, 161, 0.6)",
    fontSize: "1rem",
    fontWeight: 400,
    px: 2,
    py: 1.3,
    textTransform: "none",
    transition: "all 0.2s",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: isMobile
        ? theme.palette.background.default
        : "rgba(255, 255, 255, 0.2)",
      color: isMobile ? theme.palette.text.primary : "rgba(95, 95, 95, 1)",
      borderColor: isMobile
        ? "rgba(161, 161, 161, 0.6)"
        : "rgba(128, 128, 128, 0.9)",
      boxShadow: "none",
    },
  };

  return (
    <Box
      sx={{
        px: isMobile ? 2 : 4,
        py: 10,
        backgroundImage: `url(${ContactsBackground})`,
        backgroundSize: "cover",
        color: "#fff",
        boxShadow: `
          inset 0 4px 16px rgba(0, 0, 0, 0.1),
          inset 0 -4px 16px rgba(0, 0, 0, 0.1)
        `,
      }}
      id="contacts"
    >
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid
          item
          xs={12}
          md={5}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <LinkSection isMobile={isMobile} />
          <TinkoffRmPay
            onFileSelected={(file) => setPaymentFile(file)}
            isMobile={isMobile}
          />
        </Grid>

        <Grid item xs={12} md={7} sx={{ display: "flex" }}>
          <Paper
            elevation={3}
            sx={{
              p: isMobile ? 0 : 4,
              borderRadius: 4,
              boxShadow: "none",
              backgroundColor: "transparent",
              flex: 1,
              "--Paper-overlay": "none",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Ваше имя"
                  variant="outlined"
                  required
                  {...register("name", { required: "Введите имя" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

                <TextField
                  fullWidth
                  label="Ваш контакт (telegram)"
                  variant="outlined"
                  required
                  {...register("telegram", {
                    required: "Введите контакт",
                    pattern: {
                      value: /^@[A-Za-z\d_]{5,32}$/,
                      message:
                        "Введите корректный username Telegram (например, @username123)",
                    },
                  })}
                  error={!!errors.telegram}
                  helperText={errors.telegram?.message}
                />

                <Controller
                  name="service"
                  control={control}
                  rules={{ required: "Выберите услугу" }}
                  render={({ field }) => (
                    <TextField
                      select
                      label="Выберите услугу"
                      fullWidth
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      error={!!errors.service}
                      helperText={errors.service?.message}
                      sx={{
                        "& .Mui-selected": {
                          bgcolor: "#ce92d71a",
                          "&:hover": {
                            bgcolor: isMobile ? "#ce92d71a" : "#ce92d738",
                          },
                        },
                      }}
                    >
                      {servicelist.map((s) => (
                        <MenuItem
                          key={s}
                          value={s}
                          sx={{
                            "&:hover": {
                              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                            },
                            "&.Mui-selected": {
                              bgcolor: "#ce92d71a",
                              "&:hover": {
                                bgcolor: isMobile ? "#ce92d71a" : "#ce92d738",
                              },
                            },
                          }}
                        >
                          {s}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value="Ламинирование ресниц">
                        Ламинирование ресниц
                      </MenuItem>
                      <MenuItem value="Наращивание ресниц">
                        Наращивание ресниц
                      </MenuItem>
                      <MenuItem value="Окрашивание ресниц">
                        Окрашивание ресниц
                      </MenuItem>
                      <MenuItem value="Снятие ресниц">Снятие ресниц</MenuItem>
                      <MenuItem value="Коррекция ресниц">
                        Коррекция ресниц
                      </MenuItem> */}
                    </TextField>
                  )}
                />

                <Controller
                  name="details"
                  control={control}
                  rules={{ required: "Опишите детали услуги" }}
                  render={({ field }) => (
                    <TextField
                      label="Опишите услугу"
                      fullWidth
                      placeholder={`Например, "Хочу 2D лису + мокрый эффект"`}
                      multiline
                      minRows={4}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      error={!!errors.details}
                      helperText={errors.details?.message}
                    />
                  )}
                />

                <ReservationBlock
                  name={"date"}
                  service={watch("service")}
                  control={control}
                  watch={watch}
                  errors={errors}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth={isMobile}
                  sx={{
                    ...buttonStyle,
                    mixBlendMode: "luminosity",
                    "&.Mui-disabled": {
                      backgroundColor: "#5c5c5c",
                      color: "#ccc",
                      cursor: "not-allowed",
                      mixBlendMode: "unset",
                      boxShadow: "none",
                    },
                  }}
                  disabled={!paymentFile || isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Забронировать"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
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
    </Box>
  );
}
