package com.example.demo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.demo.dto.CartRequest;
import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final WishlistService wishlistService;


    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            WishlistService wishlistService){

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.wishlistService = wishlistService;

    }

    // ADD TO CART
    public CartItem addToCart(
            CartRequest request){
    	if(request.getSize()==null || request.getSize().isEmpty()){

    	    throw new RuntimeException(
    	        "Please select size before adding product to cart"
    	    );

    	}
    	if (request.getQuantity() <= 0) {
    	    throw new RuntimeException(
    	            "Quantity must be greater than 0"
    	    );
    	}
        /*
         * Step 1:
         * Find active cart of customer
         */

        Cart cart =
                cartRepository
                .findByCustomerIdAndCartStatus(
                        request.getCustomerId(),
                        "Active"
                )
                .orElse(null);
        /*
         * Step 2:
         * If cart does not exist
         * create new cart
         */

        if(cart == null){
            cart = new Cart();

            cart.setCustomerId(
                    request.getCustomerId()
            );

            cart.setCartStatus(
                    "Active"
            );

            cart =
              cartRepository.save(cart);
        }

        /*
         * Step 3:
         * Check product already in cart
         */
        CartItem cartItem =
                cartItemRepository
                .findByCartIdAndProductIdAndSize(
                        cart.getCartId(),
                        request.getProductId(),
                        request.getSize()
                )
                .orElse(null);

        /*
         * Step 4:
         * Product already exists
         * Increase quantity
         */
        if(cartItem != null){
            cartItem.setQuantity(
                    cartItem.getQuantity()
                    +
                    request.getQuantity()
            );
        }

        /*
         * Step 5:
         * New product
         */

        else{

            cartItem = new CartItem();
            cartItem.setCartId(
                    cart.getCartId()
            );

            cartItem.setProductId(
                    request.getProductId()
            );
            cartItem.setSize(
                    request.getSize()
            );
            cartItem.setQuantity(
                    request.getQuantity()
            );

        }
        
     // save cart item first
        CartItem savedCartItem =
                cartItemRepository.save(cartItem);

        // remove from wishlist after cart add
        wishlistService.removeFromWishlistAfterCart(
                request.getCustomerId(),
                request.getProductId()
        );

        return savedCartItem;

    }

    // GET CUSTOMER CART
    public List<CartItem> getCartItems(
            Integer customerId){

        Cart cart =
                cartRepository
                .findByCustomerIdAndCartStatus(
                        customerId,
                        "Active"
                )
                .orElse(null);

        if(cart == null){

            return List.of();

        }

        return cartItemRepository
                .findByCartId(
                        cart.getCartId()
                );

    }

    // REMOVE CART ITEM
    public void removeCartItem(
            Integer cartItemId){
        cartItemRepository.deleteById(
                cartItemId
        );

    }
    
 // CLEAR CUSTOMER CART
    public void clearCart(Integer customerId) {

        Cart cart =
                cartRepository
                .findByCustomerIdAndCartStatus(
                        customerId,
                        "Active"
                )
                .orElse(null);

        if (cart == null) {
            return;
        }

        List<CartItem> cartItems =
                cartItemRepository.findByCartId(
                        cart.getCartId()
                );

        cartItemRepository.deleteAll(cartItems);
    }

}