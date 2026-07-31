package com.example.demo.dto;

public class SoldRequest {
	private Integer productId;
    private Integer soldQty;
    
	public SoldRequest() {
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getSoldQty() {
		return soldQty;
	}

	public void setSoldQty(Integer soldQty) {
		this.soldQty = soldQty;
	}
    
}
