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