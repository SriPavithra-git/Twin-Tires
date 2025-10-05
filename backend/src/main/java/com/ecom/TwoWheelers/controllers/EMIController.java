package com.ecom.TwoWheelers.controllers;

import com.ecom.TwoWheelers.service.EMIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emi")
@CrossOrigin("*")
public class EMIController {

    @Autowired
    private EMIService emiService;

    @GetMapping("/calculate")
    public double calculateEMI(
            @RequestParam double price,
            @RequestParam double downPayment,
            @RequestParam double interestRate,
            @RequestParam int tenureMonths) {
        return emiService.calculateEMI(price, downPayment, interestRate, tenureMonths);
    }
}
