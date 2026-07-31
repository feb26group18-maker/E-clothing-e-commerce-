package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CustomerRegisterRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.SellerProfileResponse;
import com.example.demo.dto.SellerRegisterRequest;
import com.example.demo.dto.UpdateCustomerRequest;
import com.example.demo.dto.UpdateSellerRequest;
import com.example.demo.entities.Customer;
import com.example.demo.entities.Role;
import com.example.demo.entities.RoleName;
import com.example.demo.entities.Seller;
import com.example.demo.entities.User;
import com.example.demo.jwt.JwtUtil;
import com.example.demo.repository.CustomerrRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.SellerRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private CustomerrRepository customerRepository;
	
	@Autowired
	private SellerRepository sellerRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public String registerCustomer(CustomerRegisterRequest request) {

        // Step 1: Check Email
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        // Step 2: Check Mobile
        if (userRepository.existsByMobile(request.getMobile())) {
            return "Mobile already exists";
        }

        // Step 3: Get Customer Role
        Role role = roleRepository.findByRoleName(RoleName.Customer);

        // Step 4: Create User Object
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus(1);
        user.setIsDeleted(0);   // Not Deleted
        
        // Step 5: Save User
        User savedUser = userRepository.save(user);

        // Step 6: Create Customer Object
        Customer customer = new Customer();

        customer.setUser(savedUser);
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());

        // Step 7: Save Customer
        customerRepository.save(customer);

        return "Customer Registered Successfully";
    }

	public String registerSeller(SellerRegisterRequest request) {

	    // Check Email
	    if (userRepository.existsByEmail(request.getEmail())) {
	        return "Email already exists";
	    }

	    // Check Mobile
	    if (userRepository.existsByMobile(request.getMobile())) {
	        return "Mobile already exists";
	    }

	    // Get Seller Role
	    Role role = roleRepository.findByRoleName(RoleName.Seller);

	    // Create User
	    User user = new User();
	    user.setName(request.getName());
	    user.setEmail(request.getEmail());
	    user.setMobile(request.getMobile());
	    user.setPassword(passwordEncoder.encode(request.getPassword()));
	    user.setRole(role);
	    user.setStatus(0); //Waiting for admin approval
	    user.setIsDeleted(0);   // Not Deleted
	    
	    // Save User
	    User savedUser = userRepository.save(user);

	    // Create Seller
	    Seller seller = new Seller();
	    seller.setUser(savedUser);
	    seller.setShopName(request.getShopName());
	    seller.setGstNumber(request.getGstNumber());
	    seller.setBusinessAddress(request.getBusinessAddress());

	    // Save Seller
	    sellerRepository.save(seller);

	    return "Seller Registered Successfully";
	}

//	public LoginResponse login(LoginRequest request) {
//
//	    User user = userRepository.findByEmail(request.getEmail()).orElse(null);
//
//	    if (user == null) {
//	        return new LoginResponse("Invalid Email", null, null, null, null, null);
//	    }
//
//	    if (user.getIsDeleted() == 1) {
//	        return new LoginResponse("Account Deleted", null, null, null, null, null);
//	    }
//
//	    if (user.getStatus() == 0) {
//	        return new LoginResponse("Waiting for Admin Approval", null, null, null, null, null);
//	    }
//
//	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//	        return new LoginResponse("Invalid Password", null, null, null, null, null);
//	    }
//
//	    // Generate JWT
//	    String token = jwtUtil.generateToken(user.getEmail());
//
//	    return new LoginResponse(
//	            "Login Successful",
//	            token,
//	            user.getUserId(),
//	            user.getName(),
//	            user.getEmail(),
//	            user.getRole().getRoleName().name()
//	    );
//	}
	
	public LoginResponse login(LoginRequest request) {

	    User user = userRepository.findByEmail(request.getEmail()).orElse(null);

	    if (user == null) {
	        return new LoginResponse("Invalid Email", null, null, null, null, null, null);
	    }

	    if (user.getIsDeleted() == 1) {
	        return new LoginResponse("Account Deleted", null, null, null, null, null, null);
	    }

	    if (user.getStatus() == 0) {
	        return new LoginResponse("Waiting for Admin Approval", null, null, null, null, null, null);
	    }

	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        return new LoginResponse("Invalid Password", null, null, null, null, null, null);
	    }

	    // Generate JWT
	    String token = jwtUtil.generateToken(user.getEmail());

	    Integer sellerId = null;

	    // Only fetch sellerId if logged in user is Seller
	    if (user.getRole().getRoleName().name().equalsIgnoreCase("Seller")) {

	        Seller seller = sellerRepository
	                .findByUserUserId(user.getUserId())
	                .orElse(null);

	        if (seller != null) {
	            sellerId = seller.getSellerId();
	        }
	    }

	    return new LoginResponse(
	            "Login Successful",
	            token,
	            user.getUserId(),
	            sellerId,
	            user.getName(),
	            user.getEmail(),
	            user.getRole().getRoleName().name()
	    );
	}
	
	// Get All Users
	public List<User> getAllUsers() {
	    return userRepository.findByIsDeleted(0);
	}
	
	 // Get User By Id
	public User getUserById(Integer id) {
	    return userRepository.findByUserIdAndIsDeleted(id, 0).orElse(null);
	}
	
	//Soft delete data//
	public String deleteUser(Integer id) {
	    User user = userRepository.findById(id).orElse(null);
	    if (user == null) {
	        return "User Not Found";
	    }
	    user.setIsDeleted(1);
	    userRepository.save(user);
	    return "User Deleted Successfully";
	}
	
	//Update Customer//
	public String updateCustomer(Integer id, UpdateCustomerRequest request) {

	    User user = userRepository.findByUserIdAndIsDeleted(id, 0).orElse(null);

	    if (user == null) {
	        return "User Not Found";
	    }

	    Customer customer = customerRepository.findByUserUserId(id).orElse(null);

	    if (customer == null) {
	        return "Customer Not Found";
	    }

	    // Update Users table
	    user.setName(request.getName());
	    user.setEmail(request.getEmail());
	    user.setMobile(request.getMobile());

	    userRepository.save(user);

	    // Update Customer table
	    customer.setAddress(request.getAddress());
	    customer.setCity(request.getCity());
	    customer.setState(request.getState());
	    customer.setPincode(request.getPincode());

	    customerRepository.save(customer);

	    return "Customer Updated Successfully";
	}
	
	public String updateSeller(Integer id, UpdateSellerRequest request) {

	    User user = userRepository.findByUserIdAndIsDeleted(id, 0).orElse(null);

	    if (user == null) {
	        return "User Not Found";
	    }

	    Seller seller = sellerRepository.findByUserUserId(id).orElse(null);

	    if (seller == null) {
	        return "Seller Not Found";
	    }

	    // Update users table
	    user.setName(request.getName());
//	    user.setEmail(request.getEmail());
	    user.setMobile(request.getMobile());

	    userRepository.save(user);

	    // Update seller table
	    seller.setShopName(request.getShopName());
	    seller.setGstNumber(request.getGstNumber());
	    seller.setBusinessAddress(request.getBusinessAddress());

	    sellerRepository.save(seller);

	    return "Seller Updated Successfully";
	}
	
	//Seller Profile//
	public SellerProfileResponse getSellerProfile(Integer userId){
	    Seller seller = sellerRepository
	            .findByUserUserId(userId)
	            .orElse(null);
	    if(seller == null){
	        return null;
	    }

	    User user = seller.getUser();
	    return new SellerProfileResponse(
	            user.getUserId(),
	            user.getName(),
	            user.getEmail(),
	            user.getMobile(),

	            seller.getShopName(),
	            seller.getGstNumber(),
	            seller.getBusinessAddress()
	    );
	}
	
}
