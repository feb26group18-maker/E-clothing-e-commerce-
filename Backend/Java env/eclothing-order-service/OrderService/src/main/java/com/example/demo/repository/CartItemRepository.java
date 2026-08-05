package com.example.demo.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.CartItem;

public interface CartItemRepository 
        extends JpaRepository<CartItem, Integer>{

    // Show cart items

    List<CartItem> findByCartId(
            Integer cartId
    );

    // Check product already added
 // Check same product + same size already added
    Optional<CartItem> findByCartIdAndProductIdAndSize(
            Integer cartId,
            Integer productId,
            String size
    );
    
    void deleteByCartId(Integer cartId);
}