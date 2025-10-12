// src/main/java/com/ecom/TwoWheelers/dto/NewBikeRequestDTO.java
package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.enums.FuelType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewBikeRequestDTO {
    private Long sellerId;
    private String brand;
    private String model;
    private BigDecimal price;
    private FuelType fuelType;
    private String mileage;
    private String displacement;  // "149 cc" or "149"
    private String power;         // "18.4 PS"
    private String torque;        // "14.1 Nm"
    private List<String> colors;  // optional when updating without images
    private String description;
    private Integer year;
    private String city;
}