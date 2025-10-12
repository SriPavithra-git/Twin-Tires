package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.dto.CartItemDto;
import com.ecom.TwoWheelers.model.*;
import com.ecom.TwoWheelers.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final NewBikeRepository newBikeRepository;
    private final UsedBikeRepository usedBikeRepository;

    /* ==========================================================
       🛒 ADD TO CART — Handles both new & used bikes safely
       ========================================================== */
    public void addToCart(Long userId, Long newBikeId, Long usedBikeId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int qty = (quantity != null ? quantity : 1);
        Cart cartItem;

        if (newBikeId != null) {
            NewBike newBike = newBikeRepository.findById(newBikeId)
                    .orElseThrow(() -> new RuntimeException("New bike not found"));

            cartItem = cartRepository.findByUserIdAndNewBikeId(userId, newBikeId)
                    .orElseGet(() -> {
                        Cart c = new Cart();
                        c.setUser(user);
                        c.setNewBike(newBike);
                        c.setQuantity(0);
                        return c;
                    });

            cartItem.setQuantity(cartItem.getQuantity() + qty);

        } else if (usedBikeId != null) {
            UsedBike usedBike = usedBikeRepository.findById(usedBikeId)
                    .orElseThrow(() -> new RuntimeException("Used bike not found"));

            cartItem = cartRepository.findByUserIdAndUsedBikeId(userId, usedBikeId)
                    .orElseGet(() -> {
                        Cart c = new Cart();
                        c.setUser(user);
                        c.setUsedBike(usedBike);
                        c.setQuantity(0);
                        return c;
                    });

            cartItem.setQuantity(cartItem.getQuantity() + qty);

        } else {
            throw new RuntimeException("Either newBikeId or usedBikeId must be provided");
        }

        cartRepository.save(cartItem);
    }

    /* ==========================================================
       💰 ADD USED BIKE TO CART WITH CUSTOM PRICE (after offer)
       ========================================================== */
    public void addUsedBikeToCartWithCustomPrice(Long userId, Long usedBikeId,
                                                 BigDecimal customPrice, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UsedBike usedBike = usedBikeRepository.findById(usedBikeId)
                .orElseThrow(() -> new RuntimeException("Used bike not found"));

        Cart cartItem = cartRepository.findByUserIdAndUsedBikeId(userId, usedBikeId)
                .orElse(null);

        if (cartItem == null) {
            cartItem = new Cart();
            cartItem.setUser(user);
            cartItem.setUsedBike(usedBike);
            cartItem.setQuantity(quantity != null ? quantity : 1);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + (quantity != null ? quantity : 1));
        }

        cartItem.setCustomPrice(customPrice); // ✅ store bargain price here
        cartRepository.save(cartItem);
    }


    /* ==========================================================
       ❌ REMOVE ITEMS — separate for new & used
       ========================================================== */
    public void removeFromCart(Long userId, Long newBikeId) {
        cartRepository.findByUserIdAndNewBikeId(userId, newBikeId)
                .ifPresent(cartRepository::delete);
    }

    public void removeUsedBikeFromCart(Long userId, Long usedBikeId) {
        cartRepository.findByUserIdAndUsedBikeId(userId, usedBikeId)
                .ifPresent(cartRepository::delete);
    }

    /* ==========================================================
       🧾 FETCH CART ITEMS
       ========================================================== */
    /* ==========================================================
   🧾 FETCH CART ITEMS
   ========================================================== */
    public List<CartItemDto> getCartItemsByUser(Long userId) {
        List<Cart> rows = cartRepository.findByUserId(userId);

        return rows.stream().map(row -> {
            String brand, model, image, type;
            BigDecimal price;
            Long bikeId;

            if (row.getNewBike() != null) {
                NewBike b = row.getNewBike();
                brand = b.getBrand();
                model = b.getModel();
                image = (b.getImageUrls() != null && !b.getImageUrls().isEmpty())
                        ? b.getImageUrls().get(0)
                        : "/placeholder-bike.jpg";
                price = b.getPrice();
                type = "NEW";
                bikeId = b.getId();

            } else if (row.getUsedBike() != null) {
                UsedBike b = row.getUsedBike();
                brand = b.getBrand();
                model = b.getModel();
                image = b.getImageUrl();
                // ✅ Prefer custom (bargain) price if available
                price = (row.getCustomPrice() != null) ? row.getCustomPrice() : b.getPrice();
                type = "USED";
                bikeId = b.getId();

            } else {
                brand = "Unknown";
                model = "";
                image = "/placeholder-bike.jpg";
                price = BigDecimal.ZERO;
                type = "UNKNOWN";
                bikeId = null;
            }

            return new CartItemDto(
                    row.getId(),
                    row.getQuantity(),
                    new CartItemDto.BikeDto(bikeId, brand, model, price, image, type)
            );
        }).toList();
    }

    /* ==========================================================
       🧹 CLEAR CART
       ========================================================== */
    public void clearCart(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(carts);
    }
}
