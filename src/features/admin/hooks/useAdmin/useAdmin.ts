import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  loginError,
  loginSuccess,
  setCheckingAuth,
  setPassword,
} from "../../../../app/store/slices/adminSlice";
import { loadBookedDates } from "../../../../app/store/slices/bookedDatesSlice";
import { setSnackbar } from "../../../../app/store/slices/snackbarSlice";
import { setLoading } from "../../../../app/store/slices/loadingSlice";
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
    const start = Date.now();
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
        } finally {
          dispatch(setCheckingAuth(false));
        }
      })();
    } else {
      const elapsed = Date.now() - start;
      const delay = Math.max(500 - elapsed, 0);
      setTimeout(() => dispatch(setCheckingAuth(false)), delay);
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
