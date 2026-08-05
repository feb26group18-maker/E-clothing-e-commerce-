package com.example.demo.controllers;


import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.CartRequest;
import com.example.demo.entities.CartItem;
import com.example.demo.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(
            CartService cartService){
        this.cartService = cartService;

    }

    /*
     * Add product into cart
     */

    @PostMapping("/add")
    public CartItem addToCart(
            @RequestBody CartRequest request){
        return cartService.addToCart(request);

    }


    /*
     * Get customer cart items
     */

    @GetMapping("/{customerId}")
    public List<CartItem> getCart(
            @PathVariable Integer customerId){
        return cartService.getCartItems(customerId);

    }

    /*
     * Remove product from cart
     */

    @DeleteMapping("/item/{cartItemId}")
    public String removeCartItem(
            @PathVariable Integer cartItemId){
        cartService.removeCartItem(cartItemId);
        return "Cart item removed";
    }
    
    @DeleteMapping("/clear/{customerId}")
    public String clearCart(@PathVariable Integer customerId) {
        cartService.clearCart(customerId);
        return "Cart cleared successfully";
    }

}