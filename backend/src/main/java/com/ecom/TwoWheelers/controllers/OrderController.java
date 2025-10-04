package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<List<Order>> placeOrder(@RequestParam Long userId,
                                                  @RequestParam String paymentType) {
        return ResponseEntity.ok(orderService.placeOrder(userId, paymentType));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@RequestParam Long userId) {
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }
}
