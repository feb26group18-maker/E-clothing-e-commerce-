package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Cart;

public interface CartRepository 
        extends JpaRepository<Cart, Integer>{

    Optional<Cart> findByCustomerIdAndCartStatus(
            Integer customerId,
            String cartStatus
    );
}