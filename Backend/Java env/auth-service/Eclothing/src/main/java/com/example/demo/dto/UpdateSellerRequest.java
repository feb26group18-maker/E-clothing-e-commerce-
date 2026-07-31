package com.example.demo.dto;

public class UpdateSellerRequest {
	private String name;
    private String mobile;

    private String shopName;
    private String gstNumber;
    private String businessAddress;
    
	public UpdateSellerRequest() {
	}

	public UpdateSellerRequest(String name, String mobile, String shopName, String gstNumber,
			String businessAddress) {
		super();
		this.name = name;
		this.mobile = mobile;
		this.shopName = shopName;
		this.gstNumber = gstNumber;
		this.businessAddress = businessAddress;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
