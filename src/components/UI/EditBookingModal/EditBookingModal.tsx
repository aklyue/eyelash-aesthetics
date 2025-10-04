import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { servicelist } from "../../../constants/servicelist";
import { DatePicker } from "@mui/x-date-pickers";

interface Booking {
  date: string;
  time: string;
  service: string;
  name: string;
  telegram: string;
  details: string;
}

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  booking: Booking;
  setBooking: (data: Booking) => void;
  onConfirm: () => void;
}

export const EditBookingModal = ({
  open,
  onClose,
  booking,
  setBooking,
  onConfirm,
}: EditModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle mb={2}>Редактировать запись</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 1,
          overflowY: "visible",
        }}
      >
        <DatePicker
          label="Дата"
          value={booking.date ? new Date(booking.date) : null}
          onChange={(newValue) => {
            if (newValue) {
              setBooking({
                ...booking,
                date: newValue.toISOString().split("T")[0],
              });
            }
          }}
          slotProps={{
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
                  bgcolor: "rgba(0,0,0,0)",
                  border: "2px solid #c293bdff",
                },
              },
            },
          }}
        />
        <TextField
          label="Время"
          type="time"
          value={booking.time}
          onChange={(e) => setBooking({ ...booking, time: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
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
          onChange={(e) => setBooking({ ...booking, telegram: e.target.value })}
        />
        <TextField
          label="Детали"
          multiline
          rows={3}
          value={booking.details}
          onChange={(e) => setBooking({ ...booking, details: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button color="primary" onClick={onConfirm}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
