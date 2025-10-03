package com.ecom.TwoWheelers.model;

import com.ecom.TwoWheelers.enums.BikeStatus;
import com.ecom.TwoWheelers.enums.BikeType;
import com.ecom.TwoWheelers.enums.FuelType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name="bikes")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikeId;   // lowercase b

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User seller;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private Double price;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;

    private String mileage;
    private String engineCapacity;
    private Integer year;

    private String description;

    @Enumerated(EnumType.STRING)
    private BikeType type = BikeType.NEW;

    @Enumerated(EnumType.STRING)
    private BikeStatus status = BikeStatus.AVAILABLE;

    @ElementCollection
    private List<String> imageUrls;
}
