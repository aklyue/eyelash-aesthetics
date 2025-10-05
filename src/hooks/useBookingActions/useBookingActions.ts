import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadBookedDates } from "../../store/slices/bookedDatesSlice";
import { useState } from "react";
import { getRuleForDate } from "../../utils/getRuleForDate";
import { setSnackbar } from "../../store/slices/snackbarSlice";
import usePayment from "../usePayment";

export type FormData = {
  name: string;
  telegram: string;
  service: string;
  details: string;
  date: Date | null;
  time: string | null;
};

const serviceDurations: Record<string, number> = {
  "Наращивание ресниц": 3,
  "Снятие ресниц": 1,
  "Ламинирование ресниц": 2,
  "Окрашивание ресниц": 1,
  "Коррекция ресниц": 2,
};

const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

export const useBookingActions = () => {
  const dispatch = useAppDispatch();
  const { data: schedule } = useAppSelector((state) => state.schedule);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const handleBooking = async (data: FormData) => {
    if (!paymentFile) {
      dispatch(
        setSnackbar({
          message: "Файл не выбран",
          severity: "error",
          open: true,
        })
      );
      console.warn("Оплата не подтверждена. Заявка не отправлена.");
      return;
    }

    try {
      const dateStr = data.date
        ? format(data.date, "dd.MM.yyyy")
        : "не выбрана";

      const text = `📝 Новая заявка:
👤 Имя: ${data.name}
📞 Контакт: ${data.telegram}
💬 Услуга: ${data.service}
🧾 Детали: ${data.details}
📅 Дата: ${dateStr}
⏰ Время: ${data.time ?? "не выбрано"}`;

      const form = new FormData();
      form.append("chat_id", TELEGRAM_CHAT_ID ?? "");

      const isImage = paymentFile.type.startsWith("image/");
      const endpoint = isImage ? "sendPhoto" : "sendDocument";
      const fileField = isImage ? "photo" : "document";

      form.append(fileField, paymentFile);
      form.append("caption", text);

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${endpoint}`,
        {
          method: "POST",
          body: form,
        }
      );

      if (data.date) {
        const dateDb = format(data.date, "yyyy-MM-dd");

        await fetch("https://eyelash-aesthetics-api.onrender.com/bookedDates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: dateDb,
            time: data.time,
            service: data.service,
            name: data.name,
            telegram: data.telegram,
            details: data.details,
          }),
        });

        await dispatch(loadBookedDates()).unwrap();
      }

      dispatch(
        setSnackbar({
          message: "Заявка успешно отправлена",
          severity: "success",
          open: true,
        })
      );
      setPaymentFile(null);
    } catch (err) {
      console.error(err);
      dispatch(
        setSnackbar({
          message: "Произошла ошибка",
          severity: "error",
          open: true,
        })
      );
    }
  };

  function getAvailableTimeSlots(
    booked: { time: string; service: string | undefined }[],
    selectedService: string,
    date: Date
  ): string[] {
    const duration = serviceDurations[selectedService] ?? 1;
    const rule = getRuleForDate(date, schedule);

    if (!rule) return [];
    if (rule.allowed !== "all" && !rule.allowed.includes(selectedService))
      return [];

    const excluded = new Set<string>();

    booked.forEach((b) => {
      if (!b.time || !b.service) return;

      const bookedDuration = serviceDurations[b.service];

      const startHour = parseInt(b.time.split(":")[0], 10);
      for (let offset = 0; offset < bookedDuration; offset++) {
        const hour = startHour + offset;
        excluded.add(`${hour.toString().padStart(2, "0")}:00`);
      }
    });

    const slots: string[] = [];
    for (let h = rule.startHour; h <= 21 - duration; h++) {
      let free = true;
      for (let offset = 0; offset < duration; offset++) {
        const checkHour = h + offset;
        const checkSlot = `${checkHour.toString().padStart(2, "0")}:00`;
        if (excluded.has(checkSlot) || checkHour > 20) {
          free = false;
          break;
        }
      }
      if (free) slots.push(`${h.toString().padStart(2, "0")}:00`);
    }

    return slots;
  }

  return {
    handleBooking,
    getAvailableTimeSlots,
    setPaymentFile,
    paymentFile,
  };
};
