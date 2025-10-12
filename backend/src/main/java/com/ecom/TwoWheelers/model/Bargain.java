package com.ecom.TwoWheelers.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bargains")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bargain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Transient
    private String bikeModel;

    @Transient
    private String bikeBrand;

    @Transient
    private BigDecimal bikePrice;
    @Transient
    private String buyerName;


    @Column(nullable = false)
    private Long bikeId;
    private Long buyerId;
    private Long sellerId;
    private BigDecimal offeredPrice;
    private String status; // PENDING, ACCEPTED, REJECTED
    private LocalDateTime createdAt = LocalDateTime.now();
}
