package com.ecom.TwoWheelers.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "new_bike_id"}),
                @UniqueConstraint(columnNames = {"user_id", "used_bike_id"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ✅ New bike (nullable)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "new_bike_id")
    private NewBike newBike;

    // ✅ Used bike (nullable)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "used_bike_id")
    private UsedBike usedBike;

    private Integer quantity;
    @Column(name = "custom_price")
    private BigDecimal customPrice;

}
