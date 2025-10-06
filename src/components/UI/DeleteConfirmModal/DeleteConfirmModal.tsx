import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../../../store/hooks";

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
  const { isLoading } = useAppSelector((state) => state.loading);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить запись</DialogTitle>

      <DialogContent sx={{ position: "relative", minHeight: 80 }}>
        <Typography>Вы уверены, что хотите удалить эту бронь?</Typography>

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
      </DialogContent>

      <DialogActions sx={{ position: "relative" }}>
        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            "&:hover": {
              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
            },
          }}
        >
          Отмена
        </Button>
        <Button
          color="error"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            "&:hover": {
              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
            },
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
