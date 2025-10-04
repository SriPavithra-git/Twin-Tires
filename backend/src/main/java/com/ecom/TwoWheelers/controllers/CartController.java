package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Cart;
import com.ecom.TwoWheelers.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam Long userId,
                                          @RequestParam Long bikeId,
                                          @RequestParam(required = false) Integer quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, bikeId, quantity));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Cart>> getCartItems(@RequestParam Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestParam Long userId,
                                                 @RequestParam Long bikeId) {
        cartService.removeFromCart(userId, bikeId);
        return ResponseEntity.ok("Item removed from cart");
    }
}
