package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CategoryRequest;
import com.example.demo.dto.UpdateCategoryRequest;
import com.example.demo.entities.Category;
import com.example.demo.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // ---------------- ADD ----------------

    public String addCategory(CategoryRequest request) {

        Category existingCategory = categoryRepository
                .findByCategoryNameAndIsDeleted(request.getCategoryName(), 0)
                .orElse(null);

        if (existingCategory != null) {
            return "Category already exists";
        }

        Category category = new Category();
        category.setCategoryName(request.getCategoryName());
        category.setIsDeleted(0);

        categoryRepository.save(category);

        return "Category Added Successfully";
    }

    // ---------------- EXISTING GET ALL ----------------
    
    public List<Category> getAllCategories() {
        return categoryRepository.findByIsDeleted(0);
    }

    // ---------------- NEW ACTIVE GET ----------------

    public List<Category> getActiveCategories(){

        return categoryRepository.findByIsDeleted(0);

    }

    // ---------------- EXISTING GET BY ID ----------------

    public Category getCategoryById(Integer id) {

        return categoryRepository
                .findByCategoryIdAndIsDeleted(id, 0)
                .orElse(null);
    }

    // ---------------- NEW ACTIVE GET BY ID ----------------

    public Category getActiveCategoryById(Integer id){

        return categoryRepository
                .findByCategoryIdAndIsDeleted(id,0)
                .orElse(null);

    }

    // ---------------- UPDATE ----------------

    public String updateCategory(Integer id,
            UpdateCategoryRequest request){

        Category category =
                categoryRepository
                .findByCategoryIdAndIsDeleted(id,0)
                .orElse(null);

        if(category == null){
            return "Category Not Found";
        }

        Category existingCategory =
                categoryRepository
                .findByCategoryNameAndIsDeleted(
                        request.getCategoryName(),0)
                .orElse(null);

        if(existingCategory != null &&
                !existingCategory.getCategoryId().equals(id)){

            return "Category already exists";
        }

        category.setCategoryName(request.getCategoryName());

        categoryRepository.save(category);

        return "Category Updated Successfully";

    }

    // ---------------- SOFT DELETE ----------------

    public String softDeleteCategory(Integer id) {

        Category category = categoryRepository
                .findByCategoryIdAndIsDeleted(id, 0)
                .orElse(null);

        if (category == null) {
            return "Category Not Found";
        }

        category.setIsDeleted(1);

        categoryRepository.save(category);

        return "Category Deleted Successfully";
    }

}