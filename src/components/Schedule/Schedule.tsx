import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  Checkbox,
  FormControl,
  MenuItem,
  Menu,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { rules } from "../../constants/schedule";
import { weekdays } from "../../constants/weekdays";
import { servicelist } from "../../constants/servicelist";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";
import { FilterList } from "@mui/icons-material";
import useScheduleActions from "../../hooks/useScheduleActions";

function Schedule() {
  const weeks = [1, 2];
  const theme = useTheme();

  const {
    selectedServices,
    setSelectedServices,
    currentWeekNumber,
    handleClick,
    handleClose,
    handleClear,
    toggleService,
    open,
    anchorEl,
  } = useScheduleActions();

  return (
    <Box
      sx={{
        px: 8,
        py: 8,
        backgroundColor: theme.palette.custom.sectionLight,
        gap: 2,
        flexDirection: "row",
      }}
      id="schedule"
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Расписание
        </Typography>
        <Box display={"flex"} gap={3} mb={1}>
          <Button
            onClick={handleClick}
            sx={{
              bgcolor: theme.palette.custom.sectionLight,
              // border: "1px solid #de8fcdff",
              color: "#ba68a9ff",
              padding: "0 2px",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              width: "fit-content",
              // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              // "&:hover": {
              //   bgcolor: "#c877b4b3",
              //   color: "white",
              //   boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              // },
              "&:active": {
                transform: "scale(0.97)",
              },
            }}
          >
            <Typography mr={1}>Список услуг</Typography>
            <FilterList />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          alignItems={"center"}
          gap={0.5}
          flexWrap="wrap"
          minHeight={35}
          mb={1}
        >
          <AnimatePresence mode="popLayout">
            {selectedServices.map((s) => (
              <Box
                component={motion.div}
                key={s}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgba(36, 36, 36, 1)",
                  border: "1px solid #848484",
                  bgcolor: "rgba(254, 211, 230, 0.6)",
                  borderRadius: "4px",
                  px: 2,
                  maxHeight: 35,
                  py: 0.5,
                  gap: 1,
                }}
              >
                <Typography noWrap variant="body2">
                  {s}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    setSelectedServices((prev) =>
                      prev.filter((item) => item !== s)
                    )
                  }
                  sx={{
                    pb: 0.8,
                    width: 25,
                    height: 25,
                    borderRadius: 20,
                    color: "rgba(107, 107, 107, 1)",
                    "&:hover": { bgcolor: "rgba(207, 207, 207, 0.3)" },
                  }}
                >
                  ×
                </IconButton>
              </Box>
            ))}
          </AnimatePresence>
        </Box>
        <FormControl>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {servicelist.map((service) => (
              <MenuItem
                key={service}
                onClick={() => {
                  setSelectedServices((prev) =>
                    prev.includes(service)
                      ? prev.filter((s) => s !== service)
                      : [...prev, service]
                  );
                }}
                value={service}
              >
                <Checkbox
                  sx={{
                    "&.Mui-checked": { color: "#ba68a9ff" },
                  }}
                  checked={selectedServices.includes(service)}
                />
                <Typography>{service}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </FormControl>
      </Box>
      {selectedServices.length ? (
        <Button
          onClick={handleClear}
          sx={{
            bgcolor: theme.palette.custom.sectionLight,
            // border: "1px solid #de8fcdff",
            color: "#ba68a9ff",
            padding: "0 2px",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            width: "fit-content",
            // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            // "&:hover": {
            //   bgcolor: "#c877b4b3",
            //   color: "white",
            //   boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            // },
            "&:active": {
              transform: "scale(0.97)",
            },
          }}
        >
          <Typography mr={1}>Очистить</Typography>
        </Button>
      ) : null}
      {weeks.map((week) => (
        <motion.div layout transition={{ duration: 0.1 }}>
          <Accordion
            key={week}
            sx={{
              boxShadow: "none",
              bgcolor: theme.palette.custom.sectionLight,
            }}
            defaultExpanded={week === currentWeekNumber}
          >
            <motion.div layout transition={{ duration: 0.1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  Неделя {week}{" "}
                  <span style={{ color: "rgba(151, 74, 138, 0.7)" }}>
                    {week === currentWeekNumber && "- текущая"}
                  </span>
                </Typography>
              </AccordionSummary>
            </motion.div>
            <AccordionDetails sx={{ p: 0, mb: 2 }}>
              <Grid container spacing={2}>
                <AnimatePresence mode="sync">
                  {Object.entries(rules[week])
                    .filter(([_, rule]) => {
                      if (selectedServices.length === 0) return true;
                      return (
                        rule.allowed === "all" ||
                        rule.allowed.some((s: string) =>
                          selectedServices.includes(s)
                        )
                      );
                    })
                    .map(([dayIndex, rule]) => (
                      <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={dayIndex}
                        sx={{ display: "grid" }}
                      >
                        <Box
                          component={motion.div}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          p={2}
                          border="1px solid #ccc"
                          borderRadius="12px"
                          boxShadow={2}
                          display="flex"
                          flexDirection="column"
                          gap={1}
                          flexGrow={1}
                        >
                          <Typography variant="subtitle1">
                            <strong>{weekdays[Number(dayIndex)]}</strong>
                          </Typography>
                          {rule.startHour === 20 ? (
                            <Typography variant="body2">
                              Только на 20:00
                            </Typography>
                          ) : (
                            <Typography variant="body2">
                              {rule.startHour}:00 - 20:00
                            </Typography>
                          )}
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {(rule.allowed === "all"
                              ? servicelist
                              : rule.allowed
                            ).map((s) => (
                              <Button
                                onClick={() => toggleService(s)}
                                key={s}
                                variant="outlined"
                                sx={{
                                  color: "rgba(36, 36, 36, 1)",
                                  border: "1px solid #848484",
                                  backgroundColor: selectedServices.includes(s)
                                    ? "rgba(254, 211, 230, 0.6)"
                                    : "rgba(0, 0, 0, 0)",
                                  "&:hover": {
                                    bgcolor: "rgba(234, 194, 212, 0.6)",
                                  },
                                  fontSize: "0.8rem",
                                  padding: "4px 10px",
                                  textTransform: "none",
                                }}
                              >
                                {s}
                              </Button>
                            ))}
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                </AnimatePresence>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Box>
  );
}

export default Schedule;
