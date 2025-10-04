package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.Cart;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.BikeRepository;
import com.ecom.TwoWheelers.repository.CartRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BikeRepository bikeRepository;

    public Cart addToCart(Long userId, Long bikeId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new RuntimeException("Bike not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setBike(bike);
        cart.setQuantity(quantity != null ? quantity : 1);

        return cartRepository.save(cart);
    }

    public List<Cart> getCartItems(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user);
    }

    public void removeFromCart(Long userId, Long bikeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new RuntimeException("Bike not found"));

        cartRepository.deleteByUserAndBike(user, bike);
    }

    public void clearCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> items = cartRepository.findByUser(user);
        cartRepository.deleteAll(items);
    }
}
