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

export const addItemToCart = (reqData) => {
    console.log(reqData);
    return async (dispach) => {
        dispach({ type: ADD_ITEM_TO_CART_REQUEST });

        try {
            const { data } = await api.put(`/api/cart-item/add`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            });

            if (data == "") {
                let timerInterval;
                Swal.fire({
                    text: "Item alreday added",
                    icon: "info",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    willClose: () => clearInterval(timerInterval)
                });
                return;
            }

            await Swal.fire({
                title: "Add item succesfully",
                timer: 1500,
                showConfirmButton: false,
                icon: "success"
            });

            console.log("Add to cart ok", data);
            dispach({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });

        } catch (error) {
            console.log(error);
            dispach({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
        }
    }
}