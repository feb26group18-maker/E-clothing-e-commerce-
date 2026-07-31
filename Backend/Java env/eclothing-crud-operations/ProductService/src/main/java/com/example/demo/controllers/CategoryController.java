package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.CategoryRequest;
import com.example.demo.dto.UpdateCategoryRequest;
import com.example.demo.entities.Category;
import com.example.demo.service.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // ---------------- ADD ----------------

    @PostMapping
    public String addCategory(
            @Valid @RequestBody CategoryRequest request){

        return categoryService.addCategory(request);

    }

    // ---------------- EXISTING GET ----------------

    @GetMapping
    public List<Category> getAllCategories(){

        return categoryService.getAllCategories();

    }

    // ---------------- NEW ACTIVE GET ----------------

    @GetMapping("/active")
    public List<Category> getActiveCategories(){

        return categoryService.getActiveCategories();

    }

    // ---------------- EXISTING GET BY ID ----------------

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Integer id){

        return categoryService.getCategoryById(id);

    }

    // ---------------- NEW ACTIVE GET BY ID ----------------

    @GetMapping("/active/{id}")
    public Category getActiveCategoryById(
            @PathVariable Integer id){

        return categoryService.getActiveCategoryById(id);

    }

    // ---------------- UPDATE ----------------

    @PutMapping("/{id}")
    public String updateCategory(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateCategoryRequest request){

        return categoryService.updateCategory(id, request);

    }

    // ---------------- SOFT DELETE ----------------

    @DeleteMapping("/{id}")
    public String softDeleteCategory(
            @PathVariable Integer id){

        return categoryService.softDeleteCategory(id);

    }

}