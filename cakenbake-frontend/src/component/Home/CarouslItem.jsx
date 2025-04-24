import React from 'react';

const CarouselItem = ({ image, title, price }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-1 p-6 '>
            <img
                src={image}
                alt=""
                className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center'
            />
            <br />
            <span className='font-semibold text-gray-400 text-lg'>{title}</span>
            <span className='font-semibold text-gray-400 text-lg'>Rs : {price}.00</span>
        </div>
    );
};

export default CarouselItem;
