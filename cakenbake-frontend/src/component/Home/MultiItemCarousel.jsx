import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const MultiItemCarousel = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false
    };

    return (
        <div className="relative px-2">
            <Slider {...settings}>
                {/* Items will be rendered here */}
            </Slider>
        </div>
    );
};

export default MultiItemCarousel;
