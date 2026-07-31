package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.InventoryRequest;
import com.example.demo.dto.InventoryResponse;
import com.example.demo.entities.ProductInventory;
import com.example.demo.entities.ProductSold;
import com.example.demo.service.ProductInventoryService;
import com.example.demo.dto.AvailableStockResponse;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductInventoryController {

	@Autowired
	private ProductInventoryService inventoryService;
	
	@PostMapping
	public ProductInventory addInventory(
	@RequestBody InventoryRequest request){

    return inventoryService.addInventory(request);

	}
	
//	@GetMapping("/seller/{sellerId}")
//	public List<ProductInventory> getSellerInventory(
//	        @PathVariable Integer sellerId){
//	    return inventoryService.getSellerInventory(sellerId);
//
//	}
	
	@GetMapping("/available/{productId}")
	public AvailableStockResponse getAvailableStock(
	        @PathVariable Integer productId) {

	    return inventoryService.getAvailableStock(productId);
	}
	
	@PostMapping("/sold")
	public ProductSold addSold(@RequestBody ProductSold sold){
	    return inventoryService.addSold(sold);

	}
	
	@GetMapping("/seller/{sellerId}")
	public List<InventoryResponse> getSellerInventory(
	        @PathVariable Integer sellerId){

	    return inventoryService
	            .getSellerInventory(sellerId);
	}
}
