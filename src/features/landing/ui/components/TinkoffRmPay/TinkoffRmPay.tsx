import {
  Box,
  Button,
  Typography,
  Stack,
  Alert,
  Snackbar,
  Paper,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as TBankLogo } from "../../../../../shared/assets/logo/tbank-logo.svg";
import { usePayment } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/hooks";
import { closeSnackbar } from "../../../../../app/store/slices/snackbarSlice";

const TinkoffRmPay = ({
  onFileSelected,
  isMobile,
}: {
  onFileSelected: (file: File | null) => void;
  isMobile: boolean;
}) => {
  const { handleFileChange, handleFileDelete, file } =
    usePayment(onFileSelected);

  const { snackbar } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ mt: 4, px: isMobile ? 0 : 4 }}>
      <Typography variant="h6" color="#3b3b3b" gutterBottom>
        Предоплата 50% через Тинькофф
      </Typography>

      <Stack spacing={2}>
        <a
          href="https://www.tinkoff.ru/rm/r_GDGUOLWBsB.RvsyHsGqYz/45LgZ94277"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "12px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid #FFDD2D",
            color: "#000",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.2s ease-in-out",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = isMobile
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(251, 255, 24, 0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.05)")
          }
        >
          <TBankLogo style={{ height: 28, width: "auto" }} />
        </a>

        <Typography variant="body2" color="text.secondary">
          После оплаты прикрепите скриншот чека:
        </Typography>

        <input
          accept="image/*"
          id="upload-check"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <label htmlFor="upload-check">
          <Button
            variant="outlined"
            component="span"
            sx={{
              "&:hover": {
                bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
              },
            }}
          >
            Прикрепить чек
          </Button>
        </label>

        {file && (
          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#e6f7ec45",
              border: "1px solid #a5d6a7",
              borderRadius: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircleIcon color="success" />
              <Typography
                variant="body2"
                color="success.main"
                sx={{ wordBreak: "break-all" }}
              >
                Чек прикреплён: {file.name}
              </Typography>
            </Stack>

            <IconButton
              onClick={handleFileDelete}
              size="small"
              sx={{
                "&:hover": {
                  bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
                },
              }}
            >
              <CloseIcon fontSize="small" sx={{ color: "error.main" }} />
            </IconButton>
          </Paper>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <strong>Внимание!</strong> Предоплата составляет <strong>50%</strong>.
          Если вы не прикрепите скриншот оплаты, бронирование не будет{" "}
          <strong>подтверждено</strong>.
          <br /> <br />* Предоплата не возвращается, если вы отменяете бронь
          меньше, чем за два дня до процедуры!
        </Typography>
      </Stack>

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
};

export default TinkoffRmPay;
