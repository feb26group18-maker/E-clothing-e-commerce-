package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SellerProfileResponse;
import com.example.demo.dto.UpdateCustomerRequest;
import com.example.demo.dto.UpdateSellerRequest;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	 	@Autowired
	    private UserService userService;

	 	// Get All Users
	    @GetMapping
	    public List<User> getAllUsers() {
	        return userService.getAllUsers();
	    }
	    
	    // Get User By Id
	    @GetMapping("/{id}")
	    public User getUserById(@PathVariable Integer id) {
	        return userService.getUserById(id);
	    }
	    
	    @DeleteMapping("/{id}")
	    public String deleteUser(@PathVariable Integer id) {
	        return userService.deleteUser(id);
	    }
	    
	    @PutMapping("/{id}")
	    public String updateCustomer(@PathVariable Integer id, @RequestBody UpdateCustomerRequest request) {
	        return userService.updateCustomer(id, request);
	    }
	    
	    @PutMapping("/seller/{id}")
	    public String updateSeller(@PathVariable Integer id,@RequestBody UpdateSellerRequest request) {
	        return userService.updateSeller(id, request);
	    }
	    
	    @GetMapping("/seller/profile/{id}")
	    public SellerProfileResponse getSellerProfile(@PathVariable Integer id){
	        return userService.getSellerProfile(id);
	    }
}
