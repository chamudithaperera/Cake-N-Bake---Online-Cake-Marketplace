import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from '../component/Navbar/Navbar';
import Home from '../component/Home/Home';
import Auth from '../component/Auth/Auth';

const CustomerRouter = () => {
    const location = useLocation();

    // Check if the current path matches the payment success or fail paths
    const showNavbar = !location.pathname.includes('/success-payment') &&
        !location.pathname.includes('/fail-payment') &&
        !location.pathname.startsWith('/profile');

    return (
        <div>
            {showNavbar && <Navbar />}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account/:register' element={<Home />} />
            </Routes>
            <Auth />
        </div>
    );
}

export default CustomerRouter;