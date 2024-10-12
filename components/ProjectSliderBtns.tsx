"use client";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export default function ProjectSliderBtns({
  containerStyles,
  btnStyles,
  iconStyles,
}: {
  containerStyles: string;
  btnStyles: string;
  iconStyles: string;
}) {
  const swiper = useSwiper();

  return (
    <div className={containerStyles} dir="ltr">
      <button className={btnStyles} onClick={() => swiper.slidePrev()}>
        <CaretLeftIcon className={iconStyles} />
      </button>
      <button className={btnStyles} onClick={() => swiper.slideNext()}>
        <CaretRightIcon className={iconStyles} />
      </button>
    </div>
  );
}
