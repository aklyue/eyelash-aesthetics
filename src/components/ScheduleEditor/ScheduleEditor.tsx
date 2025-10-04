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
import { servicelist as services } from "../../constants/servicelist";
import { weekdays as weekDays } from "../../constants/weekdays";
import useScheduleEditActions from "../../hooks/useScheduleEditActions";

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
  } = useScheduleEditActions();

  if (!localSchedule) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
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
        <Typography variant="h5">Расписание</Typography>
        <Button onClick={openModal}>
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

            {Object.entries(weekRules).map(([dayStr, rule]) => {
              const day = parseInt(dayStr, 10);
              const dayName = weekDays[day] || `День ${day}`;

              return (
                <Accordion key={day}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body1">
                      <strong>{dayName}</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
                                ? "rgba(242, 191, 214, 0.6)"
                                : "rgba(0,0,0,0)",
                              color: "rgba(36,36,36,1)",
                              "&:hover": {
                                boxShadow: 1,
                                bgcolor: isMobile
                                  ? undefined
                                  : "rgba(222, 177, 197, 0.6)",
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
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Закрыть</Button>
          <Button color="success" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
