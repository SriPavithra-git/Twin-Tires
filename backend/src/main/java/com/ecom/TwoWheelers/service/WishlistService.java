package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.dto.CartItemDto;
import com.ecom.TwoWheelers.model.NewBike;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.model.Wishlist;
import com.ecom.TwoWheelers.repository.NewBikeRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import com.ecom.TwoWheelers.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final NewBikeRepository newBikeRepository;

    /** ➕ Add to wishlist */
    public void addToWishlist(Long userId, Long newBikeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        NewBike bike = newBikeRepository.findById(newBikeId)
                .orElseThrow(() -> new RuntimeException("Bike not found"));

        boolean exists = wishlistRepository.findByUserIdAndNewBikeId(userId, newBikeId).isPresent();
        if (!exists) {
            Wishlist w = new Wishlist(null, user, bike);
            wishlistRepository.save(w);
        }
    }

    /** ❌ Remove from wishlist */
    public void removeFromWishlist(Long userId, Long newBikeId) {
        wishlistRepository.findByUserIdAndNewBikeId(userId, newBikeId)
                .ifPresent(wishlistRepository::delete);
    }

    /** 🧾 Get all wishlist items */
    public List<CartItemDto> getWishlistItems(Long userId) {
        return wishlistRepository.findByUserId(userId)
                .stream()
                .map(w -> {
                    NewBike b = w.getNewBike();
                    String image = (b.getImageUrls() != null && !b.getImageUrls().isEmpty())
                            ? b.getImageUrls().get(0)
                            : "/placeholder-bike.jpg";

                    BigDecimal price = b.getPrice() != null ? b.getPrice() : BigDecimal.ZERO;

                    return new CartItemDto(
                            w.getId(),
                            1, // quantity always 1 in wishlist
                            new CartItemDto.BikeDto(
                                    b.getId(),
                                    b.getBrand(),
                                    b.getModel(),
                                    price,
                                    image,
                                    "NEW" // ✅ since Wishlist currently uses NewBike only
                            )
                    );
                })
                .toList();
    }
}
