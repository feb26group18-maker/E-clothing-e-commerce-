package com.example.demo.dto;

public class AvailableStockResponse {
	private Integer productId;
    private Integer totalStock;
    private Integer soldStock;
    private Integer availableStock;
    
	public AvailableStockResponse() {
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getTotalStock() {
		return totalStock;
	}

	public void setTotalStock(Integer totalStock) {
		this.totalStock = totalStock;
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
	
	
    
    
}
