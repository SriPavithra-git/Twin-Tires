package com.ecom.TwoWheelers.model;


import com.ecom.TwoWheelers.enums.BookingStatus;
import com.ecom.TwoWheelers.enums.PaymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="bookings")
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "id",nullable = false)
    private Bike bike;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus=BookingStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType=PaymentType.COD;

}
