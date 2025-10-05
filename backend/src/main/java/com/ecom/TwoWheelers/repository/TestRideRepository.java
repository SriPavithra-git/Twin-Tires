package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.TestRide;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestRideRepository extends JpaRepository<TestRide, Long> {
    List<TestRide> findByUserId(Long userId);
}
