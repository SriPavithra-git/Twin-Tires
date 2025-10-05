package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByUserIdOrderByIdDesc(Long userId);
}
