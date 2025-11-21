import { useCallback, useState } from "react";
import type { Swiper as SwiperType } from "swiper/types";

export const useSwiperSlider = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const initialize = useCallback((swiperInstance: SwiperType) => {
    setSwiper(swiperInstance);
  }, []);

  const slideNext = useCallback(() => {
    if (swiper) swiper.slideNext();
  }, [swiper]);

  const slidePrev = useCallback(() => {
    if (swiper) swiper.slidePrev();
  }, [swiper]);

  return {
    initialize,
    slideNext,
    slidePrev,
  };
};
