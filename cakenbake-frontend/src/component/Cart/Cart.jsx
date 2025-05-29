import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import { React, useEffect, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, createPaymentLink } from '../State/Order/Action';
import { useNavigate } from 'react-router-dom';
import { addAddress, getUser } from '../State/Authentication/Action';
import Swal from 'sweetalert2';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Cart() {
    const { cart, auth } = useSelector(store => store);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();

    const handleOpenAddresModal = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    const handleAddItemsNavigation = () => {
        auth?.user?.favorites.length > 0 ? navigate('/profile/favorites') : (navigate('/'))
    }

    const handleOnSubmit = (values) => {
        if (cart.cartItems.length === 0) {
            handleClose();
            Swal.fire({
                icon: "question",
                text: "Cart is empty",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        }

        handleClose();
        Swal.fire({
            title: "Confirm order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            html: `
                <div style="display:block; font-size: 14px; color:black; border: 3px solid #ccc; padding: 10px;">
                <div><h1>Location Type : ${values?.location}</h1></div>
                <div><p>Address : ${values?.streetAddress}</p></div>
                <div><p>City : ${values?.city}</p></div>
                <div><p>Mobile : ${values?.mobile}</p></div>
                </div>
                <br/>
                <div style="display:block; font-size: 14px; color:black; border: 3px solid #ccc; padding: 10px;">
                <div><h1>Delivery Free : 0.00</h1></div>
                <div><h1>Total Price : ${cart?.cart?.total}</h1></div>
                </div>
            `,
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    jwt: localStorage.getItem("jwt"),
                    total: cart?.cart?.total,
                    deliveryAddress: {
                        fullName: auth.user?.fullName,
                        streetAddress: values.streetAddress,
                        city: values.city,
                        mobile: values.mobile,
                        locationType: values.location
                    }
                }
                dispatch(createPaymentLink(data));
            }
        });
    }

    const initialValues = {
        location: '',
        streetAddress: '',
        mobile: '',
        city: '',
    }

    const validationSchema = Yup.object().shape({
        location: Yup.string().required('Location Type is required'),
        streetAddress: Yup.string().required('Street Address is required'),
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(/^[0-9]+$/, 'Mobile must be a number')
            .min(10, 'Mobile must be at least 10 digits')
            .max(15, 'Mobile must be less than 15 digits'),
        city: Yup.string().required('City is required'),
    });

    return (
        <>
            <main className='justify-between lg:flex'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart?.cartItems.length > 0 ? (
                        cart.cartItems?.map(item => <CartItem key={item.id} item={item} />)
                    ) : (
                        <div className='px-20'>
                            <div className='flex justify-center'>
                                <Button onClick={handleAddItemsNavigation} fullWidth variant='outlined'>
                                    Add Items
                                </Button>
                            </div>
                        </div>
                    )}
                    <Divider />
                    <div className='px-5 text-sm billDetails'>
                        <p className='py-5 font-extralight'>Bill Details</p>
                        <div className='pb-3 space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>Rs. {cart?.cart?.total}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Delivery Free</p>
                                <p>Rs. 00</p>
                            </div>
                        </div>
                        <Divider />
                        <div className='flex justify-between text-gray-400'>
                            <p>Total pay</p>
                            <p>Rs. {cart?.cart?.total}</p>
                        </div>
                    </div>
                </section>

                <Divider orientation='vertical' flexItem />

                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='py-10 text-2xl font-semibold text-center'>Choose Delivery Address</h1>
                        <div className='flex flex-wrap justify-center gap-5'>
                            {auth?.address?.map(item => (
                                <AddressCard key={item.id} item={item} showbtn={true} handleClose={handleClose} />
                            ))}
                            <Card className='flex w-64 gap-5 p-5'>
                                <AddLocationIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='text-lg font-semibold text-white'>Add New Address</h1>
                                    <Button variant='contained' fullWidth onClick={handleOpenAddresModal}>
                                        Add
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleOnSubmit}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h1 className='flex justify-center text-xl font-bold text-gray-400'>Add Address</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="location"
                                        label="Location Type"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="location" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Address"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="streetAddress" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="mobile"
                                        label="Mobile"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="mobile" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="city" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type='submit' color='primary'>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
}

export default Cart;