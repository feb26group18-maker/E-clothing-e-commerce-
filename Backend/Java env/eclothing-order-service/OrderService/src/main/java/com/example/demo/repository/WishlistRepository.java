package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist,Integer>{
	 // show only active wishlist items
    List<Wishlist> findByCustomerIdAndStatus(
            Integer customerId,
            Integer status
    );


    // check duplicate product in wishlist
    Optional<Wishlist> findByCustomerIdAndProductId(
            Integer customerId,
            Integer productId
    );
    
    // Find active wishlist product
    Optional<Wishlist> findByCustomerIdAndProductIdAndStatus(
            Integer customerId,
            Integer productId,
            Integer status
    );
	    
	    
}
