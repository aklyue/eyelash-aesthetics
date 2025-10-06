import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { servicelist } from "../../../constants/servicelist";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { format, parse } from "date-fns";
import { useAppSelector } from "../../../store/hooks";

interface Booking {
  date: string;
  time: string;
  service: string;
  name: string;
  telegram: string;
  details: string;
}

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  booking: Booking;
  setBooking: (data: Booking) => void;
  onConfirm: () => void;
}

export const AddBookingModal = ({
  open,
  onClose,
  booking,
  setBooking,
  onConfirm,
}: AddModalProps) => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle mb={2}>Добавить запись</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 1,
          overflowY: "visible",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            opacity: isLoading ? 0.4 : 1,
            pointerEvents: isLoading ? "none" : "auto",
          }}
        >
          <DatePicker
            label="Дата"
            value={
              booking.date
                ? parse(booking.date, "yyyy-MM-dd", new Date())
                : null
            }
            onChange={(newValue) => {
              if (newValue) {
                setBooking({
                  ...booking,
                  date: format(newValue, "yyyy-MM-dd"),
                });
              }
            }}
            slotProps={{
              day: {
                sx: {
                  "&.MuiPickersDay-root": { fontWeight: "bold" },
                  "&:hover": {
                    bgcolor: isMobile ? "rgba(0,0,0,0)" : "#ce92d738",
                  },
                  "&.Mui-selected": {
                    bgcolor: "#ce92d7ff !important",
                    color: "white",
                  },
                  "&.MuiPickersDay-today": {
                    bgcolor: "rgba(0,0,0,0)",
                    border: "2px solid #c293bdff",
                  },
                },
              },
              calendarHeader: {
                disabled: true,
                sx: {
                  "& .MuiPickersCalendarHeader-labelContainer": {
                    cursor: "default",
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
            sx={{
              "& .MuiButtonBase-root": {
                "&:hover": {
                  bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                },
              },
            }}
            disablePast
          />

          <TimePicker
            label="Время"
            value={
              booking.time ? parse(booking.time, "HH:mm", new Date()) : null
            }
            onChange={(date) => {
              if (date) {
                setBooking({ ...booking, time: format(date, "HH:mm") });
              } else {
                setBooking({ ...booking, time: "" });
              }
            }}
            format="HH"
            sx={{
              "& .MuiButtonBase-root": {
                "&:hover": {
                  bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                },
              },
            }}
            views={["hours"]}
            localeText={{
              cancelButtonLabel: "Отмена",
              okButtonLabel: "Применить",
            }}
            slotProps={{
              popper: {
                sx: {
                  "& .MuiList-root": {
                    width: 108,
                  },
                  "& .MuiMenuItem-root": {
                    width: 100,
                    "&:hover": {
                      bgcolor: isMobile ? "rgba(0,0,0,0)" : "#ce92d738",
                    },
                    "&.Mui-selected": {
                      bgcolor: "#ce92d7ff !important",
                      color: "white",
                    },
                  },
                },
              },
              actionBar: {
                actions: isMobile ? ["cancel", "accept"] : [],
              },
              layout: {
                sx: {
                  "& .MuiClockPointer-root": {
                    bgcolor: "#ce92d7ff",
                  },
                  "& .MuiClock-pin": {
                    bgcolor: "#ce92d7ff",
                  },
                  "& .MuiClockPointer-thumb": {
                    bgcolor: "#ce92d7ff",
                    border: "16px solid #ce92d7ff",
                  },
                  "& .Mui-selected": {
                    bgcolor: "#ce92d7ff",
                  },
                },
              },
            }}
            ampm={false}
          />

          <FormControl fullWidth>
            <InputLabel>Услуга</InputLabel>
            <Select
              value={booking.service}
              label="Услуга"
              onChange={(e) =>
                setBooking({ ...booking, service: e.target.value })
              }
            >
              {servicelist.map((s) => (
                <MenuItem
                  key={s}
                  value={s}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "#ce92d71a",
                      "&:hover": {
                        bgcolor: isMobile ? "rgba(0,0,0,0)" : "#ce92d738",
                      },
                    },
                  }}
                >
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Имя"
            value={booking.name}
            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
          />

          <TextField
            label="Телеграм"
            value={booking.telegram}
            onChange={(e) =>
              setBooking({ ...booking, telegram: e.target.value })
            }
          />

          <TextField
            label="Детали"
            multiline
            rows={3}
            value={booking.details}
            onChange={(e) =>
              setBooking({ ...booking, details: e.target.value })
            }
          />
        </Box>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "#f8eff47a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              zIndex: 10,
            }}
          >
            <CircularProgress sx={{ color: theme.palette.text.primary }} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            "&:hover": {
              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
            },
          }}
        >
          Отмена
        </Button>
        <Button
          color="success"
          onClick={onConfirm}
          sx={{
            "&:hover": {
              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
            },
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
