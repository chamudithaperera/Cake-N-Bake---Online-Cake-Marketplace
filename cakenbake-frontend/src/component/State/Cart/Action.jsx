export const findCart = (token) => {
    return async (dispach) => {
        dispach({ type: FIND_CART_REQUEST });

        try {
            const response = await api.get(`/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("My Cart", response.data);
            dispach({ type: FIND_CART_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("error show cart", error);
            dispach({ type: FIND_CART_FAILURE, payload: error });
        }
    }
}

export const getAllCartItems = (reqData) => {
    return async (dispach) => {
        dispach({ type: GET_ALL_CART_ITEMS_REQUEST });

        try {
            const response = await api.get(`/api/carts/${reqData.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            });

            dispach({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
            console.log("All Cart Items", response.data);
        } catch (error) {
            console.log(error);
            dispach({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
        }
    }
}