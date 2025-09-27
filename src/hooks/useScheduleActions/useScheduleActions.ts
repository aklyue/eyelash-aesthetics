import { getISOWeek } from "date-fns";
import { useState } from "react";

export const useScheduleActions = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const today = new Date();
  const isoWeek = getISOWeek(today);
  const currentWeekNumber = (isoWeek % 2) + 1;

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    setSelectedServices([]);
  };

  return {
    selectedServices,
    setSelectedServices,
    currentWeekNumber,
    handleClick,
    handleClose,
    handleClear,
    toggleService,
    open,
    anchorEl,
  };
};
