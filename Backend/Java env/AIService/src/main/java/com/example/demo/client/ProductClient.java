package com.example.demo.client;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.ProductResponse;

@FeignClient(
        name = "product-service",
        url = "http://localhost:8082"
)
public interface ProductClient {

    @GetMapping("/products/search-filter")
    List<ProductResponse> searchProducts(

            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            Integer categoryId,

            @RequestParam(required = false)
            Integer subCategoryId,

            @RequestParam(required = false)
            String size,

            @RequestParam(required = false)
            BigDecimal minPrice,

            @RequestParam(required = false)
            BigDecimal maxPrice

    );

}