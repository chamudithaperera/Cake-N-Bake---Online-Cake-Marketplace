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
        {navItems.map((item) => (
            <NavLink
                key={item.path}
                to={`/profile${item.path}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    textDecoration: isActive(item.path) ? 'underline' : 'none',
                    margin: '8px 0',
                }}
            >
                {item.icon}
                {item.label}
            </NavLink>
        ))}
    </nav>
);

};
export default ProfileNavigation;
