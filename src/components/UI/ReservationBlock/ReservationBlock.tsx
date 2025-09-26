import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { addDays, isBefore, startOfDay } from "date-fns";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../../../store/hooks";
import { FormData } from "../../Contacts/Contacts";
import useBookingActions from "../../../hooks/useBookingActions";

function ReservationBlock({
  name,
  service,
}: {
  name: keyof FormData;
  service: string;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getAvailableTimeSlots } = useBookingActions();
  const bookedDates = useAppSelector((state) => state.bookedDates);
  const selectedService = service;
  const {
    control,
    watch,
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
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StaticDatePicker
            {...field}
            sx={{
              bgcolor: "rgba(0,0,0,0)",
              justifyContent: isMobile ? "flex-end" : "space-between",
              gap: isMobile ? 5 : undefined,
              display: "flex",
              flexDirection: isSmMobile ? "column" : "row-reverse",
            }}
            key={bookedDates.length}
            localeText={{
              toolbarTitle: "Выберите день",
            }}
            value={field.value ? (field.value as Date) : null}
            onChange={(newValue) => field.onChange(newValue)}
            disablePast
            shouldDisableDate={(date) => {
              const selectedDay = format(date, "yyyy-MM-dd");
              const today = startOfDay(new Date());
              const minAllowedDate = startOfDay(addDays(today, 4));
              const blockedDates = [
                new Date(2025, 9, 18),
                new Date(2025, 9, 19),
              ];

              const isBlocked = blockedDates.some(
                (blocked) => startOfDay(date).getTime() === blocked.getTime()
              );

              const isTooEarly = isBefore(date, minAllowedDate);

              const timesForDate = bookedDates
                .filter((entry) => entry.date === selectedDay)
                .map((entry) => entry.time);

              const isFullyBooked = timesForDate.length >= 3;

              return isTooEarly || isFullyBooked || isBlocked;
            }}
            slotProps={{
              actionBar: { actions: [] },
              calendarHeader: { disabled: true },
              toolbar: {
                sx: {
                  maxWidth: "100%",
                  alignItems: isMobile ? undefined : "flex-end",
                  "& .MuiPickersToolbar-content": {
                    alignItems: "flex-start",
                  },
                  "& .MuiDatePickerToolbar-title": {
                    m: 0,
                  },
                },
              },
              day: {
                sx: {
                  "&.MuiPickersDay-root": {
                    fontWeight: "bold",
                  },
                  "&.Mui-selected": {
                    bgcolor: "#ce92d7ff !important",
                    color: "white",
                  },
                  "&.MuiPickersDay-today": {
                    border: "2px solid #c293bdff",
                  },
                },
              },
            }}
          />
        )}
      />
      <Controller
        name="time"
        control={control}
        rules={{ required: "Выберите время" }}
        render={({ field }) => {
          const selectedDate = watch("date");
          const selectedDayStr = selectedDate
            ? format(new Date(selectedDate), "yyyy-MM-dd")
            : "";

          let availableSlots: string[] = [];

          if (selectedDate) {
            const takenSlots = bookedDates
              .filter((entry) => entry.date === selectedDayStr)
              .map((entry) => ({
                time: entry.time,
                service: entry.service,
              }));

            availableSlots = getAvailableTimeSlots(
              takenSlots,
              selectedService,
              new Date(selectedDate)
            );
          }

          return (
            <TextField
              select
              label="Время бронирования"
              fullWidth
              required
              value={field.value ?? ""}
              onChange={field.onChange}
              error={!!errors.time}
              helperText={errors.time?.message}
              disabled={!selectedDate}
            >
              {availableSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
              {selectedDate && availableSlots.length === 0 && (
                <MenuItem disabled>Нет доступных окон</MenuItem>
              )}
            </TextField>
          );
        }}
      />
    </Box>
  );
}

export default ReservationBlock;
