package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="seller")
public class Seller {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_id")
    private Integer sellerId;

    @OneToOne
    @JoinColumn(name = "u_id", nullable = false)
    private User user;

    @Column(name = "shop_name", nullable = false, length = 150)
    private String shopName;

    @Column(name = "gst_number", nullable = false, unique = true, length = 20)
    private String gstNumber;

    @Column(name = "business_address", nullable = false, length = 255)
    private String businessAddress;

	public Seller() {
	}

	public Seller(Integer sellerId, User user, String shopName, String gstNumber, String businessAddress) {
		super();
		this.sellerId = sellerId;
		this.user = user;
		this.shopName = shopName;
		this.gstNumber = gstNumber;
		this.businessAddress = businessAddress;
	}

	public Integer getSellerId() {
		return sellerId;
	}

	public void setSellerId(Integer sellerId) {
		this.sellerId = sellerId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getGstNumber() {
		return gstNumber;
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber;
	}

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	@Override
	public String toString() {
		return "Seller [sellerId=" + sellerId + ", user=" + user + ", shopName=" + shopName + ", gstNumber=" + gstNumber
				+ ", businessAddress=" + businessAddress + "]";
	}
}
