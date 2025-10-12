package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long userId);
    Optional<Wishlist> findByUserIdAndNewBikeId(Long userId, Long newBikeId);
}
