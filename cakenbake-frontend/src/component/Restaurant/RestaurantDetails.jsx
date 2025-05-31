import { Divider, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../State/Restaurant/Action';
import { useParams } from 'react-router-dom';

const RestaurantDetails = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id, jwt }));
    }, []);

    return (
        <div className='px-5 py-5 lg:px-20 '>

            <section>
                <h3 className='text-gray-500 py-2'>{restaurant.restaurant?.name}</h3>
            </section>

            <div>
                <Grid container spacing={2}>
                    {restaurant?.restaurant?.images.map((item) =>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src={item} alt="" />
                        </Grid>
                    )}
                </Grid>
            </div>

            <div className='pt-3 pb-5'>
                <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                <p className='text-gray-500 mt-1'>
                    {restaurant.restaurant?.description}
                </p>
                <div className='space-y-3 mt-3'>
                    <p className='text-gray-500 flex items-center gap-3'>
                        <LocationOnIcon />
                        <span>
                            {restaurant.restaurant?.address?.streetAddress}, {restaurant.restaurant?.address?.city}
                        </span>
                    </p>
                    <p className='text-gray-500 flex items-center gap-3'>
                        <CalendarTodayIcon />
                        <span>{restaurant.restaurant?.openingHours}</span>
                    </p>
                </div>
            </div>

            <Divider />
        </div>
    )
}

export default RestaurantDetails;
