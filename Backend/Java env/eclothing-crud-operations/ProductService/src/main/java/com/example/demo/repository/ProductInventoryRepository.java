package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.ProductInventory;

public interface ProductInventoryRepository extends JpaRepository<ProductInventory,Integer>{
	 // All stock entries of one product
    List<ProductInventory> findByProductProductId(Integer productId);

    // All stock entries of one seller
    List<ProductInventory> findByProductSellerId(Integer sellerId);
}
