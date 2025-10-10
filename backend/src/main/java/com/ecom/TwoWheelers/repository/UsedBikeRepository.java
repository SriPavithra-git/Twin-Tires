package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.UsedBike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeRepository extends JpaRepository<UsedBike, Long> , JpaSpecificationExecutor<UsedBike> {

    // Fetch bikes by seller
    List<UsedBike> findBySellerId(Long sellerId);  // Now works because User.id exists

    List<UsedBike> findBySellerIdAndIsUsedTrue(Long buyerId);
}
