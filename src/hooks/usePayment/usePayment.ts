import { useState } from "react";

export const usePayment = (onFileSelected: (file: File | null) => void) => {
  const [file, setFile] = useState<File | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      setFile(selected);
      onFileSelected(selected);
      setSuccessOpen(true);
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
    successOpen,
    setSuccessOpen,
  };
};
