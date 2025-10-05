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
                <MenuItem key={s} value={s}>
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
        <Button onClick={onClose}>Отмена</Button>
        <Button color="success" onClick={onConfirm}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
