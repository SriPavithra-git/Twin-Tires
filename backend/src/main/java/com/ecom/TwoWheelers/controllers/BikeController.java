package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.BikeRequestDTO;
import com.ecom.TwoWheelers.enums.BikeType;
import com.ecom.TwoWheelers.enums.FuelType;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/bikes")
@CrossOrigin("*")
public class BikeController {

    @Autowired
    private BikeService bikeService;

    // Add bike with multiple images
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Bike> addBike(
            @ModelAttribute BikeRequestDTO dto,
            @RequestPart("images") List<MultipartFile> images) throws IOException {

        Bike savedBike = bikeService.addBikeWithImages(dto, images);
        return ResponseEntity.ok(savedBike);
    }

    // Update bike (optionally add new images)
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Bike> updateBike(
            @PathVariable Long id,
            @ModelAttribute BikeRequestDTO dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) throws IOException {

        Bike updatedBike = bikeService.updateBike(id, dto, images);
        return ResponseEntity.ok(updatedBike);
    }

    // Delete bike and all associated images
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBike(@PathVariable Long id) {
        bikeService.deleteBike(id);
        return ResponseEntity.ok("Bike and associated images deleted successfully!");
    }

    // Get all bikes
    @GetMapping("/all")
    public ResponseEntity<List<Bike>> getAllBikes() {
        return ResponseEntity.ok(bikeService.getAllBikes());
    }

    // Get bikes by seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Bike>> getBikesBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(bikeService.getBikesBySeller(sellerId));
    }

    @GetMapping("/search")
    public List<Bike> searchFilterSort(
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

}
