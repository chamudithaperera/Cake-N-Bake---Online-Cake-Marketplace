package com.example.demo.service;
import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Restaurant;
import com.example.demo.request.AddCartItemRequest;
import org.springframework.stereotype.Service;


public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId,String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    Long calculateCartTotalsByRestaurantID(Cart cart, Restaurant restaurant) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;
}
