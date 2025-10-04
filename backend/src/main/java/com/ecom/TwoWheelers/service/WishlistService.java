package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.exception.ResourceNotFoundException;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.model.Wishlist;
import com.ecom.TwoWheelers.repository.BikeRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import com.ecom.TwoWheelers.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BikeRepository bikeRepository;

    // Add bike to wishlist
    public Wishlist addToWishlist(Long userId, Long bikeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + bikeId));

        // Check if already in wishlist
        if (wishlistRepository.findByUserIdAndBikeBikeId(userId, bikeId).isPresent()) {
            return null; // or throw exception if you want
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setBike(bike);

        return wishlistRepository.save(wishlist);
    }

    // Remove bike from wishlist
    public void removeFromWishlist(Long userId, Long bikeId) {
        Wishlist wishlist = wishlistRepository.findByUserIdAndBikeBikeId(userId, bikeId)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found"));
        wishlistRepository.delete(wishlist);
    }

    // View wishlist for a user
    public List<Wishlist> getWishlistByUser(Long userId) {
        return wishlistRepository.findByUser_Id(userId);
    }
}
