package com.example.demo.dto;

public class SubCategoryRequest {
	Integer categoryId;
    String subCategoryName;
    
	 public SubCategoryRequest() {
	 }

	 public Integer getCategoryId() {
		 return categoryId;
	 }

	 public void setCategoryId(Integer categoryId) {
		 this.categoryId = categoryId;
	 }

	 public String getSubCategoryName() {
		 return subCategoryName;
	 }

	 public void setSubCategoryName(String subCategoryName) {
		 this.subCategoryName = subCategoryName;
	 }
}
