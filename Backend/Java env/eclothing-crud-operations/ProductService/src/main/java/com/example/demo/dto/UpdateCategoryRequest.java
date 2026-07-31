package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateCategoryRequest {
	@NotBlank(message="Category Name is required")
    private String categoryName;

    public UpdateCategoryRequest() {
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
