package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Review;
import com.ecom.TwoWheelers.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepo;

    @GetMapping("/bike/{bikeId}")
    public List<Review> getByBike(@PathVariable Long bikeId) {
        return reviewRepo.findByBikeIdOrderByCreatedAtDesc(bikeId);
    }
    @GetMapping("/seller/{sellerId}")
    public List<Review> getReviewsBySeller(@PathVariable Long sellerId) {
        return reviewRepo.findBySellerIdOrderByCreatedAtDesc(sellerId);
    }


    @PostMapping
    public Review addReview(@RequestBody Review review) {
        review.setCreatedAt(LocalDateTime.now());
        return reviewRepo.save(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewRepo.deleteById(id);
    }
}
