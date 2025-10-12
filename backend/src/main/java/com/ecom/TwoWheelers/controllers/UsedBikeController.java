package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.UsedBike;
import com.ecom.TwoWheelers.service.UsedBikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/used-bikes")
@RequiredArgsConstructor
public class UsedBikeController {

    private final UsedBikeService usedBikeService;

    @PostMapping(consumes = {"multipart/form-data"})
    public UsedBike addUsedBike(
            @RequestParam("sellerId") Long sellerId,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("price") BigDecimal price,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("mileage") String mileage,
            @RequestParam("engineCapacity") String engineCapacity,
            @RequestParam("year") Integer year,
            @RequestParam("description") String description,
            @RequestParam("ownerType") String ownerType,
            @RequestParam("city") String city,
            @RequestParam("condition") String conditionStatus,
            @RequestParam("purchaseAge") String purchaseAge,
            @RequestParam(value = "images", required = false) MultipartFile[] images
    ) throws IOException {

        UsedBike bike = new UsedBike();
        bike.setSellerId(sellerId);
        bike.setBrand(brand);
        bike.setModel(model);
        bike.setPrice(price);
        bike.setFuelType(fuelType);
        bike.setMileage(mileage);
        bike.setEngineCapacity(engineCapacity);
        bike.setYear(year);
        bike.setDescription(description);
        bike.setOwnerType(ownerType);
        bike.setCity(city);
        bike.setConditionStatus(conditionStatus);
        bike.setPurchaseAge(purchaseAge);

        if (images != null && images.length > 0) {
            String uploadDir = "uploads/used-bikes/";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = System.currentTimeMillis() + "_" + images[0].getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.copy(images[0].getInputStream(), filePath);
            bike.setImageUrl("uploads/used-bikes/" + fileName);
        }

        return usedBikeService.saveUsedBike(bike);
    }


    @GetMapping(produces = "application/json")
    public List<UsedBike> getAll() {
        return usedBikeService.getAllUsedBikes();
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public UsedBike getById(@PathVariable Long id) {
        return usedBikeService.getById(id);
    }

    @GetMapping("/seller/{sellerId}")
    public List<UsedBike> getBySeller(@PathVariable Long sellerId) {
        return usedBikeService.getBySeller(sellerId);
    }

    @DeleteMapping("/{id}")
    public void deleteUsedBike(@PathVariable Long id) {
        usedBikeService.deleteUsedBike(id);
    }
}