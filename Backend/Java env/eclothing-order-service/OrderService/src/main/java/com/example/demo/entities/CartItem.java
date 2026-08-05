package com.example.demo.entities;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name="cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartItemId;

    @Column(name="cart_id")
    private Integer cartId;

    @Column(name="p_id")
    private Integer productId;
    
    @Column(name="size")
    private String size;

    private Integer quantity;
    private LocalDateTime addedAt;

    @PrePersist
    public void onCreate(){
        addedAt = LocalDateTime.now();
    }

    public CartItem(){}

    public Integer getCartItemId() {
        return cartItemId;
    }


    public void setCartItemId(Integer cartItemId) {
        this.cartItemId = cartItemId;
    }


    public Integer getCartId() {
        return cartId;
    }


    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }


    public Integer getProductId() {
        return productId;
    }


    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Integer getQuantity() {
        return quantity;
    }


    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public LocalDateTime getAddedAt() {
        return addedAt;
    }


    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }
    
    

}