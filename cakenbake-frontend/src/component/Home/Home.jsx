
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantAction } from '../State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const Home = () => {
    const dispatch = useDispatch();
    const { restaurant, auth } = useSelector((store) => store);
    const restaurants = restaurant?.restaurants;
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = () => {
            dispatch(getAllRestaurantAction());
            const now = new Date().getTime();
            const nextThreeMinuteBoundary = Math.ceil(now / (3 * 60 * 1000)) * (3 * 60 * 1000);
            const delay = Math.max(nextThreeMinuteBoundary - now, 3000);

            setTimeout(fetchData, delay);
        };

        fetchData();

        return () => {
            clearTimeout();
        };
    }, [dispatch]);

    const handleRestaurantChange = async (event, value) => {
        setSelectedRestaurant(value);
        const selected = restaurants.find((item) => item.name === value);
        if (selected) {
            setSelectedRestaurantId(selected.id);
        }
    };

    const goToRestaurant = () => {
        if (auth.user) {
            navigate(`/restaurant/${selectedRestaurantId}`);
        } else {
            navigate('/account/login');
        }
    };

    return (
        <Box sx={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
           
        </Box>
    );
};

export default Home;
