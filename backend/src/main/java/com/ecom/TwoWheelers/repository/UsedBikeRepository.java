package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.UsedBike;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UsedBikeRepository extends JpaRepository<UsedBike, Long> {
    List<UsedBike> findBySellerId(Long sellerId);
}