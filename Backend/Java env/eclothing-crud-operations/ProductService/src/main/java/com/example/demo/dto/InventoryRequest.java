package com.example.demo.dto;

public class InventoryRequest {
	private Integer productId;

    private Integer initialStock;

	public InventoryRequest() {
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getInitialStock() {
		return initialStock;
	}

	public void setInitialStock(Integer initialStock) {
		this.initialStock = initialStock;
	}
    
}
