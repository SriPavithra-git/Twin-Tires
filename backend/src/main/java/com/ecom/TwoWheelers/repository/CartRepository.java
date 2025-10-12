package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // ✅ Fetch existing cart row for a given user + new bike
    Optional<Cart> findByUserIdAndNewBikeId(Long userId, Long newBikeId);

    // ✅ Fetch existing cart row for a given user + used bike
    Optional<Cart> findByUserIdAndUsedBikeId(Long userId, Long usedBikeId);

    // ✅ Fetch all cart rows (with bike details eager-loaded)
    @Query("""
        SELECT c 
        FROM Cart c 
        LEFT JOIN FETCH c.newBike 
        LEFT JOIN FETCH c.usedBike 
        WHERE c.user.id = :userId
    """)
    List<Cart> findByUserId(@Param("userId") Long userId);

    // ✅ For deletion
    void deleteByUser_IdAndNewBike_Id(Long userId, Long newBikeId);
    void deleteByUser_IdAndUsedBike_Id(Long userId, Long usedBikeId);

    // ✅ Optional — for internal checks, e.g., merging duplicates
    List<Cart> findAllByUserIdAndNewBikeId(Long userId, Long newBikeId);
    List<Cart> findAllByUserIdAndUsedBikeId(Long userId, Long usedBikeId);
}
