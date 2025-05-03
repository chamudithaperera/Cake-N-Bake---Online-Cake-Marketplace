import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import React from 'react';

const location = useLocation();
const isActive = (path) => location.pathname === `/profile${path}`;
const navItems = [
    { path: '', icon: <Person />, label: 'Profile' }
];

const ProfileNavigation = () => {
    return (
        <nav>
        </nav>
    );
};
export default ProfileNavigation;
