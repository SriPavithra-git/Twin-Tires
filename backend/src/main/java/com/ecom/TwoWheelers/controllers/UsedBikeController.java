package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.BikeRequestDTO;
import com.ecom.TwoWheelers.dto.SellBikeRequestDTO;
import com.ecom.TwoWheelers.enums.BikeType;
import com.ecom.TwoWheelers.enums.FuelType;
import com.ecom.TwoWheelers.model.UsedBike;
import com.ecom.TwoWheelers.service.UsedBikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
// Support BOTH old (/bikes) and new (/api/bikes) base paths
@RequestMapping({"/bikes", "/api/bikes"})
public class BikeController {

    @Autowired
    private UsedBikeService bikeService;

    // ------------------- Public landing list -------------------
    // GET /api/bikes?q=...&category=...
    @GetMapping
    public List<Map<String, Object>> listForLanding(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category
    ) {
        return bikeService.getAllBikes().stream()
                // text search across brand + model + city
                .filter(b -> {
                    if (q == null || q.isBlank()) return true;
                    String hay = (b.getBrand() + " " + b.getModel() + " " + b.getCity()).toLowerCase();
                    return hay.contains(q.toLowerCase());
                })
                // category filter: currently derive from fuel type (electric) else "commuter"
                .filter(b -> {
                    if (category == null || category.isBlank()) return true;
                    String tag = deriveTypeTag(b);
                    return tag.equalsIgnoreCase(category);
                })
                // trim payload to what the React landing needs
                .map(b -> Map.<String, Object>of(
                        "id", b.getBikeId(),
                        "name", (b.getBrand() + " " + b.getModel()).trim(),
                        "price", b.getPrice(),
                        "city", b.getCity(),
                        "year", b.getYear(),
                        // using mileage for now; later you can add a kmsDriven field
                        "kms", b.getMileage(),
                        "type", deriveTypeTag(b),
                        "image", (b.getImageUrls() != null && !b.getImageUrls().isEmpty())
                                ? b.getImageUrls().get(0)
                                : null
                ))
                .collect(Collectors.toList());
    }

    // Optional: single bike for details/compare later
    @GetMapping("/{id}")
    public Map<String, Object> getOne(@PathVariable Long id) {
        UsedBike b = bikeService.getAllBikes().stream()
                .filter(x -> x.getBikeId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Bike not found"));

        return Map.of(
                "id", b.getBikeId(),
                "name", (b.getBrand() + " " + b.getModel()).trim(),
                "price", b.getPrice(),
                "city", b.getCity(),
                "year", b.getYear(),
                "kms", b.getMileage(),
                "type", deriveTypeTag(b),
                "images", b.getImageUrls()
        );
    }

    // Helper to produce a UI-friendly category tag
    private String deriveTypeTag(UsedBike b) {
        if (b.getFuelType() != null && "ELECTRIC".equalsIgnoreCase(b.getFuelType().name())) {
            return "electric";
        }
        return "commuter"; // fallback until you add explicit category data
    }

    // ------------------- Your existing admin/seller endpoints -------------------

    // Add bike with multiple images
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UsedBike> addBike(
            @ModelAttribute BikeRequestDTO dto,
            @RequestPart("images") List<MultipartFile> images) throws IOException {
        UsedBike savedBike = bikeService.addBikeWithImages(dto, images);
        return ResponseEntity.ok(savedBike);
    }

    // Update bike (optionally add new images)
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UsedBike> updateBike(
            @PathVariable Long id,
            @ModelAttribute BikeRequestDTO dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {
        UsedBike updatedBike = bikeService.updateBike(id, dto, images);
        return ResponseEntity.ok(updatedBike);
    }

    // Delete bike and all associated images
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBike(@PathVariable Long id) {
        bikeService.deleteBike(id);
        return ResponseEntity.ok("Bike and associated images deleted successfully!");
    }

    // Get all bikes (full entity) — keep for admin
    @GetMapping("/all")
    public ResponseEntity<List<UsedBike>> getAllBikes() {
        return ResponseEntity.ok(bikeService.getAllBikes());
    }

    // Get bikes by seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<UsedBike>> getBikesBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(bikeService.getBikesBySeller(sellerId));
    }

    // Advanced search
    @GetMapping("/search")
    public List<UsedBike> searchFilterSort(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) FuelType fuelType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String mileage,
            @RequestParam(required = false) String engineCapacity,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) BikeType type,
            @RequestParam(required = false) Integer ownerType,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection
    ) {
        return bikeService.searchFilterSort(
                brand, model, city, fuelType, minPrice, maxPrice,
                mileage, engineCapacity, year, type, ownerType, condition, sortBy, sortDirection
        );
    }
    // ===== USED-BIKE (Buyer sells their own bike) =====

    // Buyer lists their used bike (no images via Cloudinary in this flow yet;
// if you want images here too, we can switch to multipart later)
    @PostMapping("/used/sell")
    public ResponseEntity<UsedBike> sellUsedBike(@RequestBody SellBikeRequestDTO dto) {
        return ResponseEntity.ok(bikeService.sellUsedBike(dto));
    }

    // Buyer fetches all used bikes they listed
    @GetMapping("/used/buyer/{buyerId}")
    public ResponseEntity<List<UsedBike>> getUsedBikesByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(bikeService.getUsedBikesByBuyer(buyerId));
    }

    // Buyer deletes one of their used bikes
    @DeleteMapping("/used/{bikeId}/buyer/{buyerId}")
    public ResponseEntity<Void> deleteUsedBike(@PathVariable Long bikeId, @PathVariable Long buyerId) {
        bikeService.deleteUsedBike(bikeId, buyerId);
        return ResponseEntity.noContent().build();
    }

}
