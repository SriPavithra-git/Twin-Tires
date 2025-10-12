package com.ecom.TwoWheelers.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Represents an item inside a user's cart.
 * Contains bike details (either new or used) + quantity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long id;
    private Integer quantity;

    // ✅ Keep frontend field name "bike"
    @JsonProperty("bike")
    private BikeDto bike;  // changed field name to "bike" (was newBike)

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BikeDto {
        private Long id;
        private String brand;
        private String model;
        private BigDecimal price;
        private String image;
        private String type;  // "NEW" or "USED"
    }
}
