package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> , JpaSpecificationExecutor<Bike> {

    // Fetch bikes by seller
    List<Bike> findBySellerId(Long sellerId);  // Now works because User.id exists
}
