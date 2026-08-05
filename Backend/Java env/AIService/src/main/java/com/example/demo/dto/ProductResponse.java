package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductResponse {
    
	private Integer productId;
    private String sellerName;
    private String categoryName;
    private String subCategoryName;
    private String productName;
    private String description;
    private String size;
    private BigDecimal price;
    private String approvalStatus;
    private List<String> imageUrls;
	public ProductResponse() {
	}
	public ProductResponse(Integer productId, String sellerName, String categoryName, String subCategoryName,
			String productName, String description, String size, BigDecimal price, String approvalStatus,
			List<String> imageUrls) {
		super();
		this.productId = productId;
		this.sellerName = sellerName;
		this.categoryName = categoryName;
		this.subCategoryName = subCategoryName;
		this.productName = productName;
		this.description = description;
		this.size = size;
		this.price = price;
		this.approvalStatus = approvalStatus;
		this.imageUrls = imageUrls;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getSellerName() {
		return sellerName;
	}
	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getSubCategoryName() {
		return subCategoryName;
	}
	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public String getApprovalStatus() {
		return approvalStatus;
	}
	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
	public List<String> getImageUrls() {
		return imageUrls;
	}
	public void setImageUrls(List<String> imageUrls) {
		this.imageUrls = imageUrls;
	}
	
	
    
    
    
}
