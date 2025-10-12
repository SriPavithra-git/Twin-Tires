package com.ecom.TwoWheelers.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class AIService {

    // ✅ Reads from application.properties or environment variable
    @Value("${openai.api.key:${OPENAI_API_KEY:}}")
    private String openaiApiKey;

    public String getAIResponse(String message) {
        try {
            if (openaiApiKey == null || openaiApiKey.isBlank()) {
                System.err.println("❌ OpenAI API key not loaded! Check application.properties or environment variable.");
                return "Server configuration error: missing OpenAI API key.";
            }

            System.out.println("✅ Using OpenAI key prefix: " + openaiApiKey.substring(0, 6) + "...");

            // Prepare HTTP client
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.openai.com/v1/chat/completions";

            // Request body for chat model
            JSONObject body = new JSONObject();
            body.put("model", "gpt-4o-mini");

            JSONArray messages = new JSONArray();
            messages.put(new JSONObject().put("role", "system")
                    .put("content", "You are TwinTires AI assistant — helpful, multilingual, and context-aware."));
            messages.put(new JSONObject().put("role", "user").put("content", message));
            body.put("messages", messages);

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + openaiApiKey);

            // Send request
            HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                JSONObject json = new JSONObject(response.getBody());
                String reply = json
                        .getJSONArray("choices")
                        .getJSONObject(0)
                        .getJSONObject("message")
                        .getString("content")
                        .trim();
                return reply;
            } else {
                return "AI request failed with status: " + response.getStatusCode();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "AI processing failed: " + e.getMessage();
        }
    }
}