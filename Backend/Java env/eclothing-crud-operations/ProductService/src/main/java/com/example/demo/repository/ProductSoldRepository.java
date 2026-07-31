package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.ProductSold;

public interface ProductSoldRepository extends JpaRepository<ProductSold, Integer> {
	List<ProductSold> findByProductProductId(Integer productId);

    List<ProductSold> findByProductSellerId(Integer sellerId);
}
