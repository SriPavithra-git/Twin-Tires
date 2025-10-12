package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.TestRide;
import com.ecom.TwoWheelers.service.TestRideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-rides")
public class TestRideController {

    @Autowired
    private TestRideService testRideService;

    // ✅ Book a Test Ride
    @PostMapping("/book")
    public TestRide bookTestRide(@RequestBody TestRide testRide) {
        return testRideService.bookTestRide(testRide);
    }

    // ✅ View All Test Rides of a User
    @GetMapping("/user/{userId}")
    public List<TestRide> getUserTestRides(@PathVariable Long userId) {
        return testRideService.getUserTestRides(userId);
    }

    // ✅ Cancel a Test Ride
    @DeleteMapping("/{id}")
    public void cancelTestRide(@PathVariable Long id) {
        testRideService.cancelTestRide(id);
    }
}
