package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Create new order
    public Order createOrder(Order order) {
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }
    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }


    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get orders by buyer (user)
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByBuyerId(userId);
    }

    // Get single order
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    // Update order status
    public Order updateStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Delete order (optional)
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
