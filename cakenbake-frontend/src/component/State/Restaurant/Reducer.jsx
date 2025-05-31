import * as actionTypes from './ActionTypes';

const initialState = {

    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    loading: null,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
    foods: []
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action Types handled in the reducer:
case actionTypes.CREATE_RESTAURANT_REQUEST:
case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
case actionTypes.DELETE_RESTAURANT_REQUEST:
case actionTypes.UPDATE_RESTAURANT_REQUEST:
case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:

// Restaurant Success cases:
case actionTypes.CREATE_RESTAURANT_SUCCESS:
    return {
        ...state,
        loading: false,
        usersRestaurant: action.payload
    }

case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
    return {
        ...state,
        loading: false,
        restaurants: action.payload
    }

case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
    return {
        ...state,
        loading: false,
        restaurant: action.payload
    }

case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
case actionTypes.UPDATE_RESTAURANT_SUCCESS:
    return {
        ...state,
        loading: false,
        usersRestaurant: action.payload
    }

case actionTypes.DELETE_RESTAURANT_SUCCESS:
    return {
        ...state,
        error: null,
        loading: false,
        restaurants: state.restaurants.filter(
            (item) => item.id !== action.payload
        ),
        usersRestaurnat:null
    }

// Event creation
case actionTypes.CREATE_EVENTS_SUCCESS:
    return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantsEvents: [...state.restaurantsEvents, action.payload]
    }

case actionTypes.GET_ALL_EVENTS_SUCCESS:
case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
    return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload
    }

case actionTypes.GET_RESTAURANT_EVENTS_SUCCESS_BY_ID:
    return {
        ...state,
        loading: false,
        events: action.payload
    }

case actionTypes.DELETE_EVENTS_SUCCESS:
    return {
        ...state,
        loading: false,
        events: state.events.filter(
            (item) => item.id !== action.payload
        ),
        restaurantsEvents: state.restaurantsEvents.filter(
            (item) => item.id !== action.payload
        )
    }

    }
}

export default restaurantReducer;