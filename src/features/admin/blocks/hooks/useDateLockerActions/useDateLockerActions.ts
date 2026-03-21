import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/hooks";
import {
  addLockedDate,
  deleteLockedDate,
} from "../../../../../app/store/slices/lockedDatesSlice";

export const useDateLockerActions = () => {
  const lockedDates = useAppSelector((state) => state.lockedDates);
  const { password } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddOpen = () => {
    setIsAddOpen((prev) => !prev);
  };

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteLockedDate({ id: deleteId, password }));
      setDeleteId(null);
    }
  };

  const handleAdd = (data: { date: string; reason: string }) => {
    dispatch(addLockedDate({ data, password }));
    setIsAddOpen(false);
  };

  return {
    lockedDates,
    deleteId,
    setDeleteId,
    isAddOpen,
    setIsAddOpen,
    handleDelete,
    handleAdd,
    handleAddOpen,
  };
};
