package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Seller;

public interface SellerRepository extends JpaRepository<Seller, Integer> {

}
