package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    // Check if category already exists
    boolean existsByCategoryName(String categoryName);

    // Find category by name
    Optional<Category> findByCategoryName(String categoryName);

    // Find category by name and active status
    Optional<Category> findByCategoryNameAndIsDeleted(
            String categoryName,
            Integer isDeleted
    );

    // Get all active/deleted categories
    List<Category> findByIsDeleted(Integer isDeleted);

    // Find category by id and active status
    Optional<Category> findByCategoryIdAndIsDeleted(
            Integer categoryId,
            Integer isDeleted
    );
    
}