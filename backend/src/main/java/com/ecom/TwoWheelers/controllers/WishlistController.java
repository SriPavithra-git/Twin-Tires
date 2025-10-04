package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Wishlist;
import com.ecom.TwoWheelers.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin("*")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<Wishlist> addToWishlist(@RequestParam Long userId, @RequestParam Long bikeId) {
        Wishlist wishlist = wishlistService.addToWishlist(userId, bikeId);
        if (wishlist == null) {
            return ResponseEntity.badRequest().build(); // Already in wishlist
        }
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromWishlist(@RequestParam Long userId, @RequestParam Long bikeId) {
        wishlistService.removeFromWishlist(userId, bikeId);
        return ResponseEntity.ok("Bike removed from wishlist");
    }

    @GetMapping("/my")
    public ResponseEntity<List<Wishlist>> getMyWishlist(@RequestParam Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlistByUser(userId));
    }
}
