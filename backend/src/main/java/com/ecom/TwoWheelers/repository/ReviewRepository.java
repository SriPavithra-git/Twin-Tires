package com.ecom.TwoWheelers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecom.TwoWheelers.model.Review;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBikeIdOrderByCreatedAtDesc(Long bikeId);
    List<Review> findBySellerIdOrderByCreatedAtDesc(Long sellerId);

}
