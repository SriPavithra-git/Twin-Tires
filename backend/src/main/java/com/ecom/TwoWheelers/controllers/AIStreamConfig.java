package com.ecom.TwoWheelers.controllers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;

import java.util.Map;

@Configuration
public class AIStreamConfig {

    @Bean
    public SimpleUrlHandlerMapping webSocketMapping(AIStreamHandler handler) {
        // Map WebSocket path to handler
        return new SimpleUrlHandlerMapping(Map.of("/api/ai/stream", handler), 1);
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
}
