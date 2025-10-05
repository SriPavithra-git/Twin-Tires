package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.model.Bike;
import com.ecom.TwoWheelers.repository.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compare")
@CrossOrigin(origins = "http://localhost:3000")
public class CompareController {

    @Autowired
    private BikeRepository bikeRepository;

    @GetMapping
    public List<Bike> compareBikes(@RequestParam List<Long> ids) {
        return bikeRepository.findAllById(ids);
    }
}
