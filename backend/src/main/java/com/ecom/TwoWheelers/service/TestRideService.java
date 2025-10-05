package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.model.TestRide;
import com.ecom.TwoWheelers.repository.TestRideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TestRideService {

    @Autowired
    private TestRideRepository testRideRepository;

    public TestRide bookTestRide(TestRide testRide) {
        return testRideRepository.save(testRide);
    }

    public List<TestRide> getUserTestRides(Long userId) {
        return testRideRepository.findByUserId(userId);
    }

    public void cancelTestRide(Long id) {
        testRideRepository.deleteById(id);
    }
}
