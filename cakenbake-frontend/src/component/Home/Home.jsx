
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantAction } from '../State/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField, Container, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import EventCard from '../Profile/EventCard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Home = () => {
    const dispatch = useDispatch();
    const { restaurant, auth } = useSelector((store) => store);
    const restaurants = restaurant?.restaurants;
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
    const navigate = useNavigate();

    const carouselRef = useRef(null);

    const restaurantNameList = restaurants?.filter(item => item?.open).map(item => item?.name) || [];

    const StyledAutocomplete = styled(Autocomplete)({
        '& .MuiAutocomplete-endAdornment': {
            display: 'none',
        },
    });

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

    const handlePrevClick = () => {
        const carousel = carouselRef.current;
        if (carousel && carousel.slickPrev) {
            carousel.slickPrev();
        }
    };

    const handleNextClick = () => {
        const carousel = carouselRef.current;
        if (carousel && carousel.slickNext) {
            carousel.slickNext();
        }
    };

    return (
        <Box sx={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
            <div className='hero-section'>
                <section className='banner'>
                    <div className='banner-content'>
                        <p className='text-4xl md:text-5xl lg:text-6xl'>
                            Discover Amazing Cakes
                        </p>
                        <p className='text-lg md:text-xl'>
                            Find the perfect cake for your special moments
                        </p>
                    </div>
                </section>

                <Container maxWidth="lg">
                    <div className='search-container'>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={9}>
                                <StyledAutocomplete
                                    id='restaurant-search'
                                    options={restaurantNameList}
                                    onChange={handleRestaurantChange}
                                    value={selectedRestaurant}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder='Search for cake shops near you...'
                                            margin='normal'
                                            variant='outlined'
                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: <SearchIcon sx={{ color: '#666', mr: 1 }} />,
                                                style: { backgroundColor: 'var(--light-gray)', borderRadius: 'var(--border-radius)' }
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={goToRestaurant}
                                    sx={{ height: '54px' }}
                                >
                                    Find Cakes
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>

            <div className='featured-section'>
                <div className='container'>
                    <h2 className='section-title'>Featured Cakes</h2>
                    <div style={{ position: 'relative' }}>
                        <button className='carousel-nav-button prev' onClick={handlePrevClick}>
                            <ChevronLeftIcon />
                        </button>
                        <MultiItemCarousel ref={carouselRef} foods={restaurant?.foods} />
                        <button className='carousel-nav-button next' onClick={handleNextClick}>
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className='section-container'>
                <div className='container'>
                    <h2 className='section-title'>Popular Cake Shops</h2>
                    <div className='card-grid'>
                        {restaurant?.restaurants?.map((item) => (
                            <RestaurantCard key={item?.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>

            <div className='section-container'>
                <div className='container'>
                    <h2 className='section-title'>Special Events & Offers</h2>
                    <div className='card-grid'>
                        {restaurant?.restaurantsEvents?.map((item) => (
                            <EventCard key={item?.id} event={item} />
                        ))}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Home;
