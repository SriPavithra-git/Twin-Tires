package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.CartItemDto;
import com.ecom.TwoWheelers.service.BargainService;
import com.ecom.TwoWheelers.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 🛒 CartController — Handles all user cart operations
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ✅ frontend origin for local dev
public class CartController {

    private final CartService cartService;
    private final BargainService bargainService;

    /**
     * ➕ Add a bike to the cart
     * Example:
     *  - POST /api/cart/add?userId=3&newBikeId=5&quantity=2
     *  - POST /api/cart/add?userId=3&usedBikeId=10
     */
    @PostMapping("/add")
    public ResponseEntity<String> addToCart(
            @RequestParam Long userId,
            @RequestParam(required = false) Long newBikeId,
            @RequestParam(required = false) Long usedBikeId,
            @RequestParam(defaultValue = "1") Integer quantity
    ) {
        System.out.println("🛒 Adding to cart → userId=" + userId +
                ", newBikeId=" + newBikeId + ", usedBikeId=" + usedBikeId + ", qty=" + quantity);

        cartService.addToCart(userId, newBikeId, usedBikeId, quantity);
        return ResponseEntity.ok("✅ Bike added to cart successfully");
    }

    /**
     * 💰 Add used bike to cart with custom (offer) price — for accepted bargains
     * Example:
     *  POST /api/cart/add-offer?userId=3&usedBikeId=12&customPrice=56000
     */


    /**
     * ❌ Remove a specific bike from user's cart
     * Example:
     *  - DELETE /api/cart/remove?userId=3&newBikeId=5
     *  - DELETE /api/cart/remove?userId=3&usedBikeId=10
     */
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromCart(
            @RequestParam Long userId,
            @RequestParam(required = false) Long newBikeId,
            @RequestParam(required = false) Long usedBikeId
    ) {
        System.out.println("🗑 Removing bike from cart → user=" + userId +
                ", newBike=" + newBikeId + ", usedBike=" + usedBikeId);

        if (newBikeId != null) {
            cartService.removeFromCart(userId, newBikeId);
        } else if (usedBikeId != null) {
            cartService.removeUsedBikeFromCart(userId, usedBikeId);
        } else {
            throw new IllegalArgumentException("Either newBikeId or usedBikeId must be provided");
        }

        return ResponseEntity.ok("🗑️ Bike removed from cart successfully");
    }

    /**
     * 🧾 Get all cart items for a given user
     * Example: GET /api/cart/items?userId=3
     */
    @GetMapping("/items")
    public ResponseEntity<List<CartItemDto>> getCartItems(@RequestParam Long userId) {
        System.out.println("🧾 Fetching cart for userId=" + userId);
        List<CartItemDto> items = cartService.getCartItemsByUser(userId);
        return ResponseEntity.ok(items);
    }
    @PostMapping("/add-offer")
    public ResponseEntity<String> addOfferToCart(@RequestBody Map<String, Long> body) {
        Long offerId = body.get("offerId");
        bargainService.addAcceptedOfferToCart(offerId);
        return ResponseEntity.ok("Offer added to cart");
    }


    /**
     * 🧹 Clear entire cart for a given user
     * Example: DELETE /api/cart/clear?userId=3
     */
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@RequestParam Long userId) {
        System.out.println("🧹 Clearing cart for userId=" + userId);
        cartService.clearCart(userId);
        return ResponseEntity.ok("🧹 Cart cleared successfully");
    }
}
