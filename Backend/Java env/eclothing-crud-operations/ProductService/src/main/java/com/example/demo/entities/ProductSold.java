package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_sold")
public class ProductSold {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sold_id")
    private Integer soldId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "p_id")
    private Product product;

    @Column(name = "sold_qty")
    private Integer soldQty;

    @Column(name = "sold_date")
    private LocalDateTime soldDate;

    @PrePersist
    public void beforeInsert() {
        soldDate = LocalDateTime.now();
    }

	public ProductSold() {
	}

	public ProductSold(Integer soldId, Product product, Integer soldQty, LocalDateTime soldDate) {
		super();
		this.soldId = soldId;
		this.product = product;
		this.soldQty = soldQty;
		this.soldDate = soldDate;
	}

	public Integer getSoldId() {
		return soldId;
	}

	public void setSoldId(Integer soldId) {
		this.soldId = soldId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getSoldQty() {
		return soldQty;
	}

	public void setSoldQty(Integer soldQty) {
		this.soldQty = soldQty;
	}

	public LocalDateTime getSoldDate() {
		return soldDate;
	}

	public void setSoldDate(LocalDateTime soldDate) {
		this.soldDate = soldDate;
	}

}
