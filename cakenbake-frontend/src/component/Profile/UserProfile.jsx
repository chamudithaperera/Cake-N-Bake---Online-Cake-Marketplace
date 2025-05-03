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
           <div>
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>
            <Button
            startIcon={<LogoutRounded />}
            onClick={handleLogout}
            variant="outlined">
            Logout
            </Button>
 
        </div>
    );
};
export default UserProfile;