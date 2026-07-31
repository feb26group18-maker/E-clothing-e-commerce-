package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Seller;

public interface SellerRepository extends JpaRepository<Seller,Integer> {
	Optional<Seller> findByUserUserId(Integer userId);

}
