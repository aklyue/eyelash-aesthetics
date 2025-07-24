import { Link, Paper, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "../TelegramIcon";
import { WithIsMobile } from "../../../types";

function LinkSection({ isMobile }: WithIsMobile) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: isMobile ? 0 : 4,
        borderRadius: 4,
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Связь со мной
      </Typography>
      <Typography variant="subtitle1" color="#919191" mb={6}>
        Оставьте заявку или свяжитесь напрямую — я отвечу в ближайшее время
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        justifyContent={isMobile ? "space-evenly" : undefined}
        borderTop={"1px solid lightgray"}
        borderBottom={"1px solid lightgray"}
        py={2}
      >

        <Link href="https://wa.me/79537932267" target="_blank">
          <WhatsAppIcon
            sx={{
              fontSize: 60,
              color: "#25D366",
              transition: "0.3s",
              "&:hover": { opacity: 0.7 },
            }}
          />
        </Link>

        <Link href="https://t.me/eyelash_aesthetic" target="_blank">
          <TelegramIcon
            sx={{
              fontSize: 60,
              color: "#0088cc",
              transition: "0.3s",
              "&:hover": { opacity: 0.7 },
            }}
          />
        </Link>
      </Stack>
    </Paper>
  );
}

export default LinkSection;
