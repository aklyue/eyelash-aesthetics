import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format, parse } from "date-fns";

interface AddLockModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { date: string; reason: string }) => void;
}

function AddLockModal({ open, onClose, onSave }: AddLockModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [date, setDate] = useState<string>("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (date) {
      onSave({ date, reason });
      setDate("");
      setReason("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Заблокировать дату</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
          <DatePicker
            label="Дата"
            value={date ? parse(date, "yyyy-MM-dd", new Date()) : null}
            onChange={(newValue: Date | null) => {
              if (newValue) {
                setDate(format(newValue, "yyyy-MM-dd"));
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
                sx: {
                  "& .MuiPickersCalendarHeader-labelContainer": {
                    cursor: "default",
                  },
                },
              },
            }}
            disablePast
          />

          <TextField
            label="Причина (необязательно)"
            fullWidth
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Например: Технический перерыв"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Отмена
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!date}
          sx={{
            bgcolor: "rgba(124, 167, 109, 1)",
            "&:hover": { bgcolor: "rgba(104, 147, 89, 1)" },
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddLockModal;
