package com.ecom.TwoWheelers.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "buyer_id")
    private Long buyerId;          // Buyer ID
    private Long bikeId;          // The bike being ordered
    @Column(name = "seller_id")
    private Long sellerId;  // ✅ NEW FIELD

    private String fullName;
    private String phone;
    private String altPhone;
    private String address;

    private String email;

    @Column(name = "payment_type")
    private String paymentMethod;
    private Double totalAmount;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, CONFIRMED, DELIVERED, CANCELLED

    private LocalDateTime createdAt = LocalDateTime.now();
}
