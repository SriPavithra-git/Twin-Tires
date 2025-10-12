package com.ecom.TwoWheelers.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
public class AIStreamHandler implements WebSocketHandler {

    private final WebClient webClient;

    public AIStreamHandler(@Value("${OPENAI_API_KEY:}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        System.out.println("✅ WebSocket connected: " + session.getId());

        Flux<WebSocketMessage> output = session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .flatMap(text -> streamFromOpenAI(text))
                .map(session::textMessage)
                .doOnError(e -> System.err.println("❌ Error during streaming: " + e))
                .doOnComplete(() -> System.out.println("🧩 Stream complete."));

        return session.send(output);
    }

    private Flux<String> streamFromOpenAI(String userMessage) {
        System.out.println("🎙 User said: " + userMessage);

        String payload = """
                {
                  "model": "gpt-4o-mini",
                  "stream": true,
                  "messages": [
                    {"role": "system", "content": "You are TwinTires’ live voice assistant. Speak like a friendly human, one sentence at a time."},
                    {"role": "user", "content": "%s"}
                  ]
                }
                """.formatted(userMessage);

        return webClient.post()
                .uri("/v1/chat/completions")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .bodyValue(payload)
                .retrieve()
                .bodyToFlux(String.class)
                .map(chunk -> {
                    if (!chunk.startsWith("data:")) return "";
                    String clean = chunk.substring(5).trim();
                    if ("[DONE]".equals(clean)) return "";

                    try {
                        int start = clean.indexOf("\"content\":\"") + 11;
                        int end = clean.indexOf("\"", start);
                        if (start > 10 && end > start)
                            return clean.substring(start, end);
                    } catch (Exception ignored) {}

                    return "";
                })
                .filter(s -> !s.isEmpty())
                .delayElements(Duration.ofMillis(25))
                .doOnError(e -> System.err.println("⚠️ OpenAI stream error: " + e.getMessage()));
    }
}
