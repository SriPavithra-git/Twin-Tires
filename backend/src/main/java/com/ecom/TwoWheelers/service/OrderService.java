package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.enums.BikeStatus;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.Cart;
import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.BikeRepository;
import com.ecom.TwoWheelers.repository.CartRepository;
import com.ecom.TwoWheelers.repository.OrderRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BikeRepository bikeRepository;

    @Autowired
    private CartRepository cartRepository;

    public List<Order> placeOrder(Long userId, String paymentType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Cart> cartItems = cartRepository.findByUser(user);
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        List<Order> orders = new ArrayList<>();
        for (Cart cart : cartItems) {
            Order order = new Order();
            order.setBuyer(user);
            order.setBike(cart.getBike());
            order.setPaymentType(paymentType);
            order.setStatus("Pending");
            orders.add(orderRepository.save(order));

            // Mark bike as SOLD
            Bike bike = cart.getBike();
            bike.setStatus(BikeStatus.SOLD);
            bikeRepository.save(bike);
        }

        // Clear cart
        cartRepository.deleteAll(cartItems);

        return orders;
    }

    public List<Order> getMyOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByBuyer(user);
    }
}
