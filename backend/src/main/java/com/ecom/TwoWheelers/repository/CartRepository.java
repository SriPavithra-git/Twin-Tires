package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.model.Cart;
import com.ecom.TwoWheelers.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
    void deleteByUserAndBike(User user, Bike bike);
}
