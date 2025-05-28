import { Chip, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';

const CartItem = ({ item }) => {
    return (
        <div className='px-5'>
            <div className='items-center lg:flex lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover rounded-2xl' src={item?.food?.images[0]} alt="" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3'>
                        <p>{item?.food?.name}</p>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-1'>
                                <IconButton><RemoveCircleOutlineIcon /></IconButton>
                                <div className='flex items-center justify-center w-5 h-5 text-xs'>{item?.quantity}</div>
                                <IconButton><AddCircleOutlineIcon /></IconButton>
                            </div>
                        </div>
                        <div className='pt-3 space-x-2'>
                            {item?.ingredients?.map(ingredient => <Chip key={ingredient} label={ingredient} />)}
                        </div>
                    </div>
                    <div><p>Rs. {item.totalPrice}</p></div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
