package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CustomerRegisterRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.SellerRegisterRequest;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
    private UserService userService;

    @PostMapping("/register/customer")
    public String registerCustomer(@Valid @RequestBody CustomerRegisterRequest request) {
        return userService.registerCustomer(request);
    }
    
    @PostMapping("/register/seller")
    public String registerSeller(@Valid @RequestBody SellerRegisterRequest request) {
        return userService.registerSeller(request);
    }
    
 // Login
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
