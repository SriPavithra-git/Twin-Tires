// src/main/java/com/ecom/TwoWheelers/model/NewBike.java
package com.ecom.TwoWheelers.model;

import com.ecom.TwoWheelers.enums.FuelType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "bikes_new")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class NewBike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // who listed (seller)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    @JsonIgnore
    private User seller;

    // --- Must-haves for BikeDetails.jsx ---
    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;


    @Enumerated(EnumType.STRING)
    private FuelType fuelType;        // Petrol/Electric

    // what your page shows as "Mileage"
    private String mileage;           // keep as String if you store "45 km/l"; else switch to Integer

    // BikeDetails uses "displacement" (cc), "power", "torque"
    private String displacement;      // e.g. "149 cc"; if you prefer numeric, add displacementCc Integer
    private String power;             // e.g. "18.4 PS"
    private String torque;            // e.g. "14.1 Nm"

    // colors displayed as a list
    @ElementCollection
    @CollectionTable(name = "new_bike_colors", joinColumns = @JoinColumn(name = "bike_id"))
    @Column(name = "color")
    private List<String> colors;

    private String description;

    // Optional: used in filters/cards
    private Integer year;
    private String city;

    // gallery
    @ElementCollection
    @CollectionTable(name = "new_bike_images", joinColumns = @JoinColumn(name = "bike_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    // invariants for “new bikes”
    private boolean used = false;     // always false for this table
}