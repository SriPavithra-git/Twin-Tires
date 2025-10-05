package com.ecom.TwoWheelers.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecom.TwoWheelers.dto.BikeRequestDTO;
import com.ecom.TwoWheelers.dto.SellBikeRequestDTO;
import com.ecom.TwoWheelers.enums.BikeStatus;
import com.ecom.TwoWheelers.enums.BikeType;
import com.ecom.TwoWheelers.enums.FuelType;
import com.ecom.TwoWheelers.exception.ResourceNotFoundException;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.BikeRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import com.ecom.TwoWheelers.specifications.BikeSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BikeService {

    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;

    // Add new bike with image
    public Bike addBikeWithImages(BikeRequestDTO dto, List<MultipartFile> images) throws IOException {
        User seller = userRepository.findById(dto.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with ID: " + dto.getSellerId()));

        Bike bike = new Bike();
        bike.setSeller(seller);
        bike.setBrand(dto.getBrand());
        bike.setModel(dto.getModel());
        bike.setPrice(dto.getPrice());
        bike.setYear(dto.getYear());
        bike.setFuelType(dto.getFuelType());
        bike.setMileage(dto.getMileage());
        bike.setEngineCapacity(dto.getEngineCapacity());
        bike.setDescription(dto.getDescription());
        bike.setOwnerType(dto.getOwnerType());
        bike.setCity(dto.getCity());
        bike.setCondition(dto.getCondition());


        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : images) {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", "twowheelers/bikes"));
            imageUrls.add(uploadResult.get("secure_url").toString());
        }

        bike.setImageUrls(imageUrls);

        return bikeRepository.save(bike);
    }


    // Update existing bike
// Update existing bike
    public Bike updateBike(Long bikeId, BikeRequestDTO dto, List<MultipartFile> newImages) throws IOException {
        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + bikeId));

        bike.setBrand(dto.getBrand());
        bike.setModel(dto.getModel());
        bike.setPrice(dto.getPrice());
        bike.setYear(dto.getYear());
        bike.setFuelType(dto.getFuelType());
        bike.setMileage(dto.getMileage());
        bike.setEngineCapacity(dto.getEngineCapacity());
        bike.setDescription(dto.getDescription());
        bike.setOwnerType(dto.getOwnerType());
        bike.setCity(dto.getCity());
        bike.setCondition(dto.getCondition());


        // Upload new images if provided
        if (newImages != null && !newImages.isEmpty()) {
            List<String> existingImages = bike.getImageUrls() != null ? bike.getImageUrls() : new ArrayList<>();

            for (MultipartFile file : newImages) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap("folder", "twowheelers/bikes"));
                existingImages.add(uploadResult.get("secure_url").toString());
            }

            bike.setImageUrls(existingImages);
        }

        return bikeRepository.save(bike);
    }

    // Delete bike and all associated images from Cloudinary
    public void deleteBike(Long bikeId) {
        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + bikeId));

        // Delete all images from Cloudinary
        if (bike.getImageUrls() != null) {
            for (String url : bike.getImageUrls()) {
                try {
                    // Extract public_id from URL
                    String publicId = url.substring(url.indexOf("/twowheelers/bikes/") + 19, url.lastIndexOf("."));
                    cloudinary.uploader().destroy("twowheelers/bikes/" + publicId, ObjectUtils.emptyMap());
                } catch (Exception e) {
                    System.out.println("Failed to delete image from Cloudinary: " + e.getMessage());
                }
            }
        }

        bikeRepository.delete(bike);
    }

    // Get all bikes
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    // Get bikes by seller
    public List<Bike> getBikesBySeller(Long sellerId) {
        return bikeRepository.findBySellerId(sellerId);
    }

    public List<Bike> searchFilterSort(
            String brand,
            String model,
            String city,
            FuelType fuelType,
            Double minPrice,
            Double maxPrice,
            String mileage,
            String engineCapacity,
            Integer year,
            BikeType type,
            Integer ownerType,
            String condition,
            String sortBy,
            String sortDirection
    ) {
        Specification<Bike> spec = Specification.allOf(
                BikeSpecification.hasBrand(brand),
                BikeSpecification.hasModel(model),
                BikeSpecification.hasCity(city),
                BikeSpecification.hasFuelType(fuelType),
                BikeSpecification.hasPriceBetween(minPrice, maxPrice),
                BikeSpecification.hasMileage(mileage),
                BikeSpecification.hasEngineCapacity(engineCapacity),
                BikeSpecification.hasYear(year),
                BikeSpecification.hasType(type),
                BikeSpecification.hasOwnerType(ownerType),
                BikeSpecification.hasCondition(condition)
        );
        Sort sort = Sort.by(Sort.Direction.ASC, sortBy == null ? "price" : sortBy);
        if ("desc".equalsIgnoreCase(sortDirection)) {
            sort = Sort.by(Sort.Direction.DESC, sortBy == null ? "price" : sortBy);
        }

        return bikeRepository.findAll(spec, sort);
    }
    public Bike sellUsedBike(SellBikeRequestDTO dto) {
        User buyer = userRepository.findById(dto.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Bike bike = Bike.builder()
                .seller(buyer)
                .brand(dto.getBrand())
                .model(dto.getModel())
                .price(dto.getPrice())
                .fuelType(dto.getFuelType())
                .mileage(dto.getMileage())
                .engineCapacity(dto.getEngineCapacity())
                .year(dto.getYear())
                .description(dto.getDescription())
                .ownerType(dto.getOwnerType())
                .city(dto.getCity())
                .condition(dto.getCondition())
                .imageUrls(dto.getImageUrls())
                .isUsed(true)
                .sellerType("Individual")
                .type(BikeType.USED)
                .status(BikeStatus.AVAILABLE)
                .build();

        return bikeRepository.save(bike);
    }

    // 🔹 View all bikes listed by this buyer
    public List<Bike> getUsedBikesByBuyer(Long buyerId) {
        return bikeRepository.findBySellerIdAndIsUsedTrue(buyerId);
    }

    // 🔹 Delete a used bike
    public void deleteUsedBike(Long bikeId, Long buyerId) {
        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new RuntimeException("Bike not found"));

        if (!bike.getSeller().getId().equals(buyerId)) {
            throw new RuntimeException("You cannot delete another user's bike!");
        }

        bikeRepository.delete(bike);
    }


}