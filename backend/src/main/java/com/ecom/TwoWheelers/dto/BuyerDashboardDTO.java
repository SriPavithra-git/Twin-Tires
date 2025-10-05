package com.ecom.TwoWheelers.dto;

import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyerDashboardDTO {
    private Long userId;
    private String name;
    private String email;
    private String phone;

    private List<Order> orders;
    private List<Address> addresses;  // <-- Added
}
