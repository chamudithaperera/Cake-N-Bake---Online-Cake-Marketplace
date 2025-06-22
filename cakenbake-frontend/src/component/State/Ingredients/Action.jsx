import { api } from '../../config/api';
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCKS } from './ActionTypes';
import Swal from 'sweetalert2'

export const getIngredientsOfRestaurant = ({ id, jwt }) => {

    return async (dispach) => {



        try {

            const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {

                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            dispach({ type: GET_INGREDIENTS, payload: response.data });
            console.log("Get Ingredients ", response.data);
        } catch (error) {
            console.log(error)
        }
    }

}