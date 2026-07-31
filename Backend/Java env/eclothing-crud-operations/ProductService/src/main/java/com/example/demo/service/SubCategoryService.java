package com.example.demo.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SubCategoryRequest;
import com.example.demo.dto.UpdateSubCategoryRequest;
import com.example.demo.entities.Category;
import com.example.demo.entities.SubCategory;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.SubCategoryRepository;

@Service
public class SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // ================= ADD =================

    public String addSubCategory(SubCategoryRequest request){

        SubCategory existingSubCategory =
                subCategoryRepository
                .findBySubCategoryNameAndIsDeleted(
                        request.getSubCategoryName(),0)
                .orElse(null);

        if(existingSubCategory != null){
            return "SubCategory already exists";
        }

        Category category =
                categoryRepository
                .findByCategoryIdAndIsDeleted(
                        request.getCategoryId(),0)
                .orElse(null);

        if(category == null){
            return "Category Not Found";
        }

        SubCategory subCategory = new SubCategory();

        subCategory.setCategory(category);
        subCategory.setSubCategoryName(request.getSubCategoryName());
        subCategory.setIsDeleted(0);

        subCategoryRepository.save(subCategory);

        return "SubCategory Added Successfully";
    }

    // ================= EXISTING GET =================

    public List<SubCategory> getAllSubCategories() {

        return subCategoryRepository.findByIsDeleted(0);

    }

    // ================= ACTIVE GET =================

    public List<SubCategory> getActiveSubCategories(){

        return subCategoryRepository.findByIsDeleted(0);

    }

    // ================= EXISTING GET BY ID =================

    public SubCategory getSubCategoryById(Integer id) {

        return subCategoryRepository
                .findBySubCategoryIdAndIsDeleted(id, 0)
                .orElse(null);

    }

    // ================= ACTIVE GET BY ID =================

    public SubCategory getActiveSubCategoryById(Integer id){

        return subCategoryRepository
                .findBySubCategoryIdAndIsDeleted(id,0)
                .orElse(null);

    }

    // ================= UPDATE =================

    public String updateSubCategory(Integer id,
            UpdateSubCategoryRequest request){

        SubCategory subCategory =
                subCategoryRepository
                .findBySubCategoryIdAndIsDeleted(id,0)
                .orElse(null);

        if(subCategory == null){
            return "SubCategory Not Found";
        }

        Category category =
                categoryRepository
                .findByCategoryIdAndIsDeleted(
                        request.getCategoryId(),0)
                .orElse(null);

        if(category == null){
            return "Category Not Found";
        }

        SubCategory existingSubCategory =
                subCategoryRepository
                .findBySubCategoryNameAndIsDeleted(
                        request.getSubCategoryName(),0)
                .orElse(null);

        if(existingSubCategory != null &&
                !existingSubCategory.getSubCategoryId().equals(id)){

            return "SubCategory already exists";
        }

        subCategory.setCategory(category);
        subCategory.setSubCategoryName(request.getSubCategoryName());

        subCategoryRepository.save(subCategory);

        return "SubCategory Updated Successfully";
    }

    // ================= SOFT DELETE =================

    public String softDeleteSubCategory(Integer id) {

        SubCategory subCategory = subCategoryRepository
                .findBySubCategoryIdAndIsDeleted(id, 0)
                .orElse(null);

        if (subCategory == null) {
            return "SubCategory Not Found";
        }

        subCategory.setIsDeleted(1);

        subCategoryRepository.save(subCategory);

        return "SubCategory Deleted Successfully";
    }
    
    public List<SubCategory> getSubCategoryByCategoryId(Integer categoryId) {

        Category category = categoryRepository
                .findByCategoryIdAndIsDeleted(categoryId, 0)
                .orElse(null);

        if (category == null) {
            return Collections.emptyList();
        }

        return subCategoryRepository
                .findByCategoryCategoryIdAndIsDeleted(categoryId, 0);
    }

}