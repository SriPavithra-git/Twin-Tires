package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // ✅ Create new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order saved = orderService.createOrder(order);
        return ResponseEntity.ok(saved);
    }
    // ✅ Get all orders for a seller
    @GetMapping("/seller/{sellerId}")
    public List<Order> getOrdersBySeller(@PathVariable Long sellerId) {
        return orderService.getOrdersBySeller(sellerId);
    }


    // ✅ Get all orders (for admin or debugging)
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // ✅ Get all orders for a user (buyer)
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    // ✅ Get single order details
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    // ✅ Update order status
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Order updated = orderService.updateStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete order (optional)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
