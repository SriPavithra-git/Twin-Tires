package com.ecom.TwoWheelers.model;


import com.ecom.TwoWheelers.enums.BikeStatus;
import com.ecom.TwoWheelers.enums.BikeType;
import com.ecom.TwoWheelers.enums.FuelType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="bikes")
@NoArgsConstructor
@AllArgsConstructor
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long BikeId;

    @ManyToOne
    @JoinColumn(name = "UserId",nullable = false)
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
    private String imageUrl;
    private String description;

    @Enumerated(EnumType.STRING)
    private BikeType type = BikeType.NEW;

    @Enumerated(EnumType.STRING)
    private BikeStatus status = BikeStatus.AVAILABLE;
}
