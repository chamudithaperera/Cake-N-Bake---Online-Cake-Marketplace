import { Button, Card } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createPaymentLink } from '../State/Order/Action';

const { cart, auth } = useSelector(store => store);
const dispatch = useDispatch();

const createOrderUsingSelectedAddress = () => {
    if (cart.cartItems.length === 0) {
        Swal.fire({ icon: "question", text: "Cart is empty", timer: 2000, timerProgressBar: true, showConfirmButton: false });
        return;
    }
    Swal.fire({
        title: "Confirm order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        html: `<div style="color:black;">Location: ${item?.locationType}, Address: ${item?.streetAddress}, City: ${item?.city}, Mobile: ${item?.mobile}</div>
               <div>Total: ${cart?.cart?.total}</div>`,
    }).then((result) => {
        if (result.isConfirmed) {
            const data = {
                jwt: localStorage.getItem("jwt"),
                total: cart?.cart?.total,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: item.streetAddress,
                    city: item.city,
                    mobile: item.mobile,
                    locationType: item.locationType
                }
            };
            dispatch(createPaymentLink(data));
        }
    });
};

const AddressCard = ({ item }) => {
    return (
        <Card className='flex w-64 gap-5 p-5'>
            <div className='flex-row '>
                <div><HomeIcon /></div>
                <div><h1>{item?.locationType}</h1></div>
                <div><p>{item?.streetAddress}</p></div>
                <div><p>{item?.city}</p></div>
                <div><p>{item?.mobile}</p></div>
                <div><Button variant='outlined' fullWidth>Select</Button></div>
            </div>
        </Card>
    );
};

export default AddressCard;
