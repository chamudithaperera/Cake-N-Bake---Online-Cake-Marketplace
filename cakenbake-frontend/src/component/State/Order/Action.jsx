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