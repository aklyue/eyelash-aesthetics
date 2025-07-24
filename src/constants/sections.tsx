import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";

export const sections = [
  { id: "intro", label: "Интро", icon: null },
  { id: "aboutme", label: "Обо мне", icon: <HomeIcon /> },
  { id: "services", label: "Мои услуги", icon: <HomeIcon /> },
  { id: "works", label: "Мои работы", icon: <BarChartIcon /> },
  { id: "contacts", label: "Записаться", icon: <ContactMailIcon /> },
  { id: "faq", label: "FAQ", icon: <HelpIcon /> },
];
