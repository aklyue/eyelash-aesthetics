import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExpandMore, Delete, Add } from "@mui/icons-material";
import { useDateLockerActions } from "../../hooks";

import DeleteConfirmModal from "../../../ui/components/DeleteConfirmModal";
import AddLockModal from "../../../ui/components/AddLockModal";

function DateLocker() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    lockedDates,
    handleAdd,
    handleDelete,
    setDeleteId,
    deleteId,
    handleAddOpen,
    isAddOpen,
    setIsAddOpen,
  } = useDateLockerActions();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Typography variant="h6">Заблокированные даты</Typography>
        <IconButton
          onClick={handleAddOpen}
          sx={{
            "&:hover": {
              color: isMobile ? undefined : "rgba(124, 167, 109, 1)",
              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
            },
          }}
        >
          <Add />
        </IconButton>
      </Box>

      {lockedDates.length === 0 && <Typography color="textSecondary">Нет заблокированных дат</Typography>}

      {lockedDates.map((lock, index) => (
        <Accordion
          key={lock.id}
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
            "&:before": {
              display: index === 0 ? "none" : "block",
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                pr: 2,
              }}
            >
              <Typography>
                <strong>
                  {lock.date?.split("-").reverse().join(".") ||
                    "Дата не указана"}
                </strong>
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  component="div"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(lock.id);
                  }}
                  onFocus={(e) => e.stopPropagation()}
                  sx={{
                    "&:hover": { color: "rgba(203, 83, 83, 1)" },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Причина блокировки:
            </Typography>
            <Typography mt={1}>{lock.reason || "Не указана"}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <DeleteConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      <AddLockModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAdd}
      />
    </Box>
  );
}

export default DateLocker;
