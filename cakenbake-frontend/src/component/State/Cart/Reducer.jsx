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
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CART_ITEM_REQUEST:
        case actionTypes.REMOVE_CART_ITEM_REQUEST:
       
            return {
                ...state,
                loading: null,
                error: null,


            };
        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.item
            };

        case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload
            };

        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [action.payload, ...state.cartItems]
            };

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
