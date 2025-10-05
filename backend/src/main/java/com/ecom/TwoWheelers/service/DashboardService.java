package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.dto.BuyerDashboardDTO;
import com.ecom.TwoWheelers.dto.SellerDashboardDTO;
import com.ecom.TwoWheelers.enums.Role;
import com.ecom.TwoWheelers.exception.ResourceNotFoundException;
import com.ecom.TwoWheelers.model.Address;
import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.model.User;
import com.ecom.TwoWheelers.repository.BikeRepository;
import com.ecom.TwoWheelers.repository.OrderRepository;
import com.ecom.TwoWheelers.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;
    private final OrderRepository orderRepository;

    public Object getDashboard(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (user.getRole() == Role.BUYER) {
            List<Order> orders = orderRepository.findByBuyerId(userId);
            List<Address> addresses = user.getAddresses();
            return new BuyerDashboardDTO(user.getId(), user.getName(), user.getEmail(), user.getPhone(), orders, addresses);
        } else if (user.getRole() == Role.SELLER) {
            List<Bike> bikes = bikeRepository.findBySellerId(userId);
            List<Order> orders = orderRepository.findByBikeSellerId(userId);
            return new SellerDashboardDTO(user.getId(), user.getName(), user.getEmail(), user.getPhone(), bikes, orders);
        } else {
            throw new RuntimeException("Unknown user role");
        }
    }

}
