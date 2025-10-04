package com.ecom.TwoWheelers.model;

import com.ecom.TwoWheelers.enums.BikeStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User buyer;

    @ManyToOne
    private Bike bike;

    private String paymentType; // COD / Online

    private String status = "Pending"; // Pending, Confirmed, Dispatched, Delivered

    private LocalDateTime orderDate = LocalDateTime.now();
}
