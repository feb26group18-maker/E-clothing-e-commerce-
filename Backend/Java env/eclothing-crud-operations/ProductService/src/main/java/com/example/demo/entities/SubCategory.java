package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "subcategory")
public class SubCategory {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcat_id")
    private Integer subCategoryId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cat_id", nullable = false)
    private Category category;

    @Column(name = "subcat_name", nullable = false)
    private String subCategoryName;
    
    @Column(name = "is_deleted",nullable = false)
    private Integer isDeleted = 0;

	public SubCategory() {
	}

	public SubCategory(Integer subCategoryId, Category category, String subCategoryName, Integer isDeleted) {
		super();
		this.subCategoryId = subCategoryId;
		this.category = category;
		this.subCategoryName = subCategoryName;
		this.isDeleted = isDeleted;
	}

	public Integer getSubCategoryId() {
		return subCategoryId;
	}

	public void setSubCategoryId(Integer subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public Integer getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Integer isDeleted) {
		this.isDeleted = isDeleted;
	}
}
