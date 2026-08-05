package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ChatRequest;
import com.example.demo.service.AiService;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody ChatRequest request) {

        return aiService.chat(request.getMessage());

    }
}