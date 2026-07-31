package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.InventoryRequest;
import com.example.demo.dto.InventoryResponse;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductInventory;
import com.example.demo.exception.InsufficientStockException;
import com.example.demo.exception.ProductNotFoundException;
import com.example.demo.repository.ProductInventoryRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.dto.AvailableStockResponse;
import com.example.demo.entities.ProductSold;
import com.example.demo.repository.ProductSoldRepository;

@Service
public class ProductInventoryService {
	@Autowired
    private ProductInventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ProductSoldRepository soldRepository;

    public ProductInventory addInventory(InventoryRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));

        ProductInventory inventory = new ProductInventory();

        inventory.setProduct(product);
        inventory.setInitialStock(request.getInitialStock());

        return inventoryRepository.save(inventory);
    }
    
//    public List<ProductInventory> getSellerInventory(Integer sellerId){
//
//        return inventoryRepository
//                .findByProductSellerId(sellerId);
//    }
    
    public List<InventoryResponse> getSellerInventory(Integer sellerId){
        List<ProductInventory> inventoryList =
                inventoryRepository
                .findByProductSellerId(sellerId);

        Map<Integer,List<ProductInventory>> groupedInventory =
                inventoryList.stream()
                .collect(Collectors.groupingBy(
                        inv -> inv.getProduct().getProductId()
                ));

        return groupedInventory.values()
                .stream()
                .map(list -> {
                    ProductInventory first =
                            list.get(0);

                    Integer productId =
                            first.getProduct()
                            .getProductId();

                    // Total stock added for product
                    int totalStock =
                            list.stream()
                            .mapToInt(ProductInventory::getInitialStock)
                            .sum();

                    // Total sold for product
                    List<ProductSold> soldList =
                            soldRepository
                            .findByProductProductId(productId);

                    int sold =
                            soldList.stream()
                            .mapToInt(ProductSold::getSoldQty)
                            .sum();
                    // Available stock
                    int available =
                            totalStock - sold;

                    InventoryResponse response =
                            new InventoryResponse();
                    response.setProductId(productId);

                    response.setProductName(
                            first.getProduct()
                            .getProductName()
                    );
                    response.setInitialStock(totalStock);

                    response.setSoldStock(sold);

                    response.setAvailableStock(
                            available
                    );

                    if(available == 0)
                        response.setStatus("Out Of Stock");

                    else
                        response.setStatus("In Stock");

                    return response;
                    }).toList();

    }
    
    
    
    public AvailableStockResponse getAvailableStock(Integer productId) {

        // Get all stock entries
        List<ProductInventory> inventoryList =
                inventoryRepository.findByProductProductId(productId);

        // Calculate total stock added
        Integer totalStock = inventoryList.stream()
                .mapToInt(ProductInventory::getInitialStock)
                .sum();

        // Get all sold entries
        List<ProductSold> soldList =
                soldRepository.findByProductProductId(productId);

        // Calculate total sold
        Integer soldStock = soldList.stream()
                .mapToInt(ProductSold::getSoldQty)
                .sum();

        // Available Stock
        Integer availableStock = totalStock - soldStock;

        // Prepare response
        AvailableStockResponse response =
                new AvailableStockResponse();

        response.setProductId(productId);
        response.setTotalStock(totalStock);
        response.setSoldStock(soldStock);
        response.setAvailableStock(availableStock);

        return response;
    }
    
    public ProductSold addSold(ProductSold sold){

        Integer productId =
                sold.getProduct().getProductId();

        List<ProductInventory> inventoryList =
                inventoryRepository
                .findByProductProductId(productId);

        Integer totalStock =
                inventoryList.stream()
                .mapToInt(ProductInventory::getInitialStock)
                .sum();

        List<ProductSold> soldList =
                soldRepository
                .findByProductProductId(productId);

        Integer alreadySold =
                soldList.stream()
                .mapToInt(ProductSold::getSoldQty)
                .sum();
        Integer availableStock = totalStock - alreadySold;

        if(sold.getSoldQty() > availableStock){

            throw new InsufficientStockException(
                "Only "
                + availableStock
                +" quantity available"
            );

        }

        Product product =
                productRepository.findById(productId)
                .orElseThrow(
                    () -> new RuntimeException("Product not found")
                );

        sold.setProduct(product);

        sold.setSoldDate(LocalDateTime.now());
        return soldRepository.save(sold);
    }
    
    
    
}
