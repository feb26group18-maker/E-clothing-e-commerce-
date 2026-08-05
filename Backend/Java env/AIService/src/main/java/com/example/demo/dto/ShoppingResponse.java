//package com.example.demo.dto;
//
//import java.util.List;
//
//public class ShoppingResponse {
//
//    private String message;
//
//    private List<ProductResponse> products;
//
//    public ShoppingResponse() {
//    }
//
//    public ShoppingResponse(String message, List<ProductResponse> products) {
//        this.message = message;
//        this.products = products;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//
//    public List<ProductResponse> getProducts() {
//        return products;
//    }
//
//    public void setProducts(List<ProductResponse> products) {
//        this.products = products;
//    }
//}

//package com.example.demo.dto;

//import java.util.List;
//
//public class ShoppingResponse {
//
//    private String category;
//    private String message;
//    private List<ProductResponse> products;
//
//    public ShoppingResponse() {
//    }
//
//    public ShoppingResponse(String category,
//                            String message,
//                            List<ProductResponse> products) {
//        this.category = category;
//        this.message = message;
//        this.products = products;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//
//    public List<ProductResponse> getProducts() {
//        return products;
//    }
//
//    public void setProducts(List<ProductResponse> products) {
//        this.products = products;
//    }
//}

package com.example.demo.dto;

import java.util.List;

public class ShoppingResponse {

    private String category;
   // private String message;
    private List<ProductResponse> products;

    public ShoppingResponse() {
    }

    public ShoppingResponse(String category,
                           // String message,
                            List<ProductResponse> products) {
        this.category = category;
        //this.message = message;
        this.products = products;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }

    public List<ProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponse> products) {
        this.products = products;
    }
}