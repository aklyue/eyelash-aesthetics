export interface SnackbarStatus {
  message: string;
  severity: "success" | "error" | "info" | "warning" | null;
  open: boolean;
}
