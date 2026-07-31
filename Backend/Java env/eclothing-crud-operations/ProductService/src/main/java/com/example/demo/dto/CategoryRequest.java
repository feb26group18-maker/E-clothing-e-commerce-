package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryRequest {
	@NotBlank(message = "Category Name is required")
    private String categoryName;

    public CategoryRequest() {
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
