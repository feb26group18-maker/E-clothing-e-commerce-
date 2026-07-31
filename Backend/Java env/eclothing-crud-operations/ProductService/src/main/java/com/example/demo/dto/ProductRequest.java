package com.example.demo.dto;

import java.math.BigDecimal;

import com.example.demo.entities.ProductSize;

public class ProductRequest {
	 	private Integer sellerId;

	    private Integer subCategoryId;

	    private String productName;

	    private String description;

	    private ProductSize size;

	    private BigDecimal price;

		public ProductRequest() {
		}

		public Integer getSellerId() {
			return sellerId;
		}

		public void setSellerId(Integer sellerId) {
			this.sellerId = sellerId;
		}

		public Integer getSubCategoryId() {
			return subCategoryId;
		}

		public void setSubCategoryId(Integer subCategoryId) {
			this.subCategoryId = subCategoryId;
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

		public ProductSize getSize() {
			return size;
		}

		public void setSize(ProductSize size) {
			this.size = size;
		}

		public BigDecimal getPrice() {
			return price;
		}

		public void setPrice(BigDecimal price) {
			this.price = price;
		}
}
