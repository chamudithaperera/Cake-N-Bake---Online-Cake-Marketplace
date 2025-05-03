import React from 'react';
import { Container } from '@mui/material';
import ProfileNavigation from './ProfileNavigation';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

const Profile = () => {
  return (
    <Container>
      <ProfileNavigation />
      <Routes>
        <Route path="" element={<UserProfile />} />
      </Routes>
    </Container>
  );
};

export default Profile;
