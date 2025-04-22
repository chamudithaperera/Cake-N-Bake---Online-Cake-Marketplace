import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { IconButton, useMediaQuery } from '@mui/material';
import { IoMenu } from "react-icons/io5";


const Navbar = ({ isAddmin }) => {
    const isSmallScreen = useMediaQuery('(max-width:1024px)');
const prodileMenuShow = location.pathname.includes('/profile') || location.pathname.includes('/admin/restaurants');

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    {isSmallScreen && prodileMenuShow && (
    <IconButton className="menu-button" onClick={handleDrawer}>
        <IoMenu />
    </IconButton>
)}

                    <Link to={isAddmin ? '/admin/restaurants' : '/'} className="logo-link">
                        <div className="logo-container">
                            <h1 className="logo-text">
                                {!isAddmin ? (
                                    <>Cake <span className="logo-accent">N</span> Bake</>
                                ) : (
                                    "Cake N Bake Admin"
                                )}
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="navbar-right">
    <div className="nav-links"></div>
    <div className="nav-actions"></div>
</div>

            </div>
        </nav>
    );
};

export default Navbar;

