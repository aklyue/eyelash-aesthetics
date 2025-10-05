import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loginError,
  loginSuccess,
  setPassword,
} from "../../store/slices/adminSlice";
import { loadBookedDates } from "../../store/slices/bookedDatesSlice";
import { setSnackbar } from "../../store/slices/snackbarSlice";
import { setLoading } from "../../store/slices/loadingSlice";
const API_URL = process.env.REACT_APP_API_URL;

export const useAdmin = () => {
  const dispatch = useAppDispatch();
  const { isAdmin, password, error } = useAppSelector((state) => state.admin);

  const handleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem("adminPassword");
    if (savedPassword) {
      dispatch(setPassword(savedPassword));
      (async () => {
        try {
          const res = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: savedPassword }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            dispatch(loginSuccess());
            dispatch(loadBookedDates());
          } else {
            localStorage.removeItem("adminPassword");
          }
        } catch {
          console.warn("Автовход не удался");
        }
      })();
    }
  }, [dispatch]);

  return {
    isAdmin,
    password,
    error,
    setPassword: (p: string) => dispatch(setPassword(p)),
    handleLogin,
  };
};
