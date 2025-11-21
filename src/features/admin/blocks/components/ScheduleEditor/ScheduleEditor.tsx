import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Save } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { servicelist as services } from "../../../../../shared/constants";
import { weekdays as weekDays } from "../../../../../shared/constants";
import { useScheduleEditActions } from "../../hooks";
import { useAppSelector } from "../../../../../app/store/hooks";

export function ScheduleEditor() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    localSchedule,
    handleSave,
    handleStartHourChange,
    handleRemoveService,
    handleAddService,
    isModalOpen,
    openModal,
    closeModal,
    scheduleFromRedux,
  } = useScheduleEditActions();

  const { isLoading } = useAppSelector((state) => state.loading);

  if (!localSchedule) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress sx={{ color: theme.palette.text.primary }} />
      </Box>
    );
  }

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
        <Typography variant="h6">Расписание</Typography>
        <Button
          onClick={openModal}
          disabled={
            JSON.stringify(localSchedule) === JSON.stringify(scheduleFromRedux)
          }
          sx={{
            "&:hover": {
              bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
            },
          }}
        >
          <Save sx={{ mr: 0.5 }} />
          Сохранить
        </Button>
      </Box>

      {Object.entries(localSchedule).map(([weekStr, weekRules]) => {
        const week = parseInt(weekStr, 10);

        return (
          <Box key={week} mb={3}>
            <Typography variant="h6" mb={1}>
              Неделя {week}
            </Typography>

            {Object.entries(weekRules).map(([dayStr, rule], index) => {
              const day = parseInt(dayStr, 10);
              const dayName = weekDays[day] || `День ${day}`;

              return (
                <Accordion
                  key={day}
                  sx={{
                    bgcolor: "rgba(0,0,0,0)",
                    boxShadow: "none",
                    "&:before": {
                      height: "0.5px",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1">
                      <strong>{dayName}</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 4 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <TextField
                        label="Начало (час)"
                        size="small"
                        type="number"
                        value={rule.startHour}
                        onChange={(e) =>
                          handleStartHourChange(
                            week,
                            day,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </Box>

                    <Box display="flex" gap={1} flexWrap="wrap">
                      {services.map((service) => {
                        const isAllowed =
                          rule.allowed === "all" ||
                          rule.allowed.includes(service);

                        return (
                          <Button
                            component="span"
                            key={service}
                            variant={"contained"}
                            onClick={() =>
                              isAllowed
                                ? handleRemoveService(week, day, service)
                                : handleAddService(week, day, service)
                            }
                            className="no-swipe"
                            sx={{
                              textTransform: "none",
                              padding: "4px 12px",
                              minWidth: "auto",
                              borderRadius: "6px",
                              boxShadow: 1,
                              bgcolor: isAllowed
                                ? "rgba(254, 211, 230, 0.6)"
                                : "rgba(0,0,0,0)",
                              color: "rgba(36,36,36,1)",
                              "&:hover": {
                                boxShadow: 1,
                                bgcolor: isMobile
                                  ? undefined
                                  : "rgba(234, 194, 212, 0.6)",
                              },
                            }}
                          >
                            {service}
                          </Button>
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        );
      })}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Сохранить</DialogTitle>
        <DialogContent>
          <Typography>Вы уверены, что хотите сохранить изменения?</Typography>

          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#f8eff47a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              <CircularProgress sx={{ color: theme.palette.text.primary }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeModal}
            sx={{
              "&:hover": {
                bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
              },
            }}
          >
            Отмена
          </Button>
          <Button
            color="success"
            onClick={handleSave}
            sx={{
              "&:hover": {
                bgcolor: isMobile ? "rgba(0,0,0,0)" : undefined,
              },
            }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
