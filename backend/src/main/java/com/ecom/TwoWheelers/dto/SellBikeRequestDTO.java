package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.enums.FuelType;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellBikeRequestDTO {
    private Long buyerId; // Buyer who is selling
    private String brand;
    private String model;
    private Double price;
    private FuelType fuelType;
    private String mileage;
    private String engineCapacity;
    private Integer year;
    private String description;
    private Integer ownerType;
    private String city;
    private String condition;
    private List<String> imageUrls;
}
