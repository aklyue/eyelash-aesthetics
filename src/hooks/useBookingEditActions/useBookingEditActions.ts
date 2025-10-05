import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadBookedDates } from "../../store/slices/bookedDatesSlice";
import { setSnackbar } from "../../store/slices/snackbarSlice";

export const useBookingEditActions = () => {
  const bookedDates = useAppSelector((state) => state.bookedDates);
  const dispatch = useAppDispatch();

  const { password } = useAppSelector((state) => state.admin);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    date: "",
    time: "",
    service: "",
    name: "",
    telegram: "",
    details: "",
  });

  const [addData, setAddData] = useState({
    date: "",
    time: "",
    service: "",
    name: "",
    telegram: "",
    details: "",
  });

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(
        `https://eyelash-aesthetics-api.onrender.com/admin/bookedDates/${deleteId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      if (res.ok) {
        await dispatch(loadBookedDates()).unwrap();
        setDeleteId(null);
        dispatch(
          setSnackbar({
            message: "Запись удалена",
            severity: "success",
            open: true,
          })
        );
      }
    } catch (e) {
      setDeleteId(null);
      dispatch(
        setSnackbar({
          message: "Ошибка удаления записи",
          severity: "error",
          open: true,
        })
      );
      console.error(e);
    }
  };

  const handleEditOpen = (b: (typeof bookedDates)[0]) => {
    setEditId(b.id);
    setEditData({
      date: b.date,
      time: b.time,
      service: b.service,
      name: b.name,
      telegram: b.telegram,
      details: b.details,
    });
  };

  const handleEditConfirm = async () => {
    if (!editId) return;
    try {
      const res = await fetch(
        `https://eyelash-aesthetics-api.onrender.com/admin/bookedDates/${editId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editData, password }),
        }
      );
      if (res.ok) {
        await dispatch(loadBookedDates()).unwrap();
        setEditId(null);
        dispatch(
          setSnackbar({
            message: "Запись редактирована",
            severity: "success",
            open: true,
          })
        );
      }
    } catch (e) {
      setEditId(null);
      dispatch(
        setSnackbar({
          message: "Ошибка редактирования записи",
          severity: "error",
          open: true,
        })
      );
      console.error(e);
    }
  };

  const handleAddOpen = () => {
    setIsAddOpen((prev) => !prev);
  };

  const handleAddConfirm = async () => {
    try {
      const res = await fetch(
        "https://eyelash-aesthetics-api.onrender.com/admin/bookedDates",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...addData, password }),
        }
      );
      if (res.ok) {
        await dispatch(loadBookedDates()).unwrap();
        setIsAddOpen(false);
        setAddData({
          date: "",
          time: "",
          service: "",
          name: "",
          telegram: "",
          details: "",
        });
        dispatch(
          setSnackbar({
            message: "Запись добавлена",
            severity: "success",
            open: true,
          })
        );
      }
    } catch (e) {
      dispatch(
        setSnackbar({
          message: "Ошибка добавления записи",
          severity: "error",
          open: true,
        })
      );
      console.error(e);
    }
  };

  return {
    bookedDates,
    setDeleteId,
    handleEditOpen,
    deleteId,
    handleDeleteConfirm,
    handleEditConfirm,
    handleAddConfirm,
    editData,
    setEditData,
    editId,
    setEditId,
    handleAddOpen,
    isAddOpen,
    setIsAddOpen,
    addData,
    setAddData,
  };
};
