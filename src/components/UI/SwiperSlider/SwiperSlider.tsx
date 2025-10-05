import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Box, GlobalStyles, IconButton, Paper, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useSwiperSlider from "../../../hooks/useSwiperSlider";

import { slides } from "../../../constants/slides";
import { WithIsMobile } from "../../../types";

function SwiperSlider({ isMobile }: WithIsMobile) {
  const { initialize, slideNext, slidePrev } = useSwiperSlider();
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          ".swiper-pagination-bullet": {
            backgroundColor: "rgba(255,255,255,0.3)",
            opacity: 1,
            width: 8,
            height: 8,
            margin: "0 4px",
            transition: "background-color 0.3s ease",
          },
          ".swiper-pagination-bullet-active": {
            backgroundColor: theme.palette.custom.sectionLight,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: 4,
        }}
      >
        {!isMobile && (
          <IconButton
            onClick={slidePrev}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
              mx: 1,
              color: theme.palette.custom.sectionDark,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        <Box
          sx={{
            width: isMobile ? "100%" : "85%",
            position: "relative",
          }}
        >
          <Paper
            sx={{
              borderRadius: 0,
              overflow: "hidden",
              backgroundColor: "transparent",
              boxShadow: isMobile ? 2 : 0,
            }}
          >
            <Swiper
              onSwiper={initialize}
              spaceBetween={isMobile ? 10 : 50}
              slidesPerView={isMobile ? 1 : 3}
              style={{ padding: isMobile ? "0" : "5px" }}
              modules={[Pagination, Autoplay]}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={slide.src}
                    alt={slide.text}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      // borderRadius: 2,
                      display: "block",
                      boxShadow: 2,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Paper>

          {isMobile && (
            <>
              <IconButton
                onClick={slidePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 16,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.4)" },
                  zIndex: 2,
                  color: theme.palette.custom.sectionDark,
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={slideNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 16,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.4)" },
                  zIndex: 2,
                  color: theme.palette.custom.sectionDark,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Box>

        {!isMobile && (
          <IconButton
            onClick={slideNext}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
              mx: 1,
              color: theme.palette.custom.sectionDark,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
}

export default SwiperSlider;
