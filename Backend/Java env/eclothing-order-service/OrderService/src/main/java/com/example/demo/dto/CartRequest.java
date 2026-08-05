package com.example.demo.dto;

public class CartRequest {

    private Integer customerId;
    private Integer productId;
    private String size;
    private Integer quantity;

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getProductId() {
        return productId;
    }

    public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}