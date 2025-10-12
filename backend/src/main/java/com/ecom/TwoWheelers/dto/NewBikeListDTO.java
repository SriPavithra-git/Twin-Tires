// src/main/java/com/ecom/TwoWheelers/dto/NewBikeListDTO.java
package com.ecom.TwoWheelers.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class NewBikeListDTO {
    private Long id;
    private String brand;
    private String model;
    private BigDecimal price;
    private String fuelType;     // Petrol/Electric as String
    private String mileage;
    private String displacement;
    private String power;
    private String torque;
    private List<String> colors;
    private String description;
    private Integer year;
    private String city;
    private String image;        // first image url
}