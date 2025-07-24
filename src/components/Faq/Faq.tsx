import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { faqs } from "../../constants/faqs";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Faq() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        px: isMobile ? 2 : 8,
        py: 8,
        backgroundColor: theme.palette.custom.sectionLight,
        display: "flex",
        gap: 2,
        flexDirection: isMobile ? "column" : "row",
      }}
      id="faq"
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Часто задаваемые вопросы
      </Typography>

      <Box sx={{ transition: "all 0.3s ease-in-out" }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              width: "100%",
              mx: "auto",
              borderTop: index !== 0 ? "1px solid lightgray" : "none",
              boxShadow: "none",
              bgcolor: theme.palette.custom.sectionLight,
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
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
