package com.ecom.TwoWheelers.repository;


import com.ecom.TwoWheelers.model.Bargain;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BargainRepository extends JpaRepository<Bargain, Long> {
    List<Bargain> findByBuyerId(Long buyerId);
    List<Bargain> findBySellerId(Long sellerId);
    List<Bargain> findByBikeId(Long bikeId);
}
