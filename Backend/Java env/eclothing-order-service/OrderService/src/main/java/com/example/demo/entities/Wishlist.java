package com.example.demo.entities;


import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="wishlist")
public class Wishlist {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer wishlistId;


@Column(name="c_id", nullable=false)
private Integer customerId;


@Column(name="p_id", nullable=false)
private Integer productId;


private Integer status=0;


private LocalDateTime addedAt;


@PrePersist
public void onCreate(){

    addedAt=LocalDateTime.now();

}

public Wishlist() {
}

public Integer getWishlistId() {
	return wishlistId;
}

public void setWishlistId(Integer wishlistId) {
	this.wishlistId = wishlistId;
}

public Integer getCustomerId() {
	return customerId;
}

public void setCustomerId(Integer customerId) {
	this.customerId = customerId;
}

public Integer getProductId() {
	return productId;
}

public void setProductId(Integer productId) {
	this.productId = productId;
}

public Integer getStatus() {
	return status;
}

public void setStatus(Integer status) {
	this.status = status;
}

public LocalDateTime getAddedAt() {
	return addedAt;
}

public void setAddedAt(LocalDateTime addedAt) {
	this.addedAt = addedAt;
}

}