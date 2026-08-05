//package com.example.demo.controller;
//
//import java.util.List;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.demo.dto.ProductResponse;
//import com.example.demo.service.ShoppingAiService;
//
//@RestController
//@RequestMapping("/shopping")
//public class ShoppingController {
//
//    private final ShoppingAiService shoppingAiService;
//
//    public ShoppingController(ShoppingAiService shoppingAiService) {
//        this.shoppingAiService = shoppingAiService;
//    }
//
//    @GetMapping
//    public List<ProductResponse> getProducts() {
//
//        return shoppingAiService.getProducts();
//
//    }
//
//}

package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ShoppingRequest;
import com.example.demo.dto.ShoppingResponse;
import com.example.demo.service.ShoppingAiService;

@RestController
@RequestMapping("/shopping")
@CrossOrigin(origins = "http://localhost:5173")
public class ShoppingController {

    private final ShoppingAiService shoppingAiService;

    public ShoppingController(ShoppingAiService shoppingAiService) {
        this.shoppingAiService = shoppingAiService;
    }

    @PostMapping
    public ShoppingResponse shopping(@RequestBody ShoppingRequest request) {

        return shoppingAiService.chat(request.getPrompt());

    }
}
