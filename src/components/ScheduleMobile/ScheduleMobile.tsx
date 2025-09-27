import React, { useState, useRef } from "react";
import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";

import useScheduleActions from "../../hooks/useScheduleActions";
import { rules } from "../../constants/schedule";
import { weekdays } from "../../constants/weekdays";
import { servicelist } from "../../constants/servicelist";

function ScheduleMobile() {
  const {
    selectedServices,
    setSelectedServices,
    currentWeekNumber,
    handleClick,
    handleClose,
    toggleService,
    open,
    anchorEl,
  } = useScheduleActions();

  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(currentWeekNumber === 1 ? 0 : 1);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    swiperRef.current?.slideTo(newValue);
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 8,
        backgroundColor: theme.palette.custom.sectionLight,
        gap: 2,
        flexDirection: "column",
      }}
      id="schedule"
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Расписание
        </Typography>
        <Button
          onClick={handleClick}
          sx={{
            bgcolor: theme.palette.custom.sectionLight,
            border: "1px solid #de8fcdff",
            color: "#ba68a9ff",
            padding: "8px 10px",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            mb: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "#c877b4b3", color: "white" },
            "&:active": { transform: "scale(0.97)" },
          }}
        >
          <Typography mr={1}>Услуги</Typography>
          <FilterList />
        </Button>
      </Box>

      <Box
        display="flex"
        gap={0.5}
        minHeight={35}
        alignItems="center"
        flexWrap="wrap"
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
                px: 1,
                maxHeight: 30,
                py: 0.5,
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
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
              onClick={() => toggleService(service)}
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
      <motion.div layout transition={{ duration: 0.1 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ "& .MuiTabs-indicator": { backgroundColor: "#ba68a9ff" } }}
        >
          {[1, 2].map((week, i) => (
            <Tab
              key={week}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontSize={"0.875rem"}>Неделя {week}</Typography>
                  {currentWeekNumber === week && (
                    <Chip
                      size="small"
                      sx={{
                        height: 5,
                        width: 5,
                        bgcolor: "#ba68a9ff",
                        borderRadius: "20px",
                      }}
                    />
                  )}
                </Box>
              }
              sx={{
                "&.Mui-selected": { color: "#ba68a9ff !important" },
              }}
            />
          ))}
        </Tabs>
      </motion.div>
      <motion.div layout transition={{ duration: 0.1 }}>
        <Swiper
          onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          initialSlide={activeTab}
          onSlideChange={(swiper: SwiperType) =>
            setActiveTab(swiper.activeIndex)
          }
        >
          {[1, 2].map((week) => (
            <SwiperSlide key={week}>
              <Grid container spacing={2}>
                <AnimatePresence mode="sync">
                  {Object.entries(rules[week])
                    .filter(([_, rule]) =>
                      selectedServices.length === 0
                        ? true
                        : rule.allowed === "all" ||
                          rule.allowed.some((s: string) =>
                            selectedServices.includes(s)
                          )
                    )
                    .map(([dayIndex, rule]) => (
                      <Grid
                        key={dayIndex}
                        size={{ xs: 12, sm: 6, md: 4 }}
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
                          borderBottom="1px solid #ccc"
                          display="flex"
                          flexDirection="column"
                          gap={1}
                          flexGrow={1}
                        >
                          <Typography variant="subtitle1">
                            <strong>{weekdays[Number(dayIndex)]}</strong>
                          </Typography>
                          <Typography variant="body2">
                            {rule.startHour === 20
                              ? "Только на 20:00"
                              : `${rule.startHour}:00 - 20:00`}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {(rule.allowed === "all"
                              ? servicelist
                              : rule.allowed
                            ).map((s) => (
                              <Button
                                key={s}
                                onClick={() => toggleService(s)}
                                variant="outlined"
                                sx={{
                                  color: "rgba(36,36,36,1)",
                                  border: "1px solid #848484",
                                  backgroundColor: selectedServices.includes(s)
                                    ? "rgba(254, 211, 230, 0.6)"
                                    : "transparent",
                                  fontSize: "0.8rem",
                                  padding: "2px 10px",
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
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Box>
  );
}

export default ScheduleMobile;
