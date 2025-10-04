package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.Order;
import com.ecom.TwoWheelers.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer(User buyer);
}
