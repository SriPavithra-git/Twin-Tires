package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.enums.FuelType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BikeRequestDTO {
    private Long sellerId;
    private String brand;
    private String model;
    private Double price;
    private FuelType fuelType;
    private String mileage;
    private String engineCapacity;
    private Integer year;
    private String description;
}
