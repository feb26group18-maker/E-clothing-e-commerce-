package com.example.demo.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.WishlistRequest;
import com.example.demo.entities.Wishlist;
import com.example.demo.service.WishlistService;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(
            WishlistService wishlistService){
        this.wishlistService = wishlistService;

    }

    /*
       Add wishlist

       First click heart:
       status = 1

       Second click heart:
       status = 0
    */

    @PostMapping
    public Wishlist addWishlist(
            @RequestBody WishlistRequest request){
        return wishlistService.addWishlist(request);

    }

    /*
       Get customer wishlist

       Only status = 1 records
    */

    @GetMapping("/{customerId}")
    public List<Wishlist> getWishlist(
            @PathVariable Integer customerId){
        return wishlistService.getWishlist(customerId);
    }

    /*
       Remove wishlist item
    */

    @PutMapping("/remove/{customerId}/{productId}")
    public Wishlist removeWishlist(
            @PathVariable Integer customerId,
            @PathVariable Integer productId){

        return wishlistService.removeWishlist(
                customerId,
                productId
        );

    }

}