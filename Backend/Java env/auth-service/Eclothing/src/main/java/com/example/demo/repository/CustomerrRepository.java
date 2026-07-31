package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Customer;

public interface CustomerrRepository extends JpaRepository<Customer,Integer> {
	Optional<Customer> findByUserUserId(Integer userId);
}
