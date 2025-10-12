package com.ecom.TwoWheelers.repository;

import com.ecom.TwoWheelers.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Optional: find by email for login
    Optional<User> findByEmail(String email);
}
