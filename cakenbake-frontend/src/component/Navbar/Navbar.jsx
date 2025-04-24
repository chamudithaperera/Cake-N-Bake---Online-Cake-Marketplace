import { Alert, Avatar, Badge, IconButton, useMediaQuery, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMenu } from "react-icons/io5";
import './Navbar.css';

const Navbar = ({ handleDrawer, isAddmin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, cart } = useSelector(store => store);
    const isSmallScreen = useMediaQuery('(max-width:1024px)');
    const prodileMenuShow = location.pathname.includes('/profile') || location.pathname.includes('/admin/restaurants');

    const handleAvatarClick = () => {
        if (auth.user.role === "ROLE_CUSTOMER") {
            navigate("/profile");
        } else {
            navigate("/admin/restaurants/details");
        }
    }

    const handleCart = () => {
        if (auth.user) {
            navigate("/cart");
        } else {
            navigate('account/login');
        }
    }

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    {isSmallScreen && prodileMenuShow && (
                        <IconButton className='menu-button' onClick={handleDrawer}>
                            <IoMenu />
                        </IconButton>
                    )}
                    <Link to={isAddmin ? '/admin/restaurants' : '/'} className='logo-link'>
                        <div className='logo-container'>
                            <h1 className='logo-text'>
                                {!isAddmin ? (
                                    <>Cake <span className='logo-accent'>N</span> Bake</>
                                ) : (
                                    isSmallScreen ? "Cake N Bake" : "Cake N Bake Admin"
                                )}
                            </h1>
                        </div>
                    </Link>
                </div>

                <div className='navbar-right'>
                    <div className='nav-links'>
                        <Link to="/" className='nav-link'>Home</Link>
                        <Link to="/featured-cakes" className='nav-link'>Featured Cakes</Link>
                        <Link to="/cake-shops" className='nav-link'>Cake Shops</Link>
                        {auth?.user && <Link to="/orders" className='nav-link'>Orders</Link>}
                    </div>
                    <div className='nav-actions'>
                        {auth?.user ? (
                            <IconButton className='nav-button' onClick={handleAvatarClick}>
                                <Avatar className='user-avatar'>
                                    {auth?.user?.fullName[0].toUpperCase()}
                                </Avatar>
                            </IconButton>
                        ) : (
                            <Button 
                                variant="contained" 
                                className='login-button'
                                onClick={() => navigate("/account/login")}
                            >
                                Login
                            </Button>
                        )}

                        {!isAddmin && (
                            <IconButton className='nav-button cart-button' onClick={handleCart}>
                                <Badge 
                                    color='primary' 
                                    badgeContent={cart?.cartItems?.length}
                                    className='cart-badge'
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
