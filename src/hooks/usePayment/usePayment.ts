import { useState } from "react";
import { setSnackbar } from "../../store/slices/snackbarSlice";
import { useAppDispatch } from "../../store/hooks";

export const usePayment = (onFileSelected: (file: File | null) => void) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      setFile(selected);
      onFileSelected(selected);
      dispatch(
        setSnackbar({
          message: "Чек успешно прикреплён",
          severity: "success",
          open: true,
        })
      );
    }
  };

  const handleFileDelete = () => {
    onFileSelected(null);
    setFile(null);
  };

  return {
    handleFileChange,
    handleFileDelete,
    file,
  };
};
