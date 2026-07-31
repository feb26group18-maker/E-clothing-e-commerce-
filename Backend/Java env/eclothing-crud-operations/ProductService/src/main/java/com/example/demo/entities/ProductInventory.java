package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name="product_inventory")
public class ProductInventory {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Integer inventoryId;

    @ManyToOne
    @JoinColumn(name = "p_id")
    private Product product;

    @Column(name = "initial_stock")
    private Integer initialStock;

    @Column(name = "date")
    private LocalDateTime date;
    
    @PrePersist
    public void beforeInsert() {
        date = LocalDateTime.now();
    }

	public ProductInventory() {
	}

	public ProductInventory(Integer inventoryId, Product product, Integer initialStock, LocalDateTime date) {
		super();
		this.inventoryId = inventoryId;
		this.product = product;
		this.initialStock = initialStock;
		this.date = date;
	}

	public Integer getInventoryId() {
		return inventoryId;
	}

	public void setInventoryId(Integer inventoryId) {
		this.inventoryId = inventoryId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getInitialStock() {
		return initialStock;
	}

	public void setInitialStock(Integer initialStock) {
		this.initialStock = initialStock;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	
	

	
}
