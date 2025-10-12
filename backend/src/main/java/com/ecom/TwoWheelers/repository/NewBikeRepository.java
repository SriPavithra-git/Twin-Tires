package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.NewBike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewBikeRepository extends JpaRepository<NewBike, Long> {
    List<NewBike> findBySeller_Id(Long sellerId);
}