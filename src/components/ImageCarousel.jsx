import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import airplaine from '../assets/airplane.jpg'
import familyTravel from '../assets/family-travelling.jpg'
import travelling from '../assets/travelling.jpg'

const ImageCarousel = () => {
  const images = [
    airplaine,
    familyTravel,
    travelling
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mt-10">
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box
            key={index}
            className="relative w-[500px] h-[400px] overflow-hidden rounded-l-[250px]"
          >
            <img
              src={img}
              className="w-full h-full object-cover"
            />
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
