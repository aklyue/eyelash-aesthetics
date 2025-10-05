import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { servicelist as services } from "../../constants/servicelist";
import { Schedule, updateSchedule } from "../../store/slices/scheduleSlice";
import { setSnackbar } from "../../store/slices/snackbarSlice";

export const useScheduleEditActions = () => {
  const dispatch = useAppDispatch();
  const { data: scheduleFromRedux } = useAppSelector((state) => state.schedule);
  const { password } = useAppSelector((state) => state.admin);

  const [localSchedule, setLocalSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (scheduleFromRedux && Object.keys(scheduleFromRedux).length > 0) {
      setLocalSchedule(JSON.parse(JSON.stringify(scheduleFromRedux)));
    }
  }, [scheduleFromRedux]);

  const handleRemoveService = (week: number, day: number, service: string) => {
    const newSchedule = { ...localSchedule };
    const allowed = newSchedule[week][day].allowed;
    if (allowed === "all") {
      newSchedule[week][day].allowed = services.filter((s) => s !== service);
    } else {
      newSchedule[week][day].allowed = allowed.filter((s) => s !== service);
      if (newSchedule[week][day].allowed.length === 0)
        newSchedule[week][day].allowed = "all";
    }
    setLocalSchedule(newSchedule);
  };

  const handleAddService = (week: number, day: number, service: string) => {
    const newSchedule = { ...localSchedule };
    const allowed = newSchedule[week][day].allowed;
    if (allowed === "all") return;
    if (!allowed.includes(service))
      newSchedule[week][day].allowed = [...allowed, service];
    setLocalSchedule(newSchedule);
  };

  const handleStartHourChange = (week: number, day: number, hour: number) => {
    const newSchedule = { ...localSchedule };
    newSchedule[week][day] = { ...newSchedule[week][day], startHour: hour };
    setLocalSchedule(newSchedule);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        "https://eyelash-aesthetics-api.onrender.com/admin/schedule",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...localSchedule, password }),
        }
      );
      if (!res.ok) throw new Error("Failed to save schedule");

      const updated = await res.json();
      dispatch(updateSchedule(updated));
      dispatch(
        setSnackbar({
          message: "Расписание сохранено",
          severity: "success",
          open: true,
        })
      );
    } catch (e) {
      console.error(e);
      dispatch(
        setSnackbar({
          message: "Ошибка редактирования расписания",
          severity: "error",
          open: true,
        })
      );
    }
  };

  const openModal = () => {
    if (JSON.stringify(localSchedule) === JSON.stringify(scheduleFromRedux))
      return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return {
    localSchedule,
    handleSave,
    handleStartHourChange,
    handleRemoveService,
    handleAddService,
    isModalOpen,
    openModal,
    closeModal,
  };
};
