import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loginError,
  loginSuccess,
  setPassword,
} from "../../store/slices/adminSlice";
import { loadBookedDates } from "../../store/slices/bookedDatesSlice";
import { setSnackbar } from "../../store/slices/snackbarSlice";

export const useAdmin = () => {
  const dispatch = useAppDispatch();
  const { isAdmin, password, error } = useAppSelector((state) => state.admin);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        dispatch(loginSuccess());
        localStorage.setItem("adminPassword", password);
        dispatch(loadBookedDates());
      } else {
        dispatch(loginError("Неверный пароль"));
        dispatch(
          setSnackbar({
            message: "Неверный пароль",
            severity: "error",
            open: true,
          })
        );
      }
    } catch {
      dispatch(loginError("Ошибка подключения"));
      dispatch(
        setSnackbar({
          message: "Ошибка подключения",
          severity: "error",
          open: true,
        })
      );
    }
  };

  return {
    isAdmin,
    password,
    error,
    setPassword: (p: string) => dispatch(setPassword(p)),
    handleLogin,
  };
};
