package com.example.demo.dto;

public class InventoryResponse {
	private Integer productId;

    private String productName;

    private Integer initialStock;

    private Integer soldStock;

    private Integer availableStock;

    private String status;

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Integer getInitialStock() {
		return initialStock;
	}

	public void setInitialStock(Integer initialStock) {
		this.initialStock = initialStock;
	}

	public Integer getSoldStock() {
		return soldStock;
	}

	public void setSoldStock(Integer soldStock) {
		this.soldStock = soldStock;
	}

	public Integer getAvailableStock() {
		return availableStock;
	}

	public void setAvailableStock(Integer availableStock) {
		this.availableStock = availableStock;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
