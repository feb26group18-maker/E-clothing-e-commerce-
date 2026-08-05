////package com.example.demo.service;
////
////import java.math.BigDecimal;
////import java.util.List;
////
////import org.springframework.stereotype.Service;
////
////import com.example.demo.client.ProductClient;
////import com.example.demo.dto.ProductResponse;
////
////@Service
////public class ShoppingAiService {
////
////    private final ProductClient productClient;
////
////    public ShoppingAiService(ProductClient productClient) {
////        this.productClient = productClient;
////    }
////
////    public List<ProductResponse> getProducts() {
////
////        return productClient.searchProducts(
////                null,
////                null,
////                1,
////                null,
////                null,
////                new BigDecimal("1500")
////        );
////
////    }
////
////}
//
////package com.example.demo.service;
////
////import java.math.BigDecimal;
////import java.util.List;
////
////import org.springframework.ai.chat.client.ChatClient;
////import org.springframework.stereotype.Service;
////
////import com.example.demo.client.ProductClient;
////import com.example.demo.dto.ProductResponse;
////
////@Service
////public class ShoppingAiService {
////
////    private final ProductClient productClient;
////    private final ChatClient chatClient;
////
////    public ShoppingAiService(ProductClient productClient,
////                             ChatClient chatClient) {
////
////        this.productClient = productClient;
////        this.chatClient = chatClient;
////    }
////
////    // Existing method (keep it for now)
////    public List<ProductResponse> getProducts() {
////
////        return productClient.searchProducts(
////                null,
////                null,
////                1,
////                null,
////                null,
////                new BigDecimal("1500")
////        );
////    }
////
////    // New AI chat method
////    public String chat(String prompt) {
////
////        return chatClient
////                .prompt(prompt)
////                .call()
////                .content();
////    }
////}
//
//package com.example.demo.service;
//
//import java.util.List;
//
//import org.springframework.ai.chat.client.ChatClient;
//import org.springframework.stereotype.Service;
//
//import com.example.demo.client.ProductClient;
//import com.example.demo.dto.ProductResponse;
//
//@Service
//public class ShoppingAiService {
//
//    private final ProductClient productClient;
//    private final ChatClient chatClient;
//
//    public ShoppingAiService(ProductClient productClient,
//                             ChatClient chatClient) {
//
//        this.productClient = productClient;
//        this.chatClient = chatClient;
//    }
//
//    public String chat(String prompt) {
//
//        // Fetch all products from Product Service
//        List<ProductResponse> products = productClient.searchProducts(
//                null,
//                null,
//                null,
//                null,
//                null,
//                null
//        );
//
//        // Build product context
//        StringBuilder context = new StringBuilder();
//
//        context.append("Available Products:\n\n");
//
//        for (ProductResponse p : products) {
//
//            context.append("Product Name: ")
//                    .append(p.getProductName())
//                    .append("\n");
//
//            context.append("Category: ")
//                    .append(p.getCategoryName())
//                    .append("\n");
//
//            context.append("SubCategory: ")
//                    .append(p.getSubCategoryName())
//                    .append("\n");
//
//            context.append("Size: ")
//                    .append(p.getSize())
//                    .append("\n");
//
//            context.append("Price: ₹")
//                    .append(p.getPrice())
//                    .append("\n");
//
//            context.append("Description: ")
//                    .append(p.getDescription())
//                    .append("\n");
//
//            context.append("--------------------------------------\n");
//        }
//
//        String finalPrompt = """
//You are an AI Shopping Assistant for an online clothing store.
//
//Rules:
//1. Recommend ONLY products from the Available Products list.
//2. Do NOT invent products.
//3. If the user asks for products under a price, recommend only products within that price.
//4. If the user asks for a category or subcategory, recommend only matching products.
//5. If no products match, reply:
//   "Sorry, no matching products are available."
//6. Mention the product name and price in your response.
//
//Available Products:
//
//%s
//
//Customer Question:
//%s
//""".formatted(context.toString(), prompt);
//
//        return chatClient
//                .prompt(finalPrompt)
//                .call()
//                .content();
//    }
//}


package com.example.demo.service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.example.demo.client.ProductClient;
import com.example.demo.dto.ProductResponse;
import com.example.demo.dto.ShoppingResponse;

@Service
public class ShoppingAiService {

    private final ProductClient productClient;
    private final ChatClient chatClient;

    public ShoppingAiService(ProductClient productClient,
                             ChatClient chatClient) {
        this.productClient = productClient;
        this.chatClient = chatClient;
    }

    public ShoppingResponse chat(String prompt) {

        // Fetch all approved products
        List<ProductResponse> products = productClient.searchProducts(
                null,
                null,
                null,
                null,
                null,
                null
        );

        // Keep only Men/Women/Kids products
        List<ProductResponse> filteredProducts = products.stream()
                .filter(p -> {
                    if (p.getCategoryName() == null)
                        return false;

                    String category = p.getCategoryName().toLowerCase(Locale.ROOT);

                    return category.contains("men")
                            || category.contains("women")
                            || category.contains("kid");
                })
                .collect(Collectors.toList());

        // ==========================
        // ADD THIS CODE HERE
        // ==========================

        String detectedCategory = "";
        String lowerPrompt = prompt.toLowerCase();

        if (lowerPrompt.contains("men")) {
            detectedCategory = "Men";
        }
        else if (lowerPrompt.contains("women")) {
            detectedCategory = "Women";
        }
        else if (lowerPrompt.contains("kid")) {
            detectedCategory = "Kids";
        }
        
        StringBuilder context = new StringBuilder();

        for (ProductResponse p : filteredProducts) {

            context.append("Product Name: ")
                    .append(p.getProductName())
                    .append("\n");

            context.append("Category: ")
                    .append(p.getCategoryName())
                    .append("\n");

            context.append("SubCategory: ")
                    .append(p.getSubCategoryName())
                    .append("\n");

            context.append("Price: ")
                    .append(p.getPrice())
                    .append("\n");

            context.append("Size: ")
                    .append(p.getSize())
                    .append("\n");

            context.append("Description: ")
                    .append(p.getDescription())
                    .append("\n\n");
        }

        String aiPrompt = """
    You are an AI Shopping Assistant.

    Use ONLY these products.

    Never invent products.

    Answer shortly.

    Products:

    %s

    Customer Query:

    %s
    """.formatted(context.toString(), prompt);

        String answer =
                chatClient.prompt(aiPrompt)
                        .call()
                        .content();



        // ------------------------------
        // Filter products in Java
        // ------------------------------

        String userPrompt = prompt.toLowerCase(Locale.ROOT);

        List<ProductResponse> result =
                filteredProducts.stream()

                .filter(p -> {

                    String text = (

                            p.getProductName() + " " +

                            p.getCategoryName() + " " +

                            p.getSubCategoryName() + " " +

                            p.getDescription()

                    ).toLowerCase();

                    String[] words = userPrompt.split("\\s+");

                    for (String word : words) {

                        // Ignore common words
                        if (word.equals("show")
                                || word.equals("me")
                                || word.equals("find")
                                || word.equals("give")
                                || word.equals("display")
                                || word.equals("under")
                                || word.equals("below")
                                || word.equals("product")
                                || word.equals("products")
                                || word.equals("for")
                                || word.equals("with")
                                || word.equals("please")
                                || word.equals("want")
                                || word.equals("need")) {
                            continue;
                        }

                        if (word.length() > 2 && !text.contains(word)) {
                            return false;
                        }
                    }

                    return true;

                })

                .collect(Collectors.toList());


        return new ShoppingResponse(
                detectedCategory,
                result
        );

    }
    }