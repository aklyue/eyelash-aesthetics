import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить запись</DialogTitle>
      <DialogContent>
        <Typography>Вы уверены, что хотите удалить эту бронь?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button color="error" onClick={onConfirm}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
