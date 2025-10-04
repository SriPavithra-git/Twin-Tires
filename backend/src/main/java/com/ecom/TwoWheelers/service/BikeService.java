package com.ecom.TwoWheelers.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecom.TwoWheelers.dto.BikeRequestDTO;
import com.ecom.TwoWheelers.exception.ResourceNotFoundException;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.BikeRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
}