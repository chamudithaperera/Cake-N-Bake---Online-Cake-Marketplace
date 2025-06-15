import * as actionTypes from './ActionTypes';
import { LOGOUT } from '../Authentication/ActionTypes';

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: false
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            localStorage.removeItem("jwt");
            return {
                ...state,
                cartItems: [],
                cart: null,
                success: "logout success"
            };
        default:
            return state;
    }
};

export default cartReducer;
