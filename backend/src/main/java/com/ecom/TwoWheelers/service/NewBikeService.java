package com.ecom.TwoWheelers.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecom.TwoWheelers.dto.NewBikeRequestDTO;
import com.ecom.TwoWheelers.exception.ResourceNotFoundException;
import com.ecom.TwoWheelers.model.NewBike;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.NewBikeRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewBikeService {

    private final NewBikeRepository newBikeRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;

    // =========================
    // Create / Update
    // =========================

    /** Add a new bike with images (Cloudinary) */
    public NewBike add(NewBikeRequestDTO dto, List<MultipartFile> images) throws IOException {
        User seller = userRepository.findById(dto.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with ID: " + dto.getSellerId()));

        List<String> imageUrls = uploadAll(images, "twowheelers/newbikes");

        NewBike bike = NewBike.builder()
                .seller(seller)
                .brand(dto.getBrand())
                .model(dto.getModel())
                .price(dto.getPrice() != null ? dto.getPrice() : BigDecimal.ZERO)
                .fuelType(dto.getFuelType())
                .mileage(dto.getMileage())
                .displacement(dto.getDisplacement())
                .power(dto.getPower())
                .torque(dto.getTorque())
                .colors(dto.getColors())
                .description(dto.getDescription())
                .year(dto.getYear())
                .city(dto.getCity())
                .imageUrls(imageUrls)
                .used(false)
                .build();

        return newBikeRepository.save(bike);
    }

    /** Update bike details; optionally append images */
    public NewBike update(Long id, NewBikeRequestDTO dto, List<MultipartFile> newImages) throws IOException {
        NewBike bike = newBikeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + id));

        bike.setBrand(dto.getBrand());
        bike.setModel(dto.getModel());
        bike.setPrice(dto.getPrice() != null ? dto.getPrice() : BigDecimal.ZERO);
        bike.setFuelType(dto.getFuelType());
        bike.setMileage(dto.getMileage());
        bike.setDisplacement(dto.getDisplacement());
        bike.setPower(dto.getPower());
        bike.setTorque(dto.getTorque());
        bike.setColors(dto.getColors());
        bike.setDescription(dto.getDescription());
        bike.setYear(dto.getYear());
        bike.setCity(dto.getCity());

        if (newImages != null && !newImages.isEmpty()) {
            List<String> existing = bike.getImageUrls() != null ? new ArrayList<>(bike.getImageUrls()) : new ArrayList<>();
            existing.addAll(uploadAll(newImages, "twowheelers/newbikes"));
            bike.setImageUrls(existing);
        }

        return newBikeRepository.save(bike);
    }

    /** Replace all images (delete old on Cloudinary, upload new) */
    public NewBike updateImages(Long id, List<MultipartFile> newImages) throws IOException {
        if (newImages == null || newImages.isEmpty()) {
            throw new IllegalArgumentException("No images provided");
        }

        NewBike bike = newBikeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + id));

        // Delete old images
        deleteAllCloudinary(bike.getImageUrls(), "twowheelers/newbikes");

        // Upload new
        List<String> newUrls = uploadAll(newImages, "twowheelers/newbikes");
        bike.setImageUrls(newUrls);
        return newBikeRepository.save(bike);
    }

    // =========================
    // Delete
    // =========================

    /** Delete bike and all associated Cloudinary images */
    public void delete(Long id) {
        NewBike bike = newBikeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + id));

        deleteAllCloudinary(bike.getImageUrls(), "twowheelers/newbikes");
        newBikeRepository.delete(bike);
    }

    // =========================
    // Reads (entities)
    // =========================

    public List<NewBike> getAll() {
        System.out.println("🔍 Fetching all bikes...");
        return newBikeRepository.findAll();
    }

    public NewBike findOne(Long id) {
        return newBikeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found with ID: " + id));
    }

    public List<NewBike> getBySeller(Long sellerId) {
        return newBikeRepository.findBySeller_Id(sellerId);
    }

    // =========================
    // Lightweight "card" views for frontend lists
    // =========================

    public List<Map<String, Object>> listCards() {
        return newBikeRepository.findAll()
                .stream()
                .map(this::toCard)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> searchCards(String q, String categoryTag) {
        final String needle = q == null ? "" : q.trim().toLowerCase();

        return newBikeRepository.findAll().stream()
                .filter(b -> {
                    if (needle.isEmpty()) return true;
                    String hay = (safe(b.getBrand()) + " " + safe(b.getModel()) + " " + safe(b.getCity())).toLowerCase();
                    return hay.contains(needle);
                })
                .filter(b -> {
                    if (categoryTag == null || categoryTag.isBlank()) return true;
                    String tag = (b.getFuelType() != null && "ELECTRIC".equalsIgnoreCase(b.getFuelType().name()))
                            ? "electric" : "commuter";
                    return tag.equalsIgnoreCase(categoryTag);
                })
                .map(this::toCard)
                .collect(Collectors.toList());
    }

    private Map<String, Object> toCard(NewBike b) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", b.getId());
        m.put("brand", b.getBrand());
        m.put("model", b.getModel());
        m.put("price", b.getPrice());
        m.put("fuelType", b.getFuelType());
        m.put("city", b.getCity());
        m.put("year", b.getYear());
        m.put("mileage", b.getMileage());
        m.put("image", (b.getImageUrls() != null && !b.getImageUrls().isEmpty()) ? b.getImageUrls().get(0) : null);
        return m;
    }

    // =========================
    // Search + Filter + Sort (Fixed for BigDecimal)
    // =========================

    public List<Map<String, Object>> searchFilterSort(String q, String brand, Double minPrice, Double maxPrice, String sort) {
        List<NewBike> all = newBikeRepository.findAll();

        String keyword = q == null ? "" : q.trim().toLowerCase();
        String brandFilter = brand == null ? "" : brand.trim().toLowerCase();

        List<NewBike> filtered = all.stream()
                .filter(b -> keyword.isEmpty() ||
                        (safe(b.getBrand()) + " " + safe(b.getModel()) + " " + safe(b.getDescription())).toLowerCase().contains(keyword))
                .filter(b -> brandFilter.isEmpty() || safe(b.getBrand()).toLowerCase().contains(brandFilter))
                .filter(b -> {
                    BigDecimal price = b.getPrice() == null ? BigDecimal.ZERO : b.getPrice();
                    boolean aboveMin = (minPrice == null) || price.compareTo(BigDecimal.valueOf(minPrice)) >= 0;
                    boolean belowMax = (maxPrice == null) || price.compareTo(BigDecimal.valueOf(maxPrice)) <= 0;
                    return aboveMin && belowMax;
                })
                .sorted((a, b) -> {
                    if (sort == null) return 0;
                    switch (sort.toLowerCase()) {
                        case "price_asc": return a.getPrice().compareTo(b.getPrice());
                        case "price_desc": return b.getPrice().compareTo(a.getPrice());
                        case "latest": return Long.compare(b.getId(), a.getId());
                        default: return 0;
                    }
                })
                .collect(Collectors.toList());

        return filtered.stream().map(this::toCard).collect(Collectors.toList());
    }

    // =========================
    // Cloudinary Helpers
    // =========================

    private List<String> uploadAll(List<MultipartFile> images, String folder) throws IOException {
        if (images == null || images.isEmpty()) return Collections.emptyList();
        List<String> urls = new ArrayList<>(images.size());
        for (MultipartFile file : images) {
            @SuppressWarnings("rawtypes")
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("folder", folder)
            );
            urls.add(String.valueOf(uploadResult.get("secure_url")));
        }
        return urls;
    }

    private void deleteAllCloudinary(List<String> urls, String expectedFolder) {
        if (urls == null || urls.isEmpty()) return;
        for (String url : urls) {
            try {
                String publicId = extractCloudinaryPublicId(url, expectedFolder);
                if (publicId != null) {
                    cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                }
            } catch (Exception e) {
                System.out.println("❌ Failed to delete image from Cloudinary: " + e.getMessage());
            }
        }
    }

    private String extractCloudinaryPublicId(String url, String folder) {
        if (url == null || !url.contains("/upload/")) return null;
        try {
            URI uri = URI.create(url);
            String path = uri.getPath();

            int uploadIdx = path.indexOf("/upload/");
            if (uploadIdx < 0) return null;
            String afterUpload = path.substring(uploadIdx + "/upload/".length());

            if (afterUpload.startsWith("v")) {
                int slash = afterUpload.indexOf('/');
                if (slash > 0) afterUpload = afterUpload.substring(slash + 1);
            }

            if (!afterUpload.startsWith(folder + "/")) return null;

            Pattern p = Pattern.compile("^(" + Pattern.quote(folder) + "/[^.]+)(?:\\.[A-Za-z0-9]+)?$");
            Matcher m = p.matcher(afterUpload);
            if (m.find()) {
                return m.group(1);
            }
            int lastDot = afterUpload.lastIndexOf('.');
            return lastDot > 0 ? afterUpload.substring(0, lastDot) : afterUpload;
        } catch (Exception e) {
            return null;
        }
    }

    private String safe(String s) {
        return s == null ? "" : s;
    }
}