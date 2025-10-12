package com.ecom.TwoWheelers.controllers;

import jakarta.annotation.PostConstruct;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Value("${OPENAI_API_KEY:}")
    private String apiKey;

    private final RestTemplate rest = new RestTemplate();
    private final Map<String, List<Map<String, String>>> conversations = new ConcurrentHashMap<>();
    private WebClient webClient;

    @PostConstruct
    public void init() {
        if (apiKey == null || apiKey.isBlank()) {
            System.err.println("❌ OPENAI_API_KEY not found or empty!");
        } else {
            System.out.println("✅ OpenAI key loaded: " + apiKey.substring(0, 8) + "********");
        }

        // ✅ Build WebClient for streaming
        webClient = WebClient.builder()
                .baseUrl("https://api.openai.com")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    // 🧠 Normal chat endpoint (no streaming)
    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody Map<String, String> body) {
        try {
            String message = body.getOrDefault("message", "");
            String lang = body.getOrDefault("lang", "auto");
            String sessionId = body.getOrDefault("sessionId", "default");

            conversations.putIfAbsent(sessionId, new CopyOnWriteArrayList<>());
            List<Map<String, String>> history = conversations.get(sessionId);
            history.add(Map.of("role", "user", "content", message));

            JSONArray messages = new JSONArray();
            messages.put(new JSONObject().put("role", "system").put("content", """
                    You are TwinTires AI — a multilingual, intelligent voice assistant for a motorcycle e-commerce website.
                    You act like a human assistant who can understand voice instructions, remember context, and perform actions.
                    
                    🧭 Available actions (return them as JSON when needed):
                    - {"action":"navigate","target":"/buy"}
                    - {"action":"filter","criteria":{"brand":"Honda","maxPrice":80000}}
                    - {"action":"addToCart","item":{"bikeId":5}}
                    - {"action":"deleteItem","target":"cart","id":3}
                    - {"action":"fillForm","fields":{"name":"Prasad"}}
                    
                    If the user asks to do something, respond conversationally (like a human) and include the correct JSON action.
                    If no action is needed, just respond naturally.
                    
                    Be friendly, helpful, and short like ChatGPT Voice.
                    """));

            for (Map<String, String> msg : history) {
                messages.put(new JSONObject()
                        .put("role", msg.get("role"))
                        .put("content", msg.get("content")));
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            JSONObject req = new JSONObject()
                    .put("model", "gpt-4o-mini")
                    .put("messages", messages)
                    .put("temperature", 0.7);

            ResponseEntity<String> resp = rest.exchange(
                    "https://api.openai.com/v1/chat/completions",
                    HttpMethod.POST,
                    new HttpEntity<>(req.toString(), headers),
                    String.class
            );

            JSONObject json = new JSONObject(resp.getBody());
            String reply = json.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content")
                    .trim();

            history.add(Map.of("role", "assistant", "content", reply));

            JSONObject actionObj = null;
            int idx = reply.indexOf('{');
            if (idx != -1) {
                try {
                    actionObj = new JSONObject(reply.substring(idx));
                } catch (Exception ignored) {
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("reply", reply);
            response.put("lang", lang);
            if (actionObj != null) response.put("action", actionObj.toMap());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // 🔄 Reset chat memory
    @PostMapping("/chat/reset")
    public ResponseEntity<String> resetChat(@RequestBody Map<String, String> body) {
        String sessionId = body.getOrDefault("sessionId", "default");
        conversations.remove(sessionId);
        return ResponseEntity.ok("Conversation reset");
    }

    // 🎙 Text-to-Speech (TTS)
    @PostMapping("/speak")
    public ResponseEntity<byte[]> speak(@RequestBody Map<String, String> body) {
        try {
            String text = body.get("text");
            JSONObject payload = new JSONObject()
                    .put("model", "gpt-4o-mini-tts")
                    .put("input", text)
                    .put("voice", "alloy");

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            ResponseEntity<byte[]> res = rest.exchange(
                    "https://api.openai.com/v1/audio/speech",
                    HttpMethod.POST,
                    new HttpEntity<>(payload.toString(), headers),
                    byte[].class
            );

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg")
                    .body(res.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ⚡ Real-time streaming (Server-Sent Events)
    // ⚡ Real-time streaming (Server-Sent Events)
    // ⚡ Real-time streaming (Server-Sent Events)
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamAI(@RequestParam(defaultValue = "Hi there!") String message) {
        String payload = """
                    {
                      "model": "gpt-4o-mini",
                      "stream": true,
                      "messages": [
                        {"role": "system", "content": "You are TwinTires’ live voice assistant. Respond naturally like a friendly human who helps users browse bikes, add to cart, and call dealers."},
                        {"role": "user", "content": "%s"}
                      ]
                    }
                """.formatted(message);

        return webClient.post()
                .uri("/v1/chat/completions")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .bodyValue(payload)
                .retrieve()
                .bodyToFlux(String.class)
                .flatMap(chunk -> {
                    // Ignore non-data lines or empty chunks
                    if (chunk == null || !chunk.startsWith("data:")) return Flux.empty();

                    String clean = chunk.substring(5).trim();
                    if ("[DONE]".equals(clean)) {
                        return Flux.just("data: [END]\n\n");
                    }

                    try {
                        JSONObject json = new JSONObject(clean);
                        JSONObject delta = json.getJSONArray("choices")
                                .getJSONObject(0)
                                .optJSONObject("delta");

                        if (delta != null && delta.has("content")) {
                            String content = delta.getString("content");
                            return Flux.just("data: " + content + "\n\n");
                        }
                    } catch (Exception ignored) {
                    }

                    return Flux.empty();
                })
                // send chunks at readable speed
                .delayElements(Duration.ofMillis(40))
                .timeout(Duration.ofMinutes(2))
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Flux.just("data: [ERROR] " + e.getMessage() + "\n\n");
                })
                .doOnError(err -> System.err.println("⚠️ SSE error: " + err.getMessage()))
                .doOnComplete(() -> System.out.println("✅ SSE stream completed"));
    }
}