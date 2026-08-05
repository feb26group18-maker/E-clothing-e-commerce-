package com.example.demo.entities;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @Column(name="c_id", nullable=false)
    private Integer customerId;
    
    private String cartStatus="Active";

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate(){

        createdAt = LocalDateTime.now();

    }

    public Cart(){}

    public Integer getCartId() {
        return cartId;
    }


    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }


    public Integer getCustomerId() {
        return customerId;
    }


    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }


    public String getCartStatus() {
        return cartStatus;
    }


    public void setCartStatus(String cartStatus) {
        this.cartStatus = cartStatus;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}