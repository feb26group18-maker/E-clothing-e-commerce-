package com.example.demo.dto;

public class UpdateSubCategoryRequest {
	Integer categoryId;
	  String subCategoryName;
	  public UpdateSubCategoryRequest() {
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
