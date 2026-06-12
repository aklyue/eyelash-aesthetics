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
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { useAppSelector } from "../../../../../app/store/hooks";
import { FormData } from "../../../blocks/components/Contacts/Contacts";
import { useBookingActions } from "../../../hooks";
import { getRuleForDate } from "../../../../../shared/utils/getRuleForDate";

interface ReservationBlockProps {
  name: keyof FormData;
  service: string;
  control: Control<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
}

function ReservationBlock({
  name,
  service,
  control,
  watch,
  errors,
}: ReservationBlockProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getAvailableTimeSlots } = useBookingActions();
  const bookedDates = useAppSelector((state) => state.bookedDates);
  const lockedDates = useAppSelector((state) => state.lockedDates);
  const { data: schedule } = useAppSelector((state) => state.schedule);
  const selectedService = service;

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
              const isLockedByAdmin = lockedDates.some(
                (lock) => lock.date === selectedDay,
              );
              const isTooEarly = isBefore(date, minAllowedDate);

              const bookedSlots = bookedDates
                .filter((entry) => entry.date === selectedDay)
                .map((entry) => ({ time: entry.time, service: entry.service }));

              const availableSlots = getAvailableTimeSlots(
                bookedSlots,
                selectedService,
                date,
              );

              const isNoSlotAvailable = availableSlots.length === 0;

              const rule = getRuleForDate(date, schedule);
              const isNotAllowed =
                !rule ||
                (rule.allowed !== "all" &&
                  !rule.allowed.includes(selectedService));

              return (
                isTooEarly ||
                isNoSlotAvailable ||
                isLockedByAdmin ||
                isNotAllowed
              );
            }}
            slotProps={{
              actionBar: { actions: [] },
              calendarHeader: {
                disabled: true,
                sx: {
                  "& .MuiPickersCalendarHeader-labelContainer": {
                    cursor: "default",
                  },
                },
              },
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
                    color: "rgba(20, 20, 20, 0.8) !important",
                    fontWeight: "bold",
                  },
                  "&.Mui-disabled": {
                    color: "#a4a4a4 !important",
                  },
                  "&:hover": {
                    bgcolor: isMobile ? "rgba(0,0,0,0)" : "#ce92d738",
                  },
                  "&.Mui-selected": {
                    bgcolor: "#ce92d7ff !important",
                    color: "white !important",
                  },
                  "&.MuiPickersDay-today": {
                    bgcolor: "rgba(0,0,0,0)",
                    border: "2px solid #c293bdff",
                  },
                },
              },
              nextIconButton: {
                sx: {
                  "&:hover": {
                    bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                  },
                },
              },
              previousIconButton: {
                sx: {
                  "&:hover": {
                    bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
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
              new Date(selectedDate),
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
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "gray !important",
                  opacity: 1,
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "red",
                },
              }}
            >
              {availableSlots.map((slot) => (
                <MenuItem
                  key={slot}
                  value={slot}
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
