package com.example.demo.dto;

public class SellerProfileResponse {
	private Integer userId;
    private String name;
    private String email;
    private String mobile;

    private String shopName;
    private String gstNumber;
    private String businessAddress;
    
	public SellerProfileResponse() {
	}

	public SellerProfileResponse(Integer userId, String name, String email, String mobile, String shopName,
			String gstNumber, String businessAddress) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.shopName = shopName;
		this.gstNumber = gstNumber;
		this.businessAddress = businessAddress;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
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
}
