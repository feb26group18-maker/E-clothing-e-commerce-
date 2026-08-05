package com.example.demo.dto;

public class ShoppingRequest {

    private String prompt;

    public ShoppingRequest() {
    }

    public ShoppingRequest(String prompt) {
        this.prompt = prompt;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}