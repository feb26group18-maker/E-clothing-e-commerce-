package com.example.demo.specification;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.example.demo.entities.ApprovalStatus;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductSize;

import jakarta.persistence.criteria.Predicate;

public class ProductSpecification {

    public static Specification<Product> searchProducts(

            String keyword,
            Integer categoryId,
            Integer subCategoryId,
            ProductSize size,
            BigDecimal minPrice,
            BigDecimal maxPrice

    ) {
        return (root, query, cb) -> {

            Predicate predicate = cb.conjunction();
            // Only Approved Products
            predicate = cb.and(
                    predicate,
                    cb.equal(
                            root.get("approvalStatus"),
                            ApprovalStatus.Approved
                    )
            );

            // Only Active Products
            predicate = cb.and(
                    predicate,
                    cb.equal(
                            root.get("isDeleted"),
                            0
                    )
            );

            // Search by Product Name
            if (keyword != null && !keyword.isBlank()) {

                predicate = cb.and(
                        predicate,
                        cb.like(
                                cb.lower(root.get("productName")),
                                "%" + keyword.toLowerCase() + "%"
                        )
                );
            }

            // Category Filter
            if (categoryId != null) {

                predicate = cb.and(
                        predicate,
                        cb.equal(
                                root.get("subCategory")
                                        .get("category")
                                        .get("categoryId"),
                                categoryId
                        )
                );
            }

            // SubCategory Filter
            if (subCategoryId != null) {

                predicate = cb.and(
                        predicate,
                        cb.equal(
                                root.get("subCategory")
                                        .get("subCategoryId"),
                                subCategoryId
                        )
                );
            }

            // Size Filter
            if (size != null) {

                predicate = cb.and(
                        predicate,
                        cb.equal(
                                root.get("size"),
                                size
                        )
                );
            }

            // Minimum Price
            if (minPrice != null) {

                predicate = cb.and(
                        predicate,
                        cb.greaterThanOrEqualTo(
                                root.get("price"),
                                minPrice
                        )
                );
            }

            // Maximum Price
            if (maxPrice != null) {

                predicate = cb.and(
                        predicate,
                        cb.lessThanOrEqualTo(
                                root.get("price"),
                                maxPrice
                        )
                );
            }

            return predicate;
        };
    }

}