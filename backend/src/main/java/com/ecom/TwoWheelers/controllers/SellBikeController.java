package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.SellBikeRequestDTO;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.service.BikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sell-bike")
@RequiredArgsConstructor
public class SellBikeController {

    private final BikeService bikeService;

    // ➕ Add a used bike for sale
    @PostMapping
    public ResponseEntity<Bike> sellUsedBike(@RequestBody SellBikeRequestDTO dto) {
        return ResponseEntity.ok(bikeService.sellUsedBike(dto));
    }

    // 👀 View all bikes listed by this buyer
    @GetMapping("/{buyerId}")
    public ResponseEntity<List<Bike>> getUsedBikesByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(bikeService.getUsedBikesByBuyer(buyerId));
    }

    // ❌ Delete a listed used bike
    @DeleteMapping("/{bikeId}/{buyerId}")
    public ResponseEntity<String> deleteUsedBike(@PathVariable Long bikeId, @PathVariable Long buyerId) {
        bikeService.deleteUsedBike(bikeId, buyerId);
        return ResponseEntity.ok("Bike deleted successfully.");
    }
}
