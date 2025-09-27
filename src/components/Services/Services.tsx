import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import { services } from "../../constants/services";
import { useState } from "react";

const sectionTitles: Record<keyof typeof services, string> = {
  extension: "Наращивание ресниц",
  removal: "Снятие ресниц",
  extra: "Дополнительные эффекты",
  lamination: "Ламинирование и окрашивание",
  correction: "Коррекция ресниц",
};

export default function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      id="services"
      sx={{
        px: isMobile ? 2 : 8,
        py: 8,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={4} gutterBottom>
        Мои услуги
      </Typography>

      <Stack>
        {Object.entries(services).map(([key, list], index) => (
          <Accordion
            component={motion.div}
            initial={{ opacity: 0, y: 10, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={key}
            disableGutters
            onChange={handleChange(index)}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              borderTop: index !== 0 ? "1px solid lightgray" : "none",
            }}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    transform:
                      expanded === index ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon sx={{ fontSize: 24 }} />
                </Box>
              }
            >
              <Typography fontWeight={600}>
                {sectionTitles[key as keyof typeof services] || key}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {list.map((item, index) => (
                  <Box key={index}>
                    <Box
                      display="flex"
                      flexDirection={isMobile ? "column" : "row"}
                      justifyContent="space-between"
                      alignItems={isMobile ? "flex-start" : "center"}
                      gap={1}
                      sx={{ pl: 2 }}
                    >
                      <Typography>{item.label}</Typography>
                      <Typography fontWeight={600}>{item.price}</Typography>
                    </Box>
                    {index < list.length - 1 && (
                      <Divider sx={{ borderColor: "#f4b8d2", mt: 1 }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}
