package com.example.demo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.demo.dto.WishlistRequest;
import com.example.demo.entities.Wishlist;
import com.example.demo.repository.WishlistRepository;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;

    public WishlistService(
            WishlistRepository wishlistRepository){

        this.wishlistRepository = wishlistRepository;

    }

    // Add or remove wishlist
    public Wishlist addWishlist(
            WishlistRequest request){


        Wishlist wishlist =
                wishlistRepository
                .findByCustomerIdAndProductId(
                        request.getCustomerId(),
                        request.getProductId()
                )
                .orElse(null);

        // already exists
        if(wishlist != null){


            if(wishlist.getStatus()==1){

                // remove from wishlist
                wishlist.setStatus(0);
            }
            else{

                // add again
                wishlist.setStatus(1);

            }

            return wishlistRepository.save(wishlist);
        }

        // first time add

        Wishlist newWishlist =
                new Wishlist();

        newWishlist.setCustomerId(
                request.getCustomerId()
        );

        newWishlist.setProductId(
                request.getProductId()
        );

        newWishlist.setStatus(1);
        return wishlistRepository.save(newWishlist);
    }


    // get wishlist page
    public List<Wishlist> getWishlist(
            Integer customerId){
        return wishlistRepository
                .findByCustomerIdAndStatus(
                        customerId,
                        1
                );

    }

    // remove wishlist manually
    public Wishlist removeWishlist(
            Integer customerId,
            Integer productId){
        Wishlist wishlist =
                wishlistRepository
                .findByCustomerIdAndProductId(
                        customerId,
                        productId
                )
                .orElseThrow(
                  () -> new RuntimeException(
                    "Wishlist item not found"
                  )
                );

        wishlist.setStatus(0);

        return wishlistRepository.save(wishlist);

    }
    
    public Wishlist removeFromWishlistAfterCart(
            Integer customerId,
            Integer productId){


        Wishlist wishlist =
                wishlistRepository
                .findByCustomerIdAndProductId(
                        customerId,
                        productId
                )
                .orElse(null);


        // Product was not in wishlist
        if(wishlist == null){
            return null;
        }


        wishlist.setStatus(0);


        return wishlistRepository.save(wishlist);
    }

}