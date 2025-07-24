import { Box, Typography, useTheme } from "@mui/material";
import { ReactComponent as Logo } from "../../../assets/logo/logo.svg";
import { WithIsMobile } from "../../../types";

function Footer({ isMobile }: WithIsMobile) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        backgroundColor: theme.palette.background.default,
        color: "#ccc",
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 1,
          ml: 2,
        }}
      >
        <Logo width={isMobile ? 50 : 70} height={isMobile ? 50 : 70} />
        <Box color={"#333"}>
          <Typography
            variant="h6"
            sx={{ fontFamily: '"Aclonica", sans-serif', lineHeight: 1 }}
          >
            eyelash
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Aclonica", sans-serif',
              fontSize: "0.75rem",
              mt: -0.5,
            }}
          >
            aesthetics
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
