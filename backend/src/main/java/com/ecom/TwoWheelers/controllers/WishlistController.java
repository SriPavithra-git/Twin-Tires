package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.CartItemDto;
import com.ecom.TwoWheelers.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<String> addToWishlist(
            @RequestParam Long userId,
            @RequestParam Long newBikeId
    ) {
        wishlistService.addToWishlist(userId, newBikeId);
        return ResponseEntity.ok("✅ Added to wishlist successfully");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromWishlist(
            @RequestParam Long userId,
            @RequestParam Long newBikeId
    ) {
        wishlistService.removeFromWishlist(userId, newBikeId);
        return ResponseEntity.ok("🗑️ Removed from wishlist successfully");
    }

    @GetMapping("/items")
    public ResponseEntity<List<CartItemDto>> getWishlistItems(
            @RequestParam Long userId
    ) {
        List<CartItemDto> items = wishlistService.getWishlistItems(userId);
        return ResponseEntity.ok(items);
    }
}
