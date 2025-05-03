import React from 'react';
import { Avatar, Button } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';

const UserProfile = () => {

    const user = {
        email: 'user@example.com',
        name: 'John Doe',
        avatar: '',
    };
    const handleLogout = () => {
        alert('Logged out!');
    };

    return (
        <div>
            
        </div>
    );
};
export default UserProfile;