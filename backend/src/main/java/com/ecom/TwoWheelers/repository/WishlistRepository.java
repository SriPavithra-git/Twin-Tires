package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByUser_Id(Long userId);

    Optional<Wishlist> findByUserIdAndBikeBikeId(Long userId, Long bikeId);
}
