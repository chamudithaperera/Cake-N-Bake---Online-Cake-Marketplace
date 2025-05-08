import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Register from './Register';


const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {

        navigate("/"); 
    }


    return (
        <>
            <Modal onClose={handleOnClose}
                open={location.pathname === "/account/register"}

            >
                <Box sx={style} >
                    {
                        location.pathname === "/account/register" ? (<Register />) :)
                    }
                </Box>
            </Modal>
        </>
    )
}

export default Auth

