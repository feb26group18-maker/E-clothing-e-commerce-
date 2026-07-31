package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SoldRequest;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductSold;
import com.example.demo.exception.ProductNotFoundException;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductSoldRepository;

@Service
public class ProductSoldService {

    @Autowired
    private ProductSoldRepository soldRepository;

    @Autowired
    private ProductRepository productRepository;

    public ProductSold addSoldEntry(SoldRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));

        ProductSold sold = new ProductSold();

        sold.setProduct(product);
        sold.setSoldQty(request.getSoldQty());

        return soldRepository.save(sold);
    }

}