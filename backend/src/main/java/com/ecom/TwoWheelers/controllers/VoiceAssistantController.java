package com.ecom.TwoWheelers.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.json.JSONObject;
import java.net.http.*;
import java.net.URI;

/**
 * VoiceAssistantController
 * Handles text received from frontend and returns an AI-generated response.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // change if your frontend uses a different port
public class VoiceAssistantController {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @PostMapping(value = "/voice", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> processVoice(@RequestBody String requestBody) {
        try {
            JSONObject json = new JSONObject(requestBody);
            String userText = json.getString("text");

            // Build the prompt for OpenAI
            String prompt = """
                    You are a multilingual voice assistant for a bike marketplace called "Vahan Bazar".
                    The user may speak in any Indian language or English.
                    Detect the language and intent from their sentence.
                    Intent may be: buy, sell, fill_form, navigate, services, etc.
                    Reply in the SAME language as the user.
                    Example:
                    User: Fill name as Tulasi
                    Response JSON: {"reply":"Okay, filled name as Tulasi!","intent":"fill_form","field":"name","value":"Tulasi","language":"en-IN"}
                    Now process:
                    """ + userText;

            // Build request to OpenAI
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/responses"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + openaiApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(
                            "{\"model\": \"gpt-4o-mini\", \"input\": \"" + prompt.replace("\"", "\\\"") + "\"}"
                    ))
                    .build();

            // Get response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Extract plain text JSON from OpenAI output
            JSONObject res = new JSONObject(response.body());
            String replyText = res.getJSONArray("output")
                    .getJSONObject(0)
                    .getJSONArray("content")
                    .getJSONObject(0)
                    .getString("text")
                    .trim();

            return ResponseEntity.ok(replyText);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("{\"error\":\"" + e.getMessage() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}