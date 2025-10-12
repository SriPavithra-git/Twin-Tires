package com.ecom.TwoWheelers.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "used_bikes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsedBike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sellerId;

    private String brand;
    private String model;
    private BigDecimal price;
    private String fuelType;
    private String mileage;
    private String engineCapacity;
    private Integer year;
    private String description;
    private String ownerType;
    private String city;
    private String conditionStatus;
    private String purchaseAge;
    private String imageUrl; // main image

    private LocalDateTime createdAt = LocalDateTime.now();
}