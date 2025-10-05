package com.ecom.TwoWheelers.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "test_rides")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestRide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long bikeId;

    private String bikeName;

    private LocalDate date;

    private LocalTime time;

    private String location;
}
