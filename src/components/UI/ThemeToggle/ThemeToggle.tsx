import { IconButton, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggle } from "../../../store/slices/themeSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggleFab() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = useTheme();

  const handleToggle = () => {
    dispatch(toggle());
  };

  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        opacity: 0.6,
        "&:hover": {
          opacity: 1,
          bgcolor: theme.palette.custom.sectionLight,
        },
        boxShadow: 3,
        transition: "all 0.2s ease",
        zIndex: 1300,
      }}
    >
      {/* {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />} */}
    </IconButton>
  );
}
