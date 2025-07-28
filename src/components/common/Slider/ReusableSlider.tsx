"use client";
import { ReactNode } from "react";
import Slider from "react-slick";

interface ReusableSliderProps {
  children: ReactNode;
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  dots?: boolean;
  arrows?: boolean;
  autoplay?: boolean;
  speed?: number;
   swipeToSlide: boolean,
  responsive?: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll?: number;
      infinite?: boolean;
      dots?: boolean;
    };
  }>;
  className?: string;
}

export const ReusableSlider = ({
  children,
  slidesToShow = 3,
  slidesToScroll = 1,
  infinite = false,
  dots = false,
  autoplay = false,
  speed = 500,
  responsive = [],
  className = "",
  swipeToSlide = true,
}: ReusableSliderProps) => {
  const settings = {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    autoplay,
    responsive,
    swipeToSlide
    
  };

  return (
    <div className={`${className}`}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};