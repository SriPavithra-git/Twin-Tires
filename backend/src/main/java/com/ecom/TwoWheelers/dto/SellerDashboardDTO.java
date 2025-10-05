package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerDashboardDTO {
    private Long sellerId;
    private String name;
    private String email;
    private String phone;

    private List<Bike> bikesAdded;
    private List<Order> ordersReceived;
}
