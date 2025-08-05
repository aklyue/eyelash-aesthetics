import { format } from "date-fns";
import { useAppDispatch } from "../../store/hooks";
import {
  deleteOutdatedBookings,
  loadBookedDates,
} from "../../store/slices/bookedDatesSlice";
import { useEffect, useState } from "react";

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
};

const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

export const useBookingActions = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const handleBooking = async (data: FormData) => {
    if (!paymentFile) {
      setStatus("error");
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
          }),
        });

        await dispatch(loadBookedDates()).unwrap();
      }

      setStatus("success");
      setPaymentFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  function getAvailableTimeSlots(
    booked: { time: string; service: string | undefined }[],
    selectedService: string
  ): string[] {
    const duration = serviceDurations[selectedService] ?? 1;
    const allHours = Array.from({ length: 8 }, (_, i) => i + 11);
    const excludedHours = new Set<number>();

    booked.forEach(({ time, service }) => {
      if (!time || !service) return;
      const startHour = parseInt(time.split(":")[0], 10);
      const bookedDuration = serviceDurations[service] ?? 1;

      for (let h = startHour; h < startHour + bookedDuration; h++) {
        if (h >= 11 && h <= 18) excludedHours.add(h);
      }
    });

    return allHours
      .filter((hour) => {
        for (let offset = 0; offset < duration; offset++) {
          if (excludedHours.has(hour + offset)) return false;
        }
        return true;
      })
      .map((hour) => `${hour.toString().padStart(2, "0")}:00`);
  }

  useEffect(() => {
    const lastCheck = localStorage.getItem("lastCleanupDate");
    const todayStr = format(new Date(), "yyyy-MM-dd");

    if (lastCheck !== todayStr) {
      dispatch(deleteOutdatedBookings());
      localStorage.setItem("lastCleanupDate", todayStr);
    }
  }, []);

  return {
    handleBooking,
    status,
    setStatus,
    getAvailableTimeSlots,
    setPaymentFile,
    paymentFile,
  };
};
