package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Product;
import com.example.demo.entities.ProductImage;


public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
    List<ProductImage> findByProductProductId(Integer productId);
    
    void deleteByProduct(Product product);


}
