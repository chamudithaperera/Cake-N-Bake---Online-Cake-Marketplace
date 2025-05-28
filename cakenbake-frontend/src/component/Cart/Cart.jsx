

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

