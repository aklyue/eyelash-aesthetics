import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loginError,
  loginSuccess,
  setPassword,
} from "../../store/slices/adminSlice";
import { loadBookedDates } from "../../store/slices/bookedDatesSlice";

export const useAdmin = () => {
  const dispatch = useAppDispatch();
  const { isAdmin, password, error } = useAppSelector((state) => state.admin);

  const handleLogin = async () => {
    try {
      const res = await fetch("https://eyelash-aesthetics-api.onrender.com/admin/login", {
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
      }
    } catch {
      dispatch(loginError("Ошибка подключения"));
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
