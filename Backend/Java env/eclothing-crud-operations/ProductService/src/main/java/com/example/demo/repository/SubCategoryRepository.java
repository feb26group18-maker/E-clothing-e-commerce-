package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {

    Optional<SubCategory> findBySubCategoryId(Integer id);
    
 // Duplicate Check
    Optional<SubCategory> findBySubCategoryName(String subCategoryName);

    Optional<SubCategory> findBySubCategoryNameAndIsDeleted(
            String subCategoryName,
            Integer isDeleted);

    // Existing
    List<SubCategory> findByCategoryCategoryId(Integer categoryId);

    // Active Category wise
    List<SubCategory> findByCategoryCategoryIdAndIsDeleted(
            Integer categoryId,
            Integer isDeleted);

    // Active By Id
    Optional<SubCategory> findBySubCategoryIdAndIsDeleted(
            Integer subCategoryId,
            Integer isDeleted);

    // Active List
    List<SubCategory> findByIsDeleted(Integer isDeleted);
}
