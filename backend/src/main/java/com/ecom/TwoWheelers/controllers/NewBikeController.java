package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.dto.NewBikeListDTO;
import com.ecom.TwoWheelers.dto.NewBikeRequestDTO;
import com.ecom.TwoWheelers.model.NewBike;
import com.ecom.TwoWheelers.repository.NewBikeRepository;
import com.ecom.TwoWheelers.service.NewBikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/new-bikes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NewBikeController {

    private final NewBikeService newBikeService;
    private final NewBikeRepository newBikeRepository;

    // ---------- Global Exception Handler ----------
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle(Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("Server error: " + e.getMessage());
    }

    // ---------- Create / Update (multipart) ----------

    @PostMapping(
            value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<NewBike> add(
            @ModelAttribute NewBikeRequestDTO dto,
            @RequestPart("images") List<MultipartFile> images
    ) throws IOException {
        return ResponseEntity.ok(newBikeService.add(dto, images));
    }

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<NewBike> update(
            @PathVariable Long id,
            @ModelAttribute NewBikeRequestDTO dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws IOException {
        return ResponseEntity.ok(newBikeService.update(id, dto, images));
    }

    @PutMapping(
            value = "/{id}/images",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<NewBike> updateImages(
            @PathVariable Long id,
            @RequestPart("images") List<MultipartFile> images
    ) throws IOException {
        return ResponseEntity.ok(newBikeService.updateImages(id, images));
    }

    // ---------- Read / Delete ----------

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewBike> one(@PathVariable Long id) {
        return ResponseEntity.ok(newBikeService.findOne(id));
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        newBikeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/seller/{sellerId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NewBike>> bySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(newBikeService.getBySeller(sellerId));
    }

    // ---------- Main List (Card Shape) ----------
    /** Used by frontend: includes lightweight data + single image */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional(readOnly = true)
    public ResponseEntity<List<Map<String, Object>>> all() {
        return ResponseEntity.ok(newBikeService.listCards());
    }

    // ---------- Full Public List ----------
    @GetMapping(value = "/public", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NewBikeListDTO>> publicList(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category
    ) {
        List<NewBikeListDTO> out = newBikeService.getAll().stream()
                .filter(b -> {
                    if (q == null || q.isBlank()) return true;
                    String hay = (String.valueOf(b.getBrand()) + " " +
                            String.valueOf(b.getModel()) + " " +
                            String.valueOf(b.getCity())).toLowerCase();
                    return hay.contains(q.toLowerCase());
                })
                .map(b -> NewBikeListDTO.builder()
                        .id(b.getId())
                        .brand(b.getBrand())
                        .model(b.getModel())
                        .price(b.getPrice())
                        .fuelType(b.getFuelType() == null ? null : b.getFuelType().name())
                        .mileage(b.getMileage())
                        .displacement(b.getDisplacement())
                        .power(b.getPower())
                        .torque(b.getTorque())
                        .colors(b.getColors())
                        .description(b.getDescription())
                        .year(b.getYear())
                        .city(b.getCity())
                        .image((b.getImageUrls() != null && !b.getImageUrls().isEmpty())
                                ? b.getImageUrls().get(0) : null)
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(out);
    }

    // ---------- Cards Shortcut ----------
    @GetMapping(value = "/cards", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Map<String, Object>>> cards() {
        return ResponseEntity.ok(newBikeService.listCards());
    }

    // ---------- Search + Filter + Sort ----------
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Map<String, Object>>> searchFilterSort(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String sort
    ) {
        return ResponseEntity.ok(newBikeService.searchFilterSort(q, brand, minPrice, maxPrice, sort));
    }

    // ---------- Get By ID (Direct Repository) ----------
    @GetMapping("/api/new-bikes/{id}")
    public ResponseEntity<NewBike> getById(@PathVariable Long id) {
        return new ResponseEntity<>(newBikeRepository.findById(id).orElseThrow(), HttpStatus.OK);
    }
}