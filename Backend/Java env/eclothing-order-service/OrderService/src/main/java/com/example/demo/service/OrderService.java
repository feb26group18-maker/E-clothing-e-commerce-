
package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.OrderItemRequest;
import com.example.demo.dto.OrderResponse;
import com.example.demo.dto.PlaceOrderRequest;
import com.example.demo.dto.SellerOrderItemResponse;
import com.example.demo.dto.SellerOrderResponse;
import com.example.demo.dto.SellerProductDetailsResponse;
import com.example.demo.entities.Order;
import com.example.demo.entities.OrderItem;
import com.example.demo.entities.OrderStatus;
import com.example.demo.entities.Payment;
import com.example.demo.entities.PaymentMethod;
import com.example.demo.entities.PaymentStatus;
import com.example.demo.entities.PaymentTableStatus;
import com.example.demo.exception.InsufficientStockException;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.CartItemRepository;

import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;
import com.example.demo.repository.CartRepository;
import org.springframework.web.client.RestClient;
import com.example.demo.dto.SellerProductResponse;


@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    @org.springframework.beans.factory.annotation.Qualifier("loadBalancedRestClientBuilder")
    private RestClient.Builder restClientBuilder;


    @Transactional
    public Order placeOrder(PlaceOrderRequest request) {
    	
    	// ==========================================
        // 0. CHECK STOCK BEFORE CREATING ORDER
        // ==========================================

        for (OrderItemRequest itemRequest : request.getItems()) {

            checkStock(
                    itemRequest.getProductId(),
                    itemRequest.getQuantity()
            );
        }

        // ==========================================
        // 1. CREATE ORDER
        // ==========================================

        Order order = new Order();

        order.setCustomerId(request.getCustomerId());

        order.setTotalAmount(request.getTotalAmount());

        order.setOrderDate(LocalDateTime.now());

        // Order status
        order.setOrderStatus(OrderStatus.Pending);

        // Order payment status
        // orders.payment_status = Pending/Paid/Failed/Refunded
        order.setPaymentStatus(PaymentStatus.Pending);

        Order savedOrder = orderRepository.save(order);


        // ==========================================
        // 2. CREATE ORDER ITEMS
        // ==========================================

        for (OrderItemRequest itemRequest : request.getItems()) {

            OrderItem item = new OrderItem();

            item.setOrderId(savedOrder.getOrderId());

            item.setProductId(itemRequest.getProductId());

            item.setQuantity(itemRequest.getQuantity());

            item.setPrice(itemRequest.getPrice());

            orderItemRepository.save(item);
            // ==========================================
            // UPDATE PRODUCT SOLD STOCK
            // ==========================================

            addSoldStock(
                    itemRequest.getProductId(),
                    itemRequest.getQuantity()
            );
        }


        // ==========================================
        // 3. CREATE PAYMENT
        // ==========================================

        Payment payment = new Payment();

        payment.setOrderId(savedOrder.getOrderId());

        payment.setPaymentMethod(
                convertPaymentMethod(request.getPaymentMethod())
        );

        payment.setPaymentDate(LocalDateTime.now());


        // ==========================================
        // 4. PAYMENT STATUS
        // ==========================================

        
     // ==========================================
     // 4. PAYMENT STATUS
     // ==========================================

     // COD
     if (request.getPaymentMethod()
             .equalsIgnoreCase("Cash On Delivery")
             || request.getPaymentMethod()
             .equalsIgnoreCase("Cash_On_Delivery")) {

         // payment.payment_status = Pending
         payment.setPaymentStatus(
                 PaymentTableStatus.Successful
         );

         // COD has no transaction ID
         payment.setTransactionId(null);

         // orders.payment_status = Pending
         savedOrder.setPaymentStatus(
                 PaymentStatus.Paid
         );
     }

     // ==========================================
     // ONLINE PAYMENT
     // ==========================================

     else {

         // payment.payment_status = Successful
         payment.setPaymentStatus(
                 PaymentTableStatus.Successful
         );

         // Generate transaction ID
         payment.setTransactionId(
                 "TXN-" + UUID.randomUUID()
         );

         // orders.payment_status = Paid
         savedOrder.setPaymentStatus(
                 PaymentStatus.Paid
         );
     }
 



        // ==========================================
        // 5. SAVE PAYMENT
        // ==========================================

        paymentRepository.save(payment);


        // ==========================================
        // 6. UPDATE ORDER PAYMENT STATUS
        // ==========================================

        orderRepository.save(savedOrder);

     // ==========================================
     // 7. CLEAR CUSTOMER CART
     // ==========================================

     // ==========================================
     // 7. CLEAR CUSTOMER CART
     // ==========================================

     Cart cart = cartRepository
             .findByCustomerIdAndCartStatus(
                     request.getCustomerId(),
                     "Active"
             )
             .orElse(null);

     if (cart != null) {

         cartItemRepository.deleteByCartId(
                 cart.getCartId()
         );
     }


     // ==========================================
     // 8. RETURN ORDER
     // ==========================================
        return savedOrder;
    }


    // ==========================================
    // CONVERT FRONTEND PAYMENT METHOD
    // TO JAVA ENUM
    // ==========================================

//    private PaymentMethod convertPaymentMethod(
//            String method) {
//
//        if (method == null) {
//
//            throw new RuntimeException(
//                    "Payment method is required"
//            );
//        }
//
//
//        switch (method.toUpperCase()) {
//
//            case "CASH ON DELIVERY":
//
//                return PaymentMethod.Cash_On_Delivery;
//
//
//            case "UPI":
//
//                return PaymentMethod.UPI;
//
//
//            case "CREDIT CARD":
//
//                return PaymentMethod.Credit_Card;
//
//
//            case "DEBIT CARD":
//
//                return PaymentMethod.Debit_Card;
//
//
//            default:
//
//                throw new RuntimeException(
//                        "Invalid payment method: " + method
//                );
//        }
//    }
    
    

    private PaymentMethod convertPaymentMethod(String method) {

        if (method == null) {

            throw new RuntimeException(
                    "Payment method is required"
            );
        }

        switch (method.toUpperCase()) {

            case "CASH ON DELIVERY":
            case "CASH_ON_DELIVERY":

                return PaymentMethod.Cash_On_Delivery;


            case "UPI":

                return PaymentMethod.UPI;


            case "CREDIT CARD":
            case "CREDIT_CARD":

                return PaymentMethod.Credit_Card;


            case "DEBIT CARD":
            case "DEBIT_CARD":

                return PaymentMethod.Debit_Card;


            default:

                throw new RuntimeException(
                        "Invalid payment method: " + method
                );
        }
    }
    
    

    
    public List<Order> getOrdersByCustomerId(Integer customerId) {

        return orderRepository.findByCustomerId(customerId);

    }
    
    public List<OrderItem> getOrderItemsByOrderId(Integer orderId) {

        return orderItemRepository.findByOrderId(orderId);
    }
   
   
    public Payment getPaymentByOrderId(Integer orderId) {

        return paymentRepository
                .findByOrderId(orderId)
                .orElse(null);
    }
    
//    public List<Integer> getSellerProductIds(Integer sellerId) {
//
//        List<SellerProductResponse> products = restClientBuilder
//                .build()
//                .get()
//                .uri("http://ProductService/products/seller/{sellerId}", sellerId)
//                .retrieve()
//                .body(new org.springframework.core.ParameterizedTypeReference<List<SellerProductResponse>>() {});
//
//        if (products == null) {
//            return List.of();
//        }
//
//        return products.stream()
//                .map(SellerProductResponse::getProductId)
//                .toList();
//    }
    
    public List<Integer> getSellerProductIds(Integer sellerId) {

        List<SellerProductResponse> products = restClientBuilder
                .build()
                .get()
                .uri("http://PRODUCTSERVICE/products/seller/{sellerId}", sellerId)
                .retrieve()
                .body(new org.springframework.core.ParameterizedTypeReference<List<SellerProductResponse>>() {});

        if (products == null) {
            return List.of();
        }

        return products.stream()
                .map(SellerProductResponse::getProductId)
                .toList();
    }
    
//    public List<Order> getOrdersBySellerId(Integer sellerId) {
//
//        // 1. Get seller's product IDs from ProductService
//        List<Integer> productIds = getSellerProductIds(sellerId);
//
//        // Seller has no products
//        if (productIds == null || productIds.isEmpty()) {
//            return List.of();
//        }
//
//        // 2. Find order items containing seller's products
//        List<OrderItem> orderItems =
//                orderItemRepository.findByProductIdIn(productIds);
//
//        // No orders for seller's products
//        if (orderItems.isEmpty()) {
//            return List.of();
//        }
//
//        // 3. Extract unique order IDs
//        List<Integer> orderIds = orderItems.stream()
//                .map(OrderItem::getOrderId)
//                .distinct()
//                .toList();
//
//        // 4. Get actual orders
//        return orderRepository.findByOrderIdIn(orderIds);
//    }
    
    public List<SellerOrderResponse> getOrdersBySellerId(Integer sellerId) {

        // ==========================================
        // 1. GET SELLER'S PRODUCTS FROM PRODUCT SERVICE
        // ==========================================

        List<SellerProductDetailsResponse> sellerProducts =
                restClientBuilder
                        .build()
                        .get()
                        .uri(
                                "http://PRODUCTSERVICE/products/seller/{sellerId}",
                                sellerId
                        )
                        .retrieve()
                        .body(
                                new org.springframework.core.ParameterizedTypeReference<
                                        List<SellerProductDetailsResponse>
                                >() {}
                        );

        // Seller has no products
        if (sellerProducts == null || sellerProducts.isEmpty()) {
            return List.of();
        }


        // ==========================================
        // 2. CREATE PRODUCT MAP
        // productId -> Product Details
        // ==========================================

        Map<Integer, SellerProductDetailsResponse> productMap =
                sellerProducts.stream()
                        .collect(Collectors.toMap(
                                SellerProductDetailsResponse::getProductId,
                                Function.identity()
                        ));


        // ==========================================
        // 3. GET SELLER PRODUCT IDs
        // ==========================================

        List<Integer> productIds =
                sellerProducts.stream()
                        .map(SellerProductDetailsResponse::getProductId)
                        .toList();


        // ==========================================
        // 4. FIND ORDER ITEMS
        // ==========================================

        List<OrderItem> orderItems =
                orderItemRepository.findByProductIdIn(productIds);

        // No orders for seller products
        if (orderItems.isEmpty()) {
            return List.of();
        }


        // ==========================================
        // 5. GROUP ORDER ITEMS BY ORDER ID
        // ==========================================

        Map<Integer, List<OrderItem>> itemsByOrder =
                orderItems.stream()
                        .collect(Collectors.groupingBy(
                                OrderItem::getOrderId
                        ));


        // ==========================================
        // 6. GET UNIQUE ORDER IDs
        // ==========================================

        List<Integer> orderIds =
                orderItems.stream()
                        .map(OrderItem::getOrderId)
                        .distinct()
                        .toList();


        // ==========================================
        // 7. GET ORDERS FROM DATABASE
        // ==========================================

        List<Order> orders =
                orderRepository.findByOrderIdIn(orderIds);


        // ==========================================
        // 8. CREATE FINAL SELLER ORDER RESPONSE
        // ==========================================

        List<SellerOrderResponse> responseList =
                new ArrayList<>();


        for (Order order : orders) {

            SellerOrderResponse response =
                    new SellerOrderResponse();


            // ==========================================
            // ORDER DETAILS
            // ==========================================

            response.setOrderId(
                    order.getOrderId()
            );

            response.setCustomerId(
                    order.getCustomerId()
            );

            response.setOrderDate(
                    order.getOrderDate()
            );

            response.setTotalAmount(
                    order.getTotalAmount()
            );

            response.setOrderStatus(
                    order.getOrderStatus()
            );

            response.setPaymentStatus(
                    order.getPaymentStatus()
            );


            // ==========================================
            // ORDER ITEMS
            // ==========================================

            List<OrderItem> currentOrderItems =
                    itemsByOrder.get(order.getOrderId());


            List<SellerOrderItemResponse> itemResponses =
                    new ArrayList<>();


            if (currentOrderItems != null) {

                for (OrderItem orderItem : currentOrderItems) {

                    // Get product details
                    SellerProductDetailsResponse product =
                            productMap.get(
                                    orderItem.getProductId()
                            );


                    // Only seller's products
                    if (product == null) {
                        continue;
                    }


                    SellerOrderItemResponse itemResponse =
                            new SellerOrderItemResponse();


                    // Item ID
                    itemResponse.setItemId(
                            orderItem.getItemId()
                    );


                    // Product ID
                    itemResponse.setProductId(
                            orderItem.getProductId()
                    );


                    // Product Name
                    itemResponse.setProductName(
                            product.getProductName()
                    );


                    // Size
                    itemResponse.setSize(
                            product.getSize()
                    );


                    // Quantity
                    itemResponse.setQuantity(
                            orderItem.getQuantity()
                    );


                    // Price
                    itemResponse.setPrice(
                            orderItem.getPrice()
                    );


                    itemResponses.add(
                            itemResponse
                    );
                }
            }


            // ==========================================
            // SET ITEMS INTO ORDER
            // ==========================================

            response.setItems(
                    itemResponses
            );


            // ==========================================
            // ADD ORDER TO RESPONSE LIST
            // ==========================================

            responseList.add(
                    response
            );
        }


        return responseList;
    }
    
    
    public Order markOrderAsDelivered(Integer orderId) {

        // Find order
        Order order = orderRepository.findById(orderId).orElse(null);

        // Order not found
        if (order == null) {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }

        // Update order status
        order.setOrderStatus(OrderStatus.Delivered);

        // Save updated order
        return orderRepository.save(order);
    }
    
 // ====================================================
    // ADMIN - GET ALL ORDERS
    // ====================================================

    public List<OrderResponse> getAllOrders() {

        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public long getOrderCount() {
        return orderRepository.count();
    }

    

    private OrderResponse convertToResponse(Order order) {

        OrderResponse response = new OrderResponse();

        response.setOrderId(order.getOrderId());
        response.setCustomerId(order.getCustomerId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());

        response.setOrderStatus(
                order.getOrderStatus() != null
                        ? order.getOrderStatus().name()
                        : ""
        );

        response.setPaymentStatus(
                order.getPaymentStatus() != null
                        ? order.getPaymentStatus().name()
                        : ""
        );

        return response;
    }
    
    private void addSoldStock(Integer productId, Integer quantity) {

        Map<String, Object> request = new java.util.HashMap<>();

        request.put("productId", productId);
        request.put("soldQty", quantity);

        restClientBuilder
                .build()
                .post()
                .uri("http://PRODUCTSERVICE/sold")
                .body(request)
                .retrieve()
                .toBodilessEntity();
    }
    
    private void checkStock(Integer productId, Integer requestedQuantity) {

        Map<String, Object> stockResponse = restClientBuilder
                .build()
                .get()
                .uri(
                        "http://PRODUCTSERVICE/inventory/available/{productId}",
                        productId
                )
                .retrieve()
                .body(new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {});

        if (stockResponse == null) {
            throw new RuntimeException(
                    "Unable to check stock for product: " + productId
            );
        }

        Number availableStockNumber =
                (Number) stockResponse.get("availableStock");

        if (availableStockNumber == null) {
            throw new RuntimeException(
                    "Available stock not found for product: " + productId
            );
        }

        int availableStock = availableStockNumber.intValue();

        if (requestedQuantity > availableStock) {

            throw new InsufficientStockException(
                    "Insufficient stock for product "
                    + productId
                    + ". Available: "
                    + availableStock
                    + ", Requested: "
                    + requestedQuantity
            );
        }
    }
}
    

  
