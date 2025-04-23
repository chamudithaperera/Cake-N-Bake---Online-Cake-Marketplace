import React from 'react';
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const MultiItemCarousel = ({ foods }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: foods?.length || 5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: Math.min(foods?.length || 3, 3),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: Math.min(foods?.length || 2, 2),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="relative px-2">
            <Slider {...settings}>
                {foods?.map((item) => (
                    <CarouselItem
                        key={item.id}
                        image={item.images[0]}
                        title={item?.name}
                        price={item?.price}
                        restaurantId={item?.restaurant?.id}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default MultiItemCarousel;
