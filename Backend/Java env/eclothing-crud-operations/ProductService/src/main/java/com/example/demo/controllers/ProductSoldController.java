package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.SoldRequest;
import com.example.demo.entities.ProductSold;
import com.example.demo.service.ProductSoldService;

@RestController
@RequestMapping("/sold")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductSoldController {

    @Autowired
    private ProductSoldService soldService;

    @PostMapping
    public ProductSold addSoldEntry(
            @RequestBody SoldRequest request){

        return soldService.addSoldEntry(request);

    }

}