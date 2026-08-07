package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.OrderResponse;
import com.example.demo.dto.PlaceOrderRequest;
import com.example.demo.dto.SellerOrderResponse;
import com.example.demo.entities.Order;
import com.example.demo.entities.OrderItem;
import com.example.demo.entities.Payment;
import com.example.demo.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(
            @RequestBody PlaceOrderRequest request) {

        Order order = orderService.placeOrder(request);

        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(
            @PathVariable Integer customerId) {

        List<Order> orders =
                orderService.getOrdersByCustomerId(customerId);

        return ResponseEntity.ok(orders);
    }
    
    
    @GetMapping("/{orderId}/items")
    public ResponseEntity<List<OrderItem>> getOrderItems(
            @PathVariable Integer orderId) {

        List<OrderItem> items =
                orderService.getOrderItemsByOrderId(orderId);

        return ResponseEntity.ok(items);
    }
    
   
    @GetMapping("/payment/{orderId}")
    public Payment getPaymentByOrderId(
            @PathVariable Integer orderId) {

        return orderService.getPaymentByOrderId(orderId);
    }
    
    @GetMapping("/seller/{sellerId}/products")
    public ResponseEntity<List<Integer>> getSellerProductIds(
            @PathVariable Integer sellerId) {

        List<Integer> productIds =
                orderService.getSellerProductIds(sellerId);

        return ResponseEntity.ok(productIds);
    }
    
//    @GetMapping("/seller/{sellerId}")
//    public ResponseEntity<List<Order>> getOrdersBySeller(
//            @PathVariable Integer sellerId) {
//
//        List<Order> orders =
//                orderService.getOrdersBySellerId(sellerId);
//
//        return ResponseEntity.ok(orders);
//    }
    
    
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<SellerOrderResponse>> getOrdersBySeller(
            @PathVariable Integer sellerId) {

        List<SellerOrderResponse> orders =
                orderService.getOrdersBySellerId(sellerId);

        return ResponseEntity.ok(orders);
    }
    
    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<Order> markOrderAsDelivered(
            @PathVariable Integer orderId) {

        Order order =
                orderService.markOrderAsDelivered(orderId);

        return ResponseEntity.ok(order);
    }
    
    
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getOrderCount() {

        return ResponseEntity.ok(
                orderService.getOrderCount()
        );

    }


    

}