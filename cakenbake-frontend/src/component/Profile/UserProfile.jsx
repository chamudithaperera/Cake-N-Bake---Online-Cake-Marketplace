import React from 'react';
import { Avatar, Button } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';

const UserProfile = () => {
  // Dummy user data for UI demonstration
  const user = {
    email: 'user@example.com',
    name: 'John Doe',
    avatar: '', // Add a URL if you want to show an avatar image
  };

  // Dummy logout handler (no backend)
  const handleLogout = () => {
    alert('Logged out!');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar src={user.avatar}>{user.name[0]}</Avatar>
      <div>
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>
      <Button
        startIcon={<LogoutRounded />}
        onClick={handleLogout}
        variant="outlined"
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
