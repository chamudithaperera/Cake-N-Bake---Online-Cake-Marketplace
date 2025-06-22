import { api } from '../../config/api';
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_PAYMENT_LINK_FAILURE, CREATE_PAYMENT_LINK_REQUEST, CREATE_PAYMENT_LINK_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from './ActionTypes';
import Swal from 'sweetalert2';

export const createOrder = (reqData) => {
    console.log(reqData);
    return async (dispatch) => {

        dispatch({ type: CREATE_ORDER_REQUEST });

        try {

            const {data}=await api.post(`/api/order/create`,
                {
                    deliveryAddress: reqData.deliveryAddress,
                    restaurantId:reqData.restaurantId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }

            );

            console.log("Order create succsefully", data);
        } catch (error) {
            console.log(error);
            
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    }
}

export const createPaymentLink = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_PAYMENT_LINK_REQUEST });

        try {
            const { data } = await api.post(`/api/order/payment`,
                {
                    deliveryAddress: reqData.deliveryAddress,
                    total: reqData.total,
                },
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    }
                }
            );
            
            const address = data.address;
            localStorage.setItem("selectedAddress", JSON.stringify(address));

            // Create order directly instead of redirecting
            const orderData = {
                jwt: reqData.jwt,
                restaurantId: data.restaurantId,
                deliveryAddress: reqData.deliveryAddress
            };
            
            await dispatch(createOrder(orderData));
            
            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Order Successful!',
                text: 'Your order has been placed successfully.',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

        } catch (error) {
            console.log(error);
            dispatch({ type: CREATE_PAYMENT_LINK_FAILURE, payload: error });
            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: 'There was an error processing your order. Please try again.',
                confirmButtonColor: '#3085d6'
            });
        }
    }
}